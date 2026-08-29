/**
 * Grounded question answering over one document.
 *
 * The model sees only the redacted clauses and is told, firmly, that if the
 * answer is not in them it must say so. Answers carry the clause numbers they
 * came from, so the user can check the source rather than trust the summary.
 *
 * When the AI is unavailable the question is answered by keyword search over the
 * same clauses. That is a worse answer, and it says so — it never pretends to be
 * the AI's.
 */

import "server-only";

import { complete, type ProviderName } from "@/lib/ai/provider";
import { extractJson } from "@/lib/ai/json";
import { DEFAULT_LANGUAGE, LANGUAGE_NAMES, type LanguageCode } from "@/lib/i18n/languages";
import type { Clause } from "@/lib/segment";

export type AnswerSource = "ai" | "keyword";

export interface QaAnswer {
  answer: string;
  /** Clause indices the answer rests on. */
  citations: number[];
  /** False when the document does not contain the answer. */
  found: boolean;
  source: AnswerSource;
  provider: ProviderName | null;
  notice: string | null;
}

const SYSTEM = `You answer questions about a single legal document for a layperson in India.

Absolute rules:
- Answer ONLY from the clauses provided. They are the entire document.
- If the answer is not in the clauses, you MUST set "found" to false and say the document does not cover it. Do NOT use outside knowledge. Do NOT guess. Do NOT invent obligations, amounts or dates.
- Cite the clause numbers you used in "citations".
- Placeholders like [NAME_1] or [PAN_1] are redacted personal data. Repeat them exactly as written; never guess what they stand for.
- Keep the answer to a few plain sentences. No legal jargon.

Return ONLY this JSON, no markdown fence:
{"found": true|false, "answer": "...", "citations": [1, 4]}`;

function buildPrompt(clauses: Clause[], question: string): string {
  const body = clauses
    .map((clause) => `[Clause ${clause.index}] ${clause.text}`)
    .join("\n\n");
  return `Document clauses:\n\n${body}\n\n---\nQuestion: ${question}`;
}

const STOP_WORDS = new Set([
  "what","when","where","which","who","whom","why","how","is","are","was","were",
  "the","a","an","of","to","in","on","for","and","or","if","it","its","do","does",
  "did","can","could","shall","should","will","would","my","me","i","this","that",
  "there","have","has","had","be","been","am","any","all","about","from","with",
]);

/** Keyword fallback: rank clauses by how many question terms they contain. */
function keywordAnswer(clauses: Clause[], question: string): QaAnswer {
  const terms = question
    .toLowerCase()
    .split(/[^a-z0-9%]+/)
    .filter((term) => term.length > 2 && !STOP_WORDS.has(term));

  const scored = clauses
    .map((clause) => {
      const lowered = clause.text.toLowerCase();
      const hits = terms.filter((term) => lowered.includes(term)).length;
      return { clause, hits };
    })
    .filter((item) => item.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 3);

  if (scored.length === 0) {
    return {
      answer:
        "No clause in this document mentions those terms. The AI assistant is unavailable, so this was a plain keyword search rather than a real reading of the document.",
      citations: [],
      found: false,
      source: "keyword",
      provider: null,
      notice: "AI chat is temporarily unavailable — this is a keyword search, not an AI answer.",
    };
  }

  return {
    answer: scored
      .map((item) => `Clause ${item.clause.index}: ${item.clause.text}`)
      .join("\n\n"),
    citations: scored.map((item) => item.clause.index),
    found: true,
    source: "keyword",
    provider: null,
    notice:
      "AI chat is temporarily unavailable — showing the clauses that mention your terms, not an AI answer.",
  };
}

interface RawAnswer {
  found?: unknown;
  answer?: unknown;
  citations?: unknown;
}

function languageInstruction(language: LanguageCode): string {
  if (language === DEFAULT_LANGUAGE) return "";
  return `\n\nWrite the "answer" in ${LANGUAGE_NAMES[language]}, in that language's own script. Keep numbers, currency amounts, percentages, dates and the names of Acts EXACTLY as they appear in the document — untranslated and untransliterated. "found" and "citations" keep their JSON types.`;
}

export async function answerQuestion(
  clauses: Clause[],
  question: string,
  language: LanguageCode = DEFAULT_LANGUAGE,
): Promise<QaAnswer> {
  try {
    const result = await complete({
      system: SYSTEM + languageInstruction(language),
      user: buildPrompt(clauses, question),
      maxTokens: 2048,
    });

    const parsed = extractJson<RawAnswer>(result.text);
    const answer = typeof parsed?.answer === "string" ? parsed.answer.trim() : "";
    if (!answer) throw new Error("model returned no answer field");

    // Same tolerance as the risk path: a citation may arrive as 4, "4" or
    // "Clause 4".
    const citations = Array.isArray(parsed?.citations)
      ? parsed.citations
          .map((value) => {
            const digits = /\d+/.exec(String(value ?? ""));
            return digits ? Number.parseInt(digits[0], 10) : Number.NaN;
          })
          .filter((value) => Number.isFinite(value) && clauses.some((c) => c.index === value))
      : [];

    return {
      answer,
      citations,
      found: parsed?.found !== false,
      source: "ai",
      provider: result.provider,
      notice: null,
    };
  } catch (error) {
    console.error("[ai/qa] falling back to keyword search:", error);
    return keywordAnswer(clauses, question);
  }
}
