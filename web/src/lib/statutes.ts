/**
 * Local statute-mapping table.
 *
 * A code-defined list of the Indian Acts that govern each document type. It is
 * deterministic and offline by design: the app must say something correct about
 * a document's legal footing even when no external service is reachable. An
 * external case-law lookup can garnish this later; it cannot be the backbone.
 *
 * Two honesty rules are enforced here:
 *
 *   1. Acts are cited BY NAME ONLY. No section numbers appear anywhere in this
 *      file. A confidently-wrong "Section 17(1)(d)" reads as authority and is
 *      worse than no citation at all, so the provision is described in plain
 *      language instead.
 *   2. Where an Act is a model law or varies by state, the entry says so. The
 *      Model Tenancy Act is a template circulated to states, not law everywhere,
 *      and pretending otherwise would mislead exactly the reader we serve.
 */

import type { DocumentType } from "@/lib/doc-type";

export type StatuteScope = "central" | "state" | "model" | "regulator";

export interface Statute {
  id: string;
  name: string;
  scope: StatuteScope;
  /** What it governs, in plain language. */
  summary: string;
  /** Said out loud in the UI when the Act does not simply apply everywhere. */
  caveat?: string;
  /**
   * Query to send to Indian Kanoon, when the entry is a single named Act that
   * IK could plausibly hold. Entries without one are never looked up: "State
   * Rent Control Acts" is a category, not a document, and the RBI code is not
   * an Act, so querying them would spend balance for nothing.
   */
  ikQuery?: string;
  /**
   * A live Indian Kanoon reference, attached at request time when available.
   * Always optional — the Act name above is what the product relies on.
   */
  reference?: { title: string; url: string } | null;
}

export const STATUTES: Record<string, Statute> = {
  "contract-act-1872": {
    id: "contract-act-1872",
    ikQuery: "Indian Contract Act, 1872",
    name: "Indian Contract Act, 1872",
    scope: "central",
    summary:
      "The baseline law for every agreement in India — what makes a contract valid, what makes a term unenforceable, and what happens on breach.",
  },
  "registration-act-1908": {
    id: "registration-act-1908",
    ikQuery: "Registration Act, 1908",
    name: "Registration Act, 1908",
    scope: "central",
    summary:
      "Sets out which documents must be registered with the sub-registrar. Leases of immovable property beyond a short term fall within it, and an unregistered document that should have been registered carries much less weight as evidence.",
  },
  "transfer-of-property-1882": {
    id: "transfer-of-property-1882",
    ikQuery: "Transfer of Property Act, 1882",
    name: "Transfer of Property Act, 1882",
    scope: "central",
    summary:
      "Governs leases of immovable property, including how a lease is created and the rights and duties of landlord and tenant.",
  },
  "model-tenancy-2021": {
    id: "model-tenancy-2021",
    ikQuery: "Model Tenancy Act, 2021",
    name: "Model Tenancy Act, 2021",
    scope: "model",
    summary:
      "A central template for modern tenancy law, covering written agreements, deposit limits, notice periods and rent authorities.",
    caveat:
      "This is a model law circulated to states, not law by itself. It applies only where your state has enacted its own version.",
  },
  "state-rent-control": {
    id: "state-rent-control",
    name: "State Rent Control Acts",
    scope: "state",
    summary:
      "Each state has its own rent legislation, which can cap deposits, restrict eviction and set notice requirements.",
    caveat: "The rules differ by state. Check the Act that applies where the property is.",
  },
  "stamp-act-1899": {
    id: "stamp-act-1899",
    ikQuery: "Indian Stamp Act, 1899",
    name: "Indian Stamp Act, 1899 (and state stamp legislation)",
    scope: "state",
    summary:
      "Sets the stamp duty payable on an instrument. An insufficiently stamped agreement can face difficulties when produced as evidence.",
    caveat: "Stamp duty rates are set by each state.",
  },
  "negotiable-instruments-1881": {
    id: "negotiable-instruments-1881",
    ikQuery: "Negotiable Instruments Act, 1881",
    name: "Negotiable Instruments Act, 1881",
    scope: "central",
    summary:
      "Governs cheques and promissory notes, including the consequences of a cheque being dishonoured.",
  },
  "rbi-fair-practices": {
    id: "rbi-fair-practices",
    name: "RBI Fair Practices Code for Lenders",
    scope: "regulator",
    summary:
      "Reserve Bank of India directions requiring regulated lenders to disclose terms clearly, keep penal charges reasonable and proportionate, and run a grievance redressal process.",
    caveat:
      "These are regulatory directions binding on RBI-regulated lenders. An unregulated private lender may not be covered.",
  },
};

/** Document type -> the Acts that govern it, most relevant first. */
const MAPPING: Partial<Record<DocumentType, string[]>> = {
  rental: [
    "model-tenancy-2021",
    "state-rent-control",
    "registration-act-1908",
    "transfer-of-property-1882",
    "stamp-act-1899",
    "contract-act-1872",
  ],
  loan: ["contract-act-1872", "rbi-fair-practices", "negotiable-instruments-1881"],
};

/** Every document is at least a contract. That is the fallback, not a guess. */
const BASELINE = ["contract-act-1872"];

export function statutesFor(type: DocumentType): Statute[] {
  const ids = MAPPING[type] ?? BASELINE;
  return ids.map((id) => STATUTES[id]).filter(Boolean);
}

export function statutesByIds(ids: string[]): Statute[] {
  return ids.map((id) => STATUTES[id]).filter(Boolean);
}
