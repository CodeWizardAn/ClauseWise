/**
 * Encoded illegal / risky-clause rules, tied to named Acts.
 *
 * Every rule is a deterministic check over text the document actually contains
 * and figures already extracted in code. No model is consulted and nothing is
 * fetched.
 *
 * Each rule declares its `confidence`:
 *
 *   "established" — the legal position is settled centrally, so we can state it.
 *   "varies-by-state" — the norm depends on state law. These are phrased as
 *      "check your state's limit", never as a definitive claim of illegality.
 *      Telling a tenant their deposit is illegal when their state permits it
 *      would be a confident lie, and this product's whole argument is that it
 *      does not do that.
 *
 * Thresholds are written as named constants with the reasoning beside them, so
 * a reader can disagree with the number rather than guess at it.
 */

import type { DocumentType } from "@/lib/doc-type";
import type { ExtractedFigures } from "@/lib/figures";
import type { OmissionResult } from "@/lib/omission";
import { statutesByIds, type Statute } from "@/lib/statutes";

export type RuleConfidence = "established" | "varies-by-state";
export type RuleSeverity = "info" | "caution" | "serious";

export interface StatuteFlag {
  id: string;
  title: string;
  /** Plain-language explanation of why this matters to the reader. */
  why: string;
  /** What we actually observed in the document. */
  observed: string;
  severity: RuleSeverity;
  confidence: RuleConfidence;
  statutes: Statute[];
}

export interface RuleContext {
  type: DocumentType;
  text: string;
  figures: ExtractedFigures;
  omission: OmissionResult;
}

/**
 * The Model Tenancy Act proposes a cap of two months' rent as the security
 * deposit for a residential tenancy. States that have not adopted it set their
 * own limits, and some permit far more, so exceeding this is a prompt to check
 * — not a finding of illegality.
 */
const DEPOSIT_MONTHS_REFERENCE = 2;

/**
 * A registrable lease. Agreements are widely written for eleven months
 * precisely to stay under the registration threshold, so a longer term with no
 * registration clause is the case worth flagging.
 */
const REGISTRATION_THRESHOLD_MONTHS = 11;

/**
 * 2% a month is 24% a year of penal charge stacked on top of the interest.
 * RBI's fair-practice directions require penal charges to be reasonable and
 * proportionate, so at or above this we ask the reader to check it.
 */
const PENAL_MONTHLY_PERCENT = 2;
const PENAL_ANNUAL_PERCENT = 24;

const NUMBER_WORDS: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8,
  nine: 9, ten: 10, eleven: 11, twelve: 12, eighteen: 18, twenty: 20,
  "twenty four": 24, thirty: 30, "thirty six": 36,
};

/** The agreement's term in months, or null when it cannot be read. */
export function extractTermMonths(text: string): number | null {
  const lowered = text.toLowerCase();

  // "eleven (11) months" / "24 months" / "period of 36 months"
  const digitMonths = /(?:period|term|duration|tenancy|lease)[^.]{0,60}?(\d{1,3})\s*\)?\s*months?/i.exec(text)
    ?? /\b(\d{1,3})\s*\(?\s*[a-z]*\s*\)?\s*months?\b/i.exec(text);
  if (digitMonths) {
    const value = Number.parseInt(digitMonths[1], 10);
    if (Number.isFinite(value) && value > 0 && value <= 600) return value;
  }

  // "eleven months" spelled out.
  for (const [word, value] of Object.entries(NUMBER_WORDS)) {
    if (new RegExp(`\\b${word}\\s+months?\\b`).test(lowered)) return value;
  }

  // "three (3) years" / "2 years"
  const years = /\b(\d{1,2})\s*\)?\s*years?\b/i.exec(text);
  if (years) {
    const value = Number.parseInt(years[1], 10);
    if (Number.isFinite(value) && value > 0 && value <= 50) return value * 12;
  }
  for (const [word, value] of Object.entries(NUMBER_WORDS)) {
    if (new RegExp(`\\b${word}\\s+years?\\b`).test(lowered)) return value * 12;
  }
  return null;
}

function missing(omission: OmissionResult, id: string): boolean {
  return omission.missing.some((item) => item.id === id);
}

function flag(
  id: string,
  title: string,
  why: string,
  observed: string,
  severity: RuleSeverity,
  confidence: RuleConfidence,
  statuteIds: string[],
): StatuteFlag {
  return { id, title, why, observed, severity, confidence, statutes: statutesByIds(statuteIds) };
}

