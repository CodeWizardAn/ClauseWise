/**
 * Affordability engine — FOIR, computed in code.
 *
 * FOIR (Fixed Obligation to Income Ratio) is the share of take-home pay already
 * committed to fixed monthly outflows once this document's obligation is added.
 * It is arithmetic. No model is consulted, and none ever should be: a number a
 * language model guesses is a number nobody can defend.
 *
 * What counts, and what does not:
 *
 *   Included — existing EMIs, existing rent where it continues, and the new
 *   EMI or rent this document imposes. These are mandatory long-term outflows.
 *
 *   Excluded — statutory deductions (PF, professional tax) because income is
 *   already taken net of them; and lifestyle spending and SIPs, because they
 *   are discretionary and can be stopped. Including them would overstate FOIR
 *   and call safe borrowing risky.
 *
 * Income is net monthly take-home, after tax.
 */

export type AffordabilityBand = "safe" | "caution" | "risky";

/** Thresholds in percent. Safe up to 40, caution up to 50, risky above. */
export const FOIR_SAFE_MAX = 40;
export const FOIR_CAUTION_MAX = 50;

export interface AffordabilityInput {
  /** Net monthly take-home income, after tax. */
  netMonthlyIncome: number;
  /** Total existing fixed monthly obligations: current EMIs, ongoing rent. */
  existingObligations: number;
  /** The new monthly outflow this document adds (EMI or rent). */
  proposedObligation: number;
}

export interface AffordabilityResult {
  foir: number;
  band: AffordabilityBand;
  emoji: string;
  headline: string;
  explanation: string;
  /** The same verdict as separate sentences, so each can be translated safely. */
  explanationParts: string[];
  /** The numbers used, so the arithmetic is checkable on screen. */
  totalObligations: number;
  input: AffordabilityInput;
}

export interface AffordabilityError {
  error: string;
}

export const BAND_LABELS: Record<AffordabilityBand, string> = {
  safe: "Safe",
  caution: "Caution",
  risky: "Risky",
};

export const BAND_EMOJI: Record<AffordabilityBand, string> = {
  safe: "🟢",
  caution: "🟡",
  risky: "🔴",
};

export function bandFor(foir: number): AffordabilityBand {
  if (foir <= FOIR_SAFE_MAX) return "safe";
  if (foir <= FOIR_CAUTION_MAX) return "caution";
  return "risky";
}

export function formatRupees(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * The verdict is built from separate sentences, and only the reader's own FOIR
 * figure is a protected slot.
 *
 * This is not a style choice. IndicTrans2 drops a slot often enough that a
 * sentence carrying two of them has to be discarded — silently losing a
 * percentage. The 40%/50% thresholds were therefore taken out of the prose
 * entirely; they are still shown, exactly, in the bands legend beneath the
 * verdict, where no translation touches them.
 */
function explainParts(band: AffordabilityBand, foir: number): string[] {
  const share = `After this commitment, ${foir.toFixed(1)}% of your take-home income goes to fixed obligations.`;
  if (band === "safe") {
    return [share, `That is comfortable by the standard most Indian lenders apply.`];
  }
  if (band === "caution") {
    return [
      share,
      `That is past the comfort level most Indian lenders apply, though still under their usual ceiling. Little room is left for a bad month.`,
    ];
  }
  return [
    share,
    `That is past the level most Indian banks consider safe. Lenders commonly decline at this ratio, and an unexpected expense would be hard to absorb.`,
  ];
}

export function computeAffordability(
  input: AffordabilityInput,
): AffordabilityResult | AffordabilityError {
  const { netMonthlyIncome, existingObligations, proposedObligation } = input;

  if (!Number.isFinite(netMonthlyIncome) || netMonthlyIncome <= 0) {
    return { error: "Enter your net monthly take-home income to compute affordability." };
  }
  if (!Number.isFinite(existingObligations) || existingObligations < 0) {
    return { error: "Existing monthly obligations must be zero or more." };
  }
  if (!Number.isFinite(proposedObligation) || proposedObligation < 0) {
    return { error: "The obligation from this document could not be read as a number." };
  }

  const totalObligations = existingObligations + proposedObligation;
  const foir = (totalObligations / netMonthlyIncome) * 100;
  const band = bandFor(foir);

  return {
    foir,
    band,
    emoji: BAND_EMOJI[band],
    headline: `${BAND_EMOJI[band]} ${BAND_LABELS[band]} — FOIR ${foir.toFixed(1)}%`,
    explanation: explainParts(band, foir).join(" "),
    explanationParts: explainParts(band, foir),
    totalObligations,
    input,
  };
}

export function isAffordabilityError(
  value: AffordabilityResult | AffordabilityError,
): value is AffordabilityError {
  return "error" in value;
}
