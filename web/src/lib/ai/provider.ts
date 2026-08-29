/**
 * LLM provider layer — server-side only.
 *
 * Groq is primary, Gemini is the fallback. Both model IDs below were confirmed
 * against the live APIs with real completions before this file was written; two
 * of the audited reference projects shipped model strings that had been retired,
 * and failed silently for it. Both are overridable by env without a code change.
 *
 * Nothing here is imported by a client component. Keys are read from the server
 * environment, sent in an Authorization or x-goog-api-key header, and never
 * placed in a URL or a response body.
 *
 * Every call is bounded by a timeout. A caller that gets a thrown error is
 * expected to fall back to deterministic output — see rule-risk.ts.
 */

import "server-only";

/**
 * Verified 2026-08-29 against api.groq.com. Note that Groq no longer serves the
 * Llama 3.x IDs these projects commonly hardcode; this ID was read from the live
 * /models list and confirmed with a completion.
 */
const DEFAULT_GROQ_MODEL = "openai/gpt-oss-120b";

/**
 * Verified 2026-08-29 against generativelanguage.googleapis.com. gemini-2.5-flash
 * is refused for new keys ("no longer available to new users") and Google's own
 * error names this as the replacement.
 */
const DEFAULT_GEMINI_MODEL = "gemini-3.6-flash";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

const TIMEOUT_MS = 45_000;

export type ProviderName = "groq" | "gemini";

export interface CompletionRequest {
  system: string;
  user: string;
  maxTokens?: number;
}

export interface CompletionResult {
  text: string;
  provider: ProviderName;
  model: string;
}

export class AiUnavailableError extends Error {
  constructor(
    message: string,
    readonly attempts: string[],
  ) {
    super(message);
    this.name = "AiUnavailableError";
  }
}

export function groqModel(): string {
  return process.env.GROQ_MODEL?.trim() || DEFAULT_GROQ_MODEL;
}

export function geminiModel(): string {
  return process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;
}

/** Which providers have a key configured. Used to report status honestly. */
export function configuredProviders(): ProviderName[] {
  const providers: ProviderName[] = [];
  if (process.env.GROQ_API_KEY?.trim()) providers.push("groq");
  if (process.env.GEMINI_API_KEY?.trim()) providers.push("gemini");
  return providers;
}

export function aiConfigured(): boolean {
  return configuredProviders().length > 0;
}

async function callGroq(request: CompletionRequest): Promise<CompletionResult> {
  const key = process.env.GROQ_API_KEY?.trim();
  if (!key) throw new Error("GROQ_API_KEY is not set");
  const model = groqModel();

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      // Header, never a query string.
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: request.system },
        { role: "user", content: request.user },
      ],
      temperature: 0,
      max_tokens: request.maxTokens ?? 2048,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Groq returned ${response.status}: ${detail.slice(0, 200)}`);
  }

  const payload = await response.json();
  const text = payload?.choices?.[0]?.message?.content;
  if (typeof text !== "string" || !text.trim()) {
    throw new Error("Groq returned an empty completion");
  }
  return { text, provider: "groq", model };
}

async function callGemini(request: CompletionRequest): Promise<CompletionResult> {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) throw new Error("GEMINI_API_KEY is not set");
  const model = geminiModel();

  const response = await fetch(`${GEMINI_BASE}/${model}:generateContent`, {
    method: "POST",
    headers: {
      // Header, never ?key= in the URL.
      "x-goog-api-key": key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: request.system }] },
      contents: [{ role: "user", parts: [{ text: request.user }] }],
      generationConfig: {
        temperature: 0,
        // This model reasons before answering and those tokens count against the
        // budget. Too small a cap returns an empty candidate, not an error.
        maxOutputTokens: Math.max(request.maxTokens ?? 2048, 2048),
      },
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Gemini returned ${response.status}: ${detail.slice(0, 200)}`);
  }

  const payload = await response.json();
  const parts = payload?.candidates?.[0]?.content?.parts;
  const text = Array.isArray(parts)
    ? parts.map((part: { text?: string }) => part?.text ?? "").join("")
    : "";
  if (!text.trim()) {
    throw new Error("Gemini returned an empty completion");
  }
  return { text, provider: "gemini", model };
}

/**
 * Try Groq, then Gemini. Throws AiUnavailableError when every provider fails,
 * carrying what was attempted so the failure can be reported honestly rather
 * than swallowed.
 */
export async function complete(request: CompletionRequest): Promise<CompletionResult> {
  const attempts: string[] = [];

  for (const [name, call] of [
    ["groq", callGroq],
    ["gemini", callGemini],
  ] as const) {
    try {
      return await call(request);
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      attempts.push(`${name}: ${reason}`);
      console.error(`[ai] ${name} failed:`, reason);
    }
  }

  throw new AiUnavailableError("No AI provider could complete the request", attempts);
}
