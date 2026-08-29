/**
 * Deterministic extraction of the money figures a contract imposes.
 *
 * Every number here is read out of the document with a regex and classified by
 * the words around it. Nothing is inferred, estimated or generated. These are
 * the figures Phase 1's redaction was built to preserve.
 */

export type FigureKind = "emi" | "rent" | "deposit";
export type RateKind = "interest" | "penalty";

export interface MoneyFigure {
  kind: FigureKind;
  /** Value in rupees. */
  amount: number;
  /** Exactly as printed in the document, e.g. "Rs. 20,140/-". */
  matchedText: string;
  /** The sentence fragment it was found in, for the user to check us. */
  context: string;
}

export interface RateFigure {
  kind: RateKind;
  percent: number;
  matchedText: string;
  context: string;
}

export interface ExtractedFigures {
  emi: MoneyFigure | null;
  rent: MoneyFigure | null;
  deposit: MoneyFigure | null;
  interestRate: RateFigure | null;
  penaltyRate: RateFigure | null;
  /** The recurring monthly outflow this document would add. */
  monthlyObligation: MoneyFigure | null;
}

const AMOUNT = /(?:₹|Rs\.?|INR|USD|\$)\s*\d[\d,]*(?:\.\d{1,2})?(?:\s*\/-)?/gi;
const PERCENT = /\d{1,3}(?:\.\d+)?\s*%/g;

/**
 * How far around a figure we look for the words that classify it.
 *
 * Indian rent clauses put a lot of words between the label and the number:
 * "The monthly rent and maintenance charges payable by the Lessee to the Lessor
 * for the schedule property shall be Rs. 8,300/-" leaves a 96-character gap. A
 * tighter window silently classifies nothing, and affordability then falls back
 * to a zero obligation — a wrong answer that looks like a working one.
 */
const WINDOW = 170;

const MONEY_KEYWORDS: Record<FigureKind, string[]> = {
  emi: [
    "equated monthly instal",
    "monthly instal",
    "instalment",
    "installment",
    "emi",
  ],
  rent: [
    "monthly rent",
    "rent of",
    "rent payable",
    "rent shall",
    "lease rent",
    // Some agreements bill rent and maintenance as one monthly figure. This
    // phrasing is deliberately specific: a standalone "maintenance charges"
    // keyword would let a separate society-maintenance line outrank the rent.
    "rent and maintenance",
    "licence fee",
    "license fee",
    "monthly licence",
    "rent",
  ],
  deposit: [
    "security deposit",
    "interest free refundable",
    "interest free security",
    "refundable deposit",
    "deposit of",
    "deposit with",
    "as advance",
    "advance amount",
  ],
};

const RATE_KEYWORDS: Record<RateKind, string[]> = {
  interest: ["rate of interest", "interest at the rate", "per annum", "interest shall"],
  // Deliberately narrow: a penal or default rate is the one that compounds a
  // missed payment. A prepayment charge is a fee, not a penalty rate, and
  // including it here let a 4% exit fee outrank 3% per month penal interest.
  penalty: ["penal", "penalty", "default", "overdue", "delayed payment"],
};

export function parseAmount(text: string): number {
  // Strip the currency mark first. Stripping every non-digit except "." would
  // keep the full stop in "Rs." and turn "Rs. 20,140/-" into 0.2014.
  const withoutCurrency = text.replace(/^\s*(?:₹|Rs\.?|INR|USD|\$)\s*/i, "");
  const withoutSuffix = withoutCurrency.replace(/\s*\/-\s*$/, "");
  const digits = withoutSuffix.replace(/[,\s]/g, "");
  const value = Number.parseFloat(digits);
  return Number.isFinite(value) ? value : Number.NaN;
}

function contextAround(text: string, start: number, end: number): string {
  const from = Math.max(0, start - 70);
  const to = Math.min(text.length, end + 70);
  return text.slice(from, to).replace(/\s+/g, " ").trim();
}

/**
 * Keywords must match whole words.
 *
 * Substring matching quietly ruins this: "emi" occurs inside "premises", so a
 * rental agreement's maintenance charge gets read as a loan instalment, and
 * "rent" occurs inside "different" and "current". Both produce a confident,
 * wrong number.
 */
const KEYWORD_PATTERNS = new Map<string, RegExp>();

