/**
 * Shared document vocabulary.
 *
 * Safe to import from client components: constants and types only, nothing
 * read from the environment. Server configuration lives in config.ts, which is
 * marked server-only so it can never reach the browser bundle.
 */

import type { SegmentationTier, Clause } from "@/lib/segment";
import type { DocumentTypeResult } from "@/lib/doc-type";
import type { ExtractedFigures } from "@/lib/figures";
import type { OmissionResult } from "@/lib/omission";
import type { StatuteFlag } from "@/lib/statute-rules";
import type { Statute } from "@/lib/statutes";

/** File types the engine sidecar can read in this build. */
export const ACCEPTED_EXTENSIONS = [".pdf", ".docx", ".txt"] as const;

/** Value for the file input's `accept` attribute. */
export const ACCEPT_ATTRIBUTE = ACCEPTED_EXTENSIONS.join(",");

export interface DocumentSummary {
  filename: string;
  kind: string;
  /** Page count for PDFs; null for formats that have no pages. */
  pages: number | null;
  bytes: number;
  characters: number;
  /** Anything the extractor wants the user to know, e.g. pages with no text layer. */
  notes: string[];
}

export interface SegmentationSummary {
  tier: SegmentationTier;
  reason: string;
  clauseCount: number;
  wordCount: number;
}

export interface RedactionSummary {
  /** Label ("PAN", "NAME", ...) -> how many distinct items were redacted. */
  counts: Record<string, number>;
  total: number;
}

export interface AnalysisResponse {
  document: DocumentSummary;
  segmentation: SegmentationSummary;
  clauses: Clause[];
  redaction: RedactionSummary;
  /** The document as uploaded. Shown to the user, never sent anywhere else. */
  originalText: string;
  /** What would leave the server if an external model were called. */
  redactedText: string;
  /** Phase 2 deterministic engines. No model is involved in any of these. */
  documentType: DocumentTypeResult;
  figures: ExtractedFigures;
  omission: OmissionResult;
  /** Acts governing this document type. Local table, no external lookup. */
  statutes: Statute[];
  /** Deterministic rules that fired, each citing the Act behind it. */
  statuteFlags: StatuteFlag[];
  /** Server-side handle for the AI routes. Carries no document content. */
  documentId: string;
  /** When the analysis was saved. */
  createdAt: string;
  /** Whether any AI provider key is configured, so the UI can be honest up front. */
  aiConfigured: boolean;
}

/** Human-readable names for the redaction labels, for the privacy log. */
export const REDACTION_LABELS: Record<string, string> = {
  PAN: "PAN",
  AADHAAR: "Aadhaar",
  GSTIN: "GSTIN",
  IFSC: "IFSC",
  PHONE: "phone",
  EMAIL: "email",
  NAME: "name",
  LOCATION: "location",
  INCOME: "income figure",
};

/** "3 name, 1 PAN, 1 phone" — ordered by count, then label. */
export function describeCounts(counts: Record<string, number>): string {
  return Object.entries(counts)
    .sort(([labelA, a], [labelB, b]) => b - a || labelA.localeCompare(labelB))
    .map(([label, count]) => `${count} ${REDACTION_LABELS[label] ?? label.toLowerCase()}`)
    .join(", ");
}

export interface ErrorResponse {
  error: string;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function hasAcceptedExtension(filename: string): boolean {
  const lowered = filename.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((extension) => lowered.endsWith(extension));
}
