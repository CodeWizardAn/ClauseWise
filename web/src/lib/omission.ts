/**
 * Omission Radar — the generic engine.
 *
 * It answers one question: given a checklist of protective clauses and a
 * document, which of those clauses are absent?
 *
 * The engine knows nothing about loans or rentals. Adding support for a new
 * document type means adding a checklist in checklists.ts, never editing this
 * file. Detection is pattern matching, so it is deterministic and explainable.
 *
 * A clause counts as present when one of its `patterns` matches AND none of its
 * `negations` do. The negations matter more than they look: a rental agreement
 * that says entry may happen "without prior notice" contains the words "prior
 * notice", and a naive keyword check would call the protection present when the
 * document actually removes it.
 */

import type { DocumentType } from "@/lib/doc-type";

export interface ChecklistItem {
  id: string;
  /** What the protective clause is. */
  title: string;
  /** One line on why its absence hurts the reader. */
  why: string;
  patterns: RegExp[];
  /** If any of these match, the protection is treated as absent. */
  negations?: RegExp[];
  /**
   * Ids of the Acts that govern this clause. Carried through as opaque strings:
   * the engine stays generic and knows nothing about Indian law.
   */
  statuteIds?: string[];
}

export interface Checklist {
  type: DocumentType;
  label: string;
  items: ChecklistItem[];
}

export interface OmissionFinding {
  id: string;
  title: string;
  why: string;
  present: boolean;
  /** The text that satisfied the check, when present. */
  evidence: string | null;
  /** The text that cancelled it, when a negation fired. */
  cancelledBy: string | null;
  /** Governing Act ids, resolved to names for display by the caller. */
  statuteIds: string[];
}

export interface OmissionResult {
  checklistLabel: string;
  checkedCount: number;
  presentCount: number;
  missingCount: number;
  present: OmissionFinding[];
  missing: OmissionFinding[];
}

function snippet(text: string, index: number, length: number): string {
  const from = Math.max(0, index - 60);
  const to = Math.min(text.length, index + length + 60);
  return text.slice(from, to).replace(/\s+/g, " ").trim();
}

function firstMatch(text: string, patterns: RegExp[]): string | null {
  for (const pattern of patterns) {
    // Copy the regex so a lastIndex from a /g flag cannot leak between calls.
    const probe = new RegExp(pattern.source, pattern.flags.replace("g", ""));
    const found = probe.exec(text);
    if (found) return snippet(text, found.index, found[0].length);
  }
  return null;
}

export function runOmissionRadar(text: string, checklist: Checklist): OmissionResult {
  const present: OmissionFinding[] = [];
  const missing: OmissionFinding[] = [];

  for (const item of checklist.items) {
    const evidence = firstMatch(text, item.patterns);
    const cancelledBy = item.negations ? firstMatch(text, item.negations) : null;
    const isPresent = evidence !== null && cancelledBy === null;

    const finding: OmissionFinding = {
      id: item.id,
      title: item.title,
      why: item.why,
      present: isPresent,
      evidence: isPresent ? evidence : null,
      cancelledBy: evidence !== null && cancelledBy !== null ? cancelledBy : null,
      statuteIds: item.statuteIds ?? [],
    };
    (isPresent ? present : missing).push(finding);
  }

  return {
    checklistLabel: checklist.label,
    checkedCount: checklist.items.length,
    presentCount: present.length,
    missingCount: missing.length,
    present,
    missing,
  };
}
