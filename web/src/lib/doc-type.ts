/**
 * Deterministic document-type detection.
 *
 * Keyword scoring, no model. The type decides which engines run: the
 * affordability engine only makes sense on a document that actually imposes a
 * money obligation, and the Omission Radar picks its checklist from the type.
 *
 * Detection runs on the REDACTED text. Phase 1 deliberately preserves financial
 * figures and contract vocabulary, so nothing this module needs was removed.
 */

export type DocumentType =
  | "loan"
  | "rental"
  | "employment"
  | "nda"
  | "service"
  | "other";

export interface DocumentTypeResult {
  type: DocumentType;
  label: string;
  confidence: "high" | "medium" | "low";
  /** The terms that drove the decision, so the call is never a black box. */
  signals: string[];
  /** Whether the document imposes money obligations. Gates affordability. */
  financial: boolean;
  financialReasons: string[];
}

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  loan: "Loan agreement",
  rental: "Rental / leave and licence",
  employment: "Employment agreement",
  nda: "Non-disclosure agreement",
  service: "Service agreement",
  other: "Unrecognised document",
};

interface TypeRule {
  type: Exclude<DocumentType, "other">;
  /** term -> weight. Strong, unambiguous phrases score higher. */
  terms: Record<string, number>;
}

const RULES: TypeRule[] = [
  {
    type: "loan",
    terms: {
      "loan agreement": 5,
      "promissory note": 5,
      "equated monthly instal": 4,
      "sanction letter": 4,
      "borrower": 3,
      "lender": 3,
      "disbursement": 3,
      "principal outstanding": 3,
      "penal interest": 3,
      "prepayment": 2,
      "repayment": 2,
      "emi": 2,
      "moratorium": 2,
      "rate of interest": 2,
    },
  },
  {
    type: "rental",
    terms: {
      "leave and licence": 5,
      "leave and license": 5,
      "lease deed": 5,
      "rent agreement": 5,
      "licensor": 4,
      "licensee": 4,
      "landlord": 4,
      "tenant": 4,
      "security deposit": 3,
      "licence fee": 3,
      "monthly rent": 3,
      "lock in": 2,
      "lock-in": 2,
      "premises": 2,
      "vacate": 2,
    },
  },
  {
    type: "employment",
    terms: {
      "employment agreement": 5,
      "offer of employment": 5,
      "appointment letter": 5,
      "employer": 3,
      "employee": 3,
      "probation": 3,
      "designation": 2,
      "ctc": 2,
      "cost to company": 3,
      "gross salary": 3,
      "working hours": 2,
      "notice period": 1,
    },
  },
  {
    type: "nda",
    terms: {
      "non-disclosure": 5,
      "non disclosure": 5,
      "confidentiality agreement": 5,
      "receiving party": 4,
      "disclosing party": 4,
      "confidential information": 3,
      "trade secret": 3,
      "proprietary information": 2,
      "need to know": 1,
    },
  },
  {
    type: "service",
    terms: {
      "service agreement": 5,
      "statement of work": 5,
      "master services": 5,
      "scope of services": 4,
      "service provider": 3,
      "deliverables": 3,
      "milestone": 2,
      "service level": 2,
    },
  },
];

/** A currency amount. Requires a currency mark so "620 square feet" is not money. */
const CURRENCY_AMOUNT = /(?:₹|Rs\.?|INR|USD|\$)\s*\d[\d,]*(?:\.\d+)?/i;

/** Vocabulary that means "somebody owes money on a schedule". */
const OBLIGATION_TERMS = [
  "emi",
  "equated monthly instal",
  "instalment",
  "installment",
  "monthly rent",
  "licence fee",
  "license fee",
  "rent of",
  "security deposit",
  "rate of interest",
  "per annum",
  "repayment",
  "penal interest",
];

function countOccurrences(haystack: string, needle: string): number {
  let count = 0;
  let index = haystack.indexOf(needle);
  while (index !== -1) {
    count += 1;
    index = haystack.indexOf(needle, index + needle.length);
  }
  return count;
}

export function detectDocumentType(text: string): DocumentTypeResult {
  const lowered = text.toLowerCase();

  let best: { type: Exclude<DocumentType, "other">; score: number; signals: string[] } | null =
    null;

  for (const rule of RULES) {
    let score = 0;
    const signals: string[] = [];
    for (const [term, weight] of Object.entries(rule.terms)) {
      const hits = countOccurrences(lowered, term);
      if (hits === 0) continue;
      // Cap each term's contribution so one repeated word cannot decide the type.
      score += weight * Math.min(hits, 3);
      signals.push(term);
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { type: rule.type, score, signals };
    }
  }

  const financialReasons: string[] = [];
  const hasAmount = CURRENCY_AMOUNT.test(text);
  if (hasAmount) financialReasons.push("currency amounts present");
  const obligations = OBLIGATION_TERMS.filter((term) => lowered.includes(term));
  if (obligations.length) {
    financialReasons.push(`obligation terms: ${obligations.slice(0, 4).join(", ")}`);
  }
  // Both halves are required. A confidentiality agreement that mentions a
  // penalty sum is not a document with a repayment obligation.
  const financial = hasAmount && obligations.length > 0;

  if (!best || best.score < 6) {
    return {
      type: "other",
      label: DOCUMENT_TYPE_LABELS.other,
      confidence: "low",
      signals: best?.signals.slice(0, 6) ?? [],
      financial,
      financialReasons,
    };
  }

  return {
    type: best.type,
    label: DOCUMENT_TYPE_LABELS[best.type],
    confidence: best.score >= 20 ? "high" : best.score >= 12 ? "medium" : "low",
    signals: best.signals.slice(0, 6),
    financial,
    financialReasons,
  };
}
