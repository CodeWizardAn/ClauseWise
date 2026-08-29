/**
 * Per-clause risk analysis.
 *
 * The model is asked for two things per clause: a plain-language explanation and
 * a 0-100 number. It is explicitly NOT asked for a severity label, and if it
 * volunteers one it is ignored — severityForScore() in code assigns the band.
 *
 * Every clause has an independent fallback. If the model omits a clause,
 * malforms it, or the whole call fails, that clause falls back to the rule-based
 * assessment and is marked as such so the UI can say so out loud.
 */

import "server-only";

import { complete, type ProviderName } from "@/lib/ai/provider";
import { extractJson, salvageObjects } from "@/lib/ai/json";
import { assessClause } from "@/lib/rule-risk";
import type { Clause } from "@/lib/segment";
import { DEFAULT_LANGUAGE, LANGUAGE_NAMES, type LanguageCode } from "@/lib/i18n/languages";
import { clampScore, severityForScore, type Severity } from "@/lib/severity";

export type RiskSource = "ai" | "rules";

export interface ClauseRisk {
  index: number;
  score: number;
  /** Assigned here from `score`. Never taken from the model. */
  severity: Severity;
  explanation: string;
  source: RiskSource;
}

export interface RiskReport {
  risks: ClauseRisk[];
  /** Null when nothing came from a model. */
  provider: ProviderName | null;
  model: string | null;
  /** True when any clause fell back to rules. */
  degraded: boolean;
  /** Present only when the AI path failed; shown to the user verbatim. */
  notice: string | null;
}

const SYSTEM = `You analyse clauses from Indian consumer contracts for a layperson who is deciding whether to sign.

For each clause you receive, return:
- "index": the clause number as a bare integer, e.g. 7. Not "Clause 7", not a string.
- "score": an integer 0-100 for how one-sided or risky the clause is against the reader. 0 means routine and harmless. 100 means severely unfair or potentially unenforceable.
- "explanation": one or two SHORT plain sentences (40 words maximum), no legal jargon, saying what the clause does and why it may matter to the reader. Address the reader as "you".

Rules you must follow:
- Return ONLY a JSON array. No prose, no markdown fences.
- Do NOT include a severity label, rating word, or category. Only the number.
- Placeholders like [NAME_1], [PAN_1] or [LOCATION_2] are redacted personal data. Treat them as opaque tokens. Never guess what they stand for.
- Base the explanation only on the clause text given. Do not invent obligations that are not there.`;

/**
 * Per-document prose is generated directly in the target language rather than
 * translated afterwards. Groq and Gemini handle these four well, and it costs
 * no extra latency — a second translation pass over 36 clauses would.
 *
 * The instruction is explicit that figures and Act names stay in their original
 * form, for the same reason the deterministic path protects them: a translated
 * rupee amount or a transliterated Act name is a factual error.
 */
function languageInstruction(language: LanguageCode): string {
  if (language === DEFAULT_LANGUAGE) return "";
  return `\n\nWrite every "explanation" in ${LANGUAGE_NAMES[language]}, in that language's own script. Keep these EXACTLY as they appear in the clause, untranslated and untransliterated: all numbers, currency amounts (Rs., INR, the rupee sign), percentages, dates, and the names of Acts and statutes. The "index" and "score" fields stay as numbers.`;
}

function buildPrompt(clauses: Clause[]): string {
  const body = clauses
    .map((clause) => `### Clause ${clause.index}\n${clause.text}`)
    .join("\n\n");
  return `Analyse each of the following ${clauses.length} clauses and return a JSON array of ${clauses.length} objects.\n\n${body}`;
}

function parseClauseIndex(value: unknown): number | null {
  const digits = /\d+/.exec(String(value ?? ""));
  if (!digits) return null;
  const parsed = Number.parseInt(digits[0], 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function ruleRisk(clause: Clause): ClauseRisk {
  const assessment = assessClause(clause.text);
  return {
    index: clause.index,
    score: assessment.score,
    severity: severityForScore(assessment.score),
    explanation: assessment.explanation,
    source: "rules",
  };
}

/**
 * Clauses per model call.
 *
 * Kept small on purpose. Groq's free tier allows 8,000 tokens per minute, and a
 * large batch both risks being truncated mid-JSON and burns the minute's budget
 * in one request. Six clauses lands around 1,200 tokens per call.
 */
const BATCH_SIZE = 6;

interface RawRisk {
  index?: unknown;
  score?: unknown;
  explanation?: unknown;
  /** Models add this unasked. It is read nowhere — the band comes from score. */
  severity?: unknown;
}

export async function analyseClauseRisk(
  clauses: Clause[],
  language: LanguageCode = DEFAULT_LANGUAGE,
): Promise<RiskReport> {
  if (clauses.length === 0) {
    return { risks: [], provider: null, model: null, degraded: false, notice: null };
  }

  const byIndex = new Map<number, ClauseRisk>();
  let provider: ProviderName | null = null;
  let model: string | null = null;
  const failures: string[] = [];

  for (let start = 0; start < clauses.length; start += BATCH_SIZE) {
    const batch = clauses.slice(start, start + BATCH_SIZE);
    try {
      const result = await complete({
        system: SYSTEM + languageInstruction(language),
        user: buildPrompt(batch),
        maxTokens: 3000,
      });
      provider ??= result.provider;
      model ??= result.model;

      const parsed = extractJson<RawRisk[]>(result.text);
      // A truncated response still carries complete objects before the cut.
      const items = Array.isArray(parsed) ? parsed : salvageObjects<RawRisk>(result.text);
      if (items.length === 0) {
        failures.push("model response contained no usable objects");
        continue;
      }

      for (const item of items) {
        // Models return this as 7, "7" or "Clause 7" depending on the day, so
        // take the first integer in whatever came back rather than trusting the
        // shape. Getting this wrong silently drops every clause in the batch.
        const index = parseClauseIndex(item?.index);
        if (index === null) continue;
        if (!batch.some((clause) => clause.index === index)) continue;
        const explanation = typeof item?.explanation === "string" ? item.explanation.trim() : "";
        if (!explanation) continue;

        const score = clampScore(item?.score);
        byIndex.set(index, {
          index,
          score,
          // Derived here. item.severity, if the model sent one, is discarded.
          severity: severityForScore(score),
          explanation,
          source: "ai",
        });
      }
    } catch (error) {
      failures.push(error instanceof Error ? error.message : String(error));
    }
  }

  // Any clause the model did not cover falls back to rules, individually.
  const risks = clauses.map((clause) => byIndex.get(clause.index) ?? ruleRisk(clause));
  const degraded = risks.some((risk) => risk.source === "rules");

  const notice = degraded
    ? provider === null
      ? "AI explanation unavailable — showing rule-based analysis."
      : "Some clauses could not be explained by the AI — those show rule-based analysis."
    : null;

  if (failures.length) console.error("[ai/risk] failures:", failures.slice(0, 3));

  return { risks, provider, model, degraded, notice };
}