function keywordPattern(keyword: string): RegExp {
  let pattern = KEYWORD_PATTERNS.get(keyword);
  if (!pattern) {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    pattern = new RegExp(`\\b${escaped}\\b`, "g");
    KEYWORD_PATTERNS.set(keyword, pattern);
  }
  pattern.lastIndex = 0;
  return pattern;
}

/** Distance from a match to the nearest occurrence of any keyword, or null. */
function nearestKeyword(
  lowered: string,
  start: number,
  end: number,
  keywords: string[],
): number | null {
  const from = Math.max(0, start - WINDOW);
  const to = Math.min(lowered.length, end + WINDOW);
  const before = lowered.slice(from, start);
  const after = lowered.slice(end, to);

  let best: number | null = null;
  for (const keyword of keywords) {
    const beforePattern = keywordPattern(keyword);
    let lastEnd: number | null = null;
    let found: RegExpExecArray | null;
    while ((found = beforePattern.exec(before)) !== null) {
      lastEnd = found.index + found[0].length;
    }
    if (lastEnd !== null) {
      const gap = before.length - lastEnd;
      if (best === null || gap < best) best = gap;
    }

    const afterPattern = keywordPattern(keyword);
    const next = afterPattern.exec(after);
    if (next && (best === null || next.index < best)) best = next.index;
  }
  return best;
}

export function extractFigures(text: string): ExtractedFigures {
  const lowered = text.toLowerCase();

  const money: Record<FigureKind, MoneyFigure | null> = {
    emi: null,
    rent: null,
    deposit: null,
  };
  const moneyGap: Record<FigureKind, number> = {
    emi: Infinity,
    rent: Infinity,
    deposit: Infinity,
  };

  for (const match of text.matchAll(AMOUNT)) {
    const start = match.index ?? 0;
    const end = start + match[0].length;
    const amount = parseAmount(match[0]);
    if (!Number.isFinite(amount) || amount <= 0) continue;

    for (const kind of Object.keys(MONEY_KEYWORDS) as FigureKind[]) {
      const gap = nearestKeyword(lowered, start, end, MONEY_KEYWORDS[kind]);
      if (gap === null) continue;
      // Closest keyword wins, so "deposit of Rs X" does not become the rent.
      const others = (Object.keys(MONEY_KEYWORDS) as FigureKind[])
        .filter((other) => other !== kind)
        .map((other) => nearestKeyword(lowered, start, end, MONEY_KEYWORDS[other]))
        .filter((value): value is number => value !== null);
      if (others.some((value) => value < gap)) continue;
      if (gap < moneyGap[kind]) {
        moneyGap[kind] = gap;
        money[kind] = {
          kind,
          amount,
          matchedText: match[0].trim(),
          context: contextAround(text, start, end),
        };
      }
    }
  }

  const rates: Record<RateKind, RateFigure | null> = { interest: null, penalty: null };
  const rateGap: Record<RateKind, number> = { interest: Infinity, penalty: Infinity };

  for (const match of text.matchAll(PERCENT)) {
    const start = match.index ?? 0;
    const end = start + match[0].length;
    const percent = Number.parseFloat(match[0]);
    if (!Number.isFinite(percent)) continue;

    const penaltyGap = nearestKeyword(lowered, start, end, RATE_KEYWORDS.penalty);
    const interestGap = nearestKeyword(lowered, start, end, RATE_KEYWORDS.interest);

    // A penal rate is also literally "interest": the phrase "penal interest at
    // the rate of 3%" contains an interest keyword sitting closer to the number
    // than the word "penal" does. So proximity cannot decide this — the mere
    // presence of a penalty keyword nearby settles it.
    const kind: RateKind | null =
      penaltyGap !== null ? "penalty" : interestGap !== null ? "interest" : null;
    if (!kind) continue;
    const gap = (kind === "penalty" ? penaltyGap : interestGap) as number;
    if (gap < rateGap[kind]) {
      rateGap[kind] = gap;
      rates[kind] = {
        kind,
        percent,
        matchedText: match[0].trim(),
        context: contextAround(text, start, end),
      };
    }
  }

  return {
    emi: money.emi,
    rent: money.rent,
    deposit: money.deposit,
    interestRate: rates.interest,
    penaltyRate: rates.penalty,
    // A document imposes one recurring outflow: an EMI or a rent, not both.
    monthlyObligation: money.emi ?? money.rent,
  };
}