export function evaluateStatuteRules(context: RuleContext): StatuteFlag[] {
  const { type, text, figures, omission } = context;
  const flags: StatuteFlag[] = [];

  if (type === "rental") {
    const months = extractTermMonths(text);

    // 1. Registrable term with no registration clause.
    if (months !== null && months > REGISTRATION_THRESHOLD_MONTHS && missing(omission, "registration")) {
      flags.push(
        flag(
          "unregistered-registrable-lease",
          "The agreement runs beyond 11 months but says nothing about registration",
          "Under the Registration Act, 1908, a lease of immovable property beyond a short term is meant to be registered. " +
            "An agreement that should have been registered but was not carries much less weight as evidence, so if the owner " +
            "later disputes your tenancy you may struggle to prove it. Ask for the agreement to be registered.",
          `Term read as ${months} months, and no registration clause was found.`,
          "serious",
          "established",
          ["registration-act-1908", "transfer-of-property-1882"],
        ),
      );
    }

    // 2. Deposit large relative to rent. State-dependent: prompt, never assert.
    if (figures.deposit && figures.rent && figures.rent.amount > 0) {
      const multiple = figures.deposit.amount / figures.rent.amount;
      if (multiple > DEPOSIT_MONTHS_REFERENCE) {
        flags.push(
          flag(
            "deposit-above-reference",
            "The security deposit is large relative to the rent",
            `The Model Tenancy Act, 2021 proposes a cap of ${DEPOSIT_MONTHS_REFERENCE} months' rent as a residential security deposit, ` +
              "but that Act only applies where your state has adopted it, and several states allow considerably more. " +
              "Check your state's limit before treating this as excessive. This is a prompt to verify against the rules where " +
              "your property is, not a conclusion that the deposit breaches them.",
            `Deposit is about ${multiple.toFixed(1)} months' rent.`,
            "caution",
            "varies-by-state",
            ["model-tenancy-2021", "state-rent-control"],
          ),
        );
      }
    }

    // 3. A lock-in that binds only the tenant.
    const hasLockIn = /lock[\s-]?in/i.test(text);
    const oneSidedExit =
      /(?:licensor|lessor|landlord|owner)[^.]{0,140}(?:terminate|revoke)[^.]{0,140}without assigning any reason/i.test(text) ||
      /may terminate[^.]{0,120}without assigning any reason/i.test(text);
    if (hasLockIn && oneSidedExit) {
      flags.push(
        flag(
          "one-sided-lock-in",
          "You are locked in while the other side can leave at will",
          "A lock-in that binds only you, next to a clause letting the owner end the agreement without giving a reason, " +
            "is a one-sided bargain. Under the Indian Contract Act, 1872 a term this unbalanced can be argued against, and " +
            "it is worth asking for the lock-in to apply to both sides or for the notice periods to match.",
          "The document has a lock-in period and also lets the owner terminate without assigning a reason.",
          "serious",
          "established",
          ["contract-act-1872", "model-tenancy-2021"],
        ),
      );
    }
  }

  if (type === "loan") {
    // 4. Penal interest that compounds a missed payment quickly.
    const penalty = figures.penaltyRate;
    if (penalty) {
      const perMonth = /per\s+month|monthly|p\.?m\.?/i.test(penalty.context);
      const annualised = perMonth ? penalty.percent * 12 : penalty.percent;
      if (
        (perMonth && penalty.percent >= PENAL_MONTHLY_PERCENT) ||
        (!perMonth && penalty.percent >= PENAL_ANNUAL_PERCENT)
      ) {
        flags.push(
          flag(
            "penal-interest-high",
            "The penalty rate is steep",
            "The RBI Fair Practices Code for Lenders expects penal charges to be reasonable and proportionate to the default, " +
              "and not used as a revenue source. A rate at this level turns one missed payment into a fast-growing debt. " +
              "If your lender is RBI-regulated, ask for their published penal charges policy and check this against it.",
            perMonth
              ? `Penalty read as ${penalty.percent}% per month — roughly ${annualised}% a year on top of the interest.`
              : `Penalty read as ${penalty.percent}% a year on top of the interest.`,
            "serious",
            "established",
            ["rbi-fair-practices", "contract-act-1872"],
          ),
        );
      }
    }

    // 5. No prepayment terms at all.
    if (missing(omission, "prepayment-terms")) {
      flags.push(
        flag(
          "missing-prepayment-terms",
          "No prepayment terms are stated",
          "Without stated prepayment terms you cannot tell what it costs to close the loan early and stop paying interest. " +
            "The RBI Fair Practices Code for Lenders requires regulated lenders to disclose terms clearly up front. Ask for the " +
            "prepayment and foreclosure charges in writing before signing.",
          "No prepayment or foreclosure clause was found.",
          "caution",
          "established",
          ["rbi-fair-practices", "contract-act-1872"],
        ),
      );
    }

    // 6. No grievance route.
    if (missing(omission, "grievance-redressal")) {
      flags.push(
        flag(
          "missing-grievance-redressal",
          "No grievance redressal process is named",
          "The RBI Fair Practices Code for Lenders requires regulated lenders to run a grievance redressal mechanism and tell " +
            "borrowers how to reach it. With no route named here, a billing or recovery dispute has nowhere to go inside the " +
            "lender. Ask who the nodal officer is.",
          "No grievance, nodal officer or ombudsman clause was found.",
          "caution",
          "established",
          ["rbi-fair-practices"],
        ),
      );
    }
  }

  // 7. Applies to any contract: terms that one side can change alone.
  if (/reserves the right to (?:revise|change|modify|amend|alter)/i.test(text)) {
    flags.push(
      flag(
        "unilateral-variation",
        "One side can change the terms after you sign",
        "A contract is an agreement between two parties, so a term letting one of them rewrite it alone is open to challenge " +
          "under the Indian Contract Act, 1872 — particularly where you had no ability to negotiate. At minimum, ask for advance " +
          "notice and a right to exit without penalty if the terms change.",
        "The document lets one party revise terms after signing.",
        "caution",
        "established",
        ["contract-act-1872"],
      ),
    );
  }

  return flags;
}
