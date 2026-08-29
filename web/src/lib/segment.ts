/**
 * Clause segmentation — deterministic, no AI.
 *
 * Splits extracted document text into clauses using a three-tier ladder
 * (IMPLEMENTATION.md section 8). The first tier that produces a usable result
 * wins; we do not mix tiers within one document, so the result is always
 * explainable: "this document was split by numbered clause markers."
 *
 *   Tier 1 "numbered"  — real clause markers (1., 2.3, Clause 4, Section 7)
 *   Tier 2 "paragraph" — blank-line separated paragraphs
 *   Tier 3 "chunk"     — fixed ~110-word chunks, the last resort
 *
 * Nothing is ever dropped or capped. Every word of the input lands in exactly
 * one clause, including any preamble that appears before the first marker.
 */

export type SegmentationTier = "numbered" | "paragraph" | "chunk";

export interface Clause {
  /** 1-based position in the document, stable for display and later phases. */
  index: number;
  /** The clause marker as printed in the document, e.g. "2.3". */
  marker: string | null;
  /** A short all-caps title on the marker line, e.g. "REPAYMENT". */
  heading: string | null;
  text: string;
  wordCount: number;
}

export interface SegmentationResult {
  tier: SegmentationTier;
  /** Why this tier was chosen — shown in the UI so the split is never a mystery. */
  reason: string;
  clauses: Clause[];
  clauseCount: number;
  wordCount: number;
}

/** Words per chunk in tier 3. */
const CHUNK_WORDS = 110;

/** Tier 1 needs at least this many markers before we trust the numbering. */
const MIN_NUMBERED_MARKERS = 3;

/**
 * A decimal clause marker: "1.", "1.1", "10.2)", "3.4.1 ".
 * Requires content after the marker so a bare page number is not a clause.
 */
const DECIMAL_MARKER = /^(\d{1,3}(?:\.\d{1,3})*)[.):]?\s+(?=\S)/;

/** A worded clause marker: "Clause 4.", "SECTION 7 -", "Article 12". */
const WORDED_MARKER = /^(?:clause|section|article|para(?:graph)?)\s+(\d{1,3}(?:\.\d{1,3})*)[.):-]?\s*/i;

/**
 * Lettered and roman sub-items — "(a)", "(iv)" — are deliberately NOT clause
 * boundaries. They are almost always the limbs of a list inside the clause
 * above them, and splitting them out produces orphaned fragments like
 * "the death, insolvency or incapacity of the Borrower" with no context.
 */

function normalise(text: string): string {
  return text.replace(/\r\n?/g, "\n").replace(/\u00A0/g, " ");
}

function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

/** Collapse a clause's hard-wrapped lines into flowing text. */
function joinLines(lines: string[]): string {
  return lines
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchMarker(line: string): { marker: string; rest: string } | null {
  const decimal = DECIMAL_MARKER.exec(line);
  if (decimal) {
    return { marker: decimal[1], rest: line.slice(decimal[0].length) };
  }
  const worded = WORDED_MARKER.exec(line);
  if (worded) {
    return { marker: worded[1], rest: line.slice(worded[0].length) };
  }
  return null;
}

/**
 * A marker line whose remainder is a short, shouted title — "1. REPAYMENT" —
 * is a section heading rather than an operative clause.
 */
function headingFrom(rest: string): string | null {
  const candidate = rest.trim();
  if (!candidate || candidate.length > 80) return null;
  if (!/[A-Za-z]/.test(candidate)) return null;
  if (candidate !== candidate.toUpperCase()) return null;
  return candidate;
}

function toClause(
  index: number,
  marker: string | null,
  heading: string | null,
  text: string,
): Clause {
  return { index, marker, heading, text, wordCount: countWords(text) };
}

function segmentByNumbering(text: string): Clause[] | null {
  const lines = text.split("\n");

  type Draft = { marker: string | null; heading: string | null; lines: string[] };
  const drafts: Draft[] = [];
  let current: Draft | null = null;
  let markerCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const match = matchMarker(trimmed);
    if (match) {
      markerCount += 1;
      current = {
        marker: match.marker,
        heading: headingFrom(match.rest),
        lines: [trimmed],
      };
      drafts.push(current);
      continue;
    }

    if (!current) {
      // Preamble: the title and recitals that sit above clause 1. Kept as its
      // own clause so the top of the document is never silently discarded.
      current = { marker: null, heading: null, lines: [] };
      drafts.push(current);
    }
    current.lines.push(trimmed);
  }

  if (markerCount < MIN_NUMBERED_MARKERS) return null;

  return drafts
    .map((draft) => ({ ...draft, text: joinLines(draft.lines) }))
    .filter((draft) => draft.text.length > 0)
    .map((draft, position) =>
      toClause(position + 1, draft.marker, draft.heading, draft.text),
    );
}

function segmentByParagraph(text: string): Clause[] | null {
  const paragraphs = text
    .split(/\n\s*\n+/)
    .map((paragraph) => joinLines(paragraph.split("\n")))
    .filter(Boolean);

  if (paragraphs.length < 2) return null;

  return paragraphs.map((paragraph, position) =>
    toClause(position + 1, null, null, paragraph),
  );
}

function segmentByChunk(text: string): Clause[] {
  const words = text.split(/\s+/).filter(Boolean);
  const clauses: Clause[] = [];

  for (let start = 0; start < words.length; start += CHUNK_WORDS) {
    const chunk = words.slice(start, start + CHUNK_WORDS).join(" ");
    clauses.push(toClause(clauses.length + 1, null, null, chunk));
  }

  return clauses;
}

export function segmentClauses(rawText: string): SegmentationResult {
  const text = normalise(rawText).trim();

  if (!text) {
    return {
      tier: "chunk",
      reason: "The document contained no text to segment.",
      clauses: [],
      clauseCount: 0,
      wordCount: 0,
    };
  }

  const wordCount = countWords(text);

  const numbered = segmentByNumbering(text);
  if (numbered) {
    return {
      tier: "numbered",
      reason: `Split on ${numbered.filter((c) => c.marker).length} numbered clause markers.`,
      clauses: numbered,
      clauseCount: numbered.length,
      wordCount,
    };
  }

  const paragraphs = segmentByParagraph(text);
  if (paragraphs) {
    return {
      tier: "paragraph",
      reason:
        "No numbered clause markers found, so the document was split on paragraph breaks.",
      clauses: paragraphs,
      clauseCount: paragraphs.length,
      wordCount,
    };
  }

  const chunks = segmentByChunk(text);
  return {
    tier: "chunk",
    reason: `No clause markers or paragraph breaks found, so the text was split into ${CHUNK_WORDS}-word chunks.`,
    clauses: chunks,
    clauseCount: chunks.length,
    wordCount,
  };
}
