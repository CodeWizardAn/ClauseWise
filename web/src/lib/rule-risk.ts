/**
 * Rule-based clause risk — the deterministic floor under the AI layer.
 *
 * This is not a placeholder. It is a working analysis in its own right: a list
 * of patterns that are genuinely one-sided in Indian consumer contracts, each
 * carrying a weight. When the AI layer is unavailable the user still gets a
 * scored, explained clause list from this module — degraded in nuance, not in
 * honesty.
 *
 * Scores feed the same severityForScore() the AI path uses, so a band means the
 * same thing whichever path produced it.
 */

import { clampScore } from "@/lib/severity";

export interface RiskSignal {
  id: string;
  /** What was found, in plain language. */
  note: string;
  weight: number;
}

interface SignalRule {
  id: string;
  pattern: RegExp;
  note: string;
  weight: number;
}

const RULES: SignalRule[] = [
  {
    id: "sole-discretion",
    pattern: /sole discretion|absolute discretion|as (?:the )?\w+ may determine|at its discretion/i,
    note: "Leaves a decision entirely to the other side, with no standard you can hold them to.",
    weight: 28,
  },
  {
    id: "without-notice",
    pattern: /without (?:further |any |prior )?notice/i,
    note: "Lets the other side act without telling you first.",
    weight: 30,
  },
  {
    id: "penal-interest",
    pattern: /penal interest|penalty (?:interest|of)|default interest/i,
    note: "Imposes a penalty charge on top of what you already owe.",
    weight: 26,
  },
  {
    id: "unilateral-change",
    pattern: /reserves the right to (?:revise|change|modify|amend|alter)/i,
    note: "Allows one side to change the terms after you have signed.",
    weight: 30,
  },
  {
    id: "one-sided-arbitration",
    pattern: /arbitrator (?:appointed|nominated) by|sole arbitrator[^.]{0,60}(?:lender|licensor|company|employer)/i,
    note: "The other side picks the person who decides your dispute.",
    weight: 34,
  },
  {
    id: "waiver",
    pattern: /waive[sd]?\b|shall have no claim|no right to (?:object|contest)/i,
    note: "Gives up a right you would otherwise have.",
    weight: 24,
  },
  {
    id: "indemnity",
    pattern: /indemnif(?:y|ies|ication)|hold harmless/i,
    note: "Makes you cover the other side's losses, potentially without limit.",
    weight: 22,
  },
  {
    id: "no-registration",
    pattern: /shall not be registered|not(?:hing)? .{0,20}registered/i,
    note: "Avoids registration, which weakens your position if the agreement is disputed.",
    weight: 26,
  },
  {
    id: "lock-in",
    pattern: /lock[\s-]?in/i,
    note: "Ties you in for a minimum period even if you need to leave.",
    weight: 18,
  },
  {
    id: "forfeiture",
    pattern: /forfeit|non-?refundable|shall stand cancelled/i,
    note: "Money you have paid may not come back.",
    weight: 24,
  },
  {
    id: "immediate-recall",
    pattern: /immediately due and payable|recall the (?:entire|whole)|entire outstanding shall become/i,
    note: "The full amount can be demanded at once.",
    weight: 28,
  },
  {
    id: "third-party-recovery",
    pattern: /recovery agent|third party[^.]{0,40}recover|contact[^.]{0,60}(?:employer|references)/i,
    note: "Permits recovery agents or contact with your employer and references.",
    weight: 30,
  },
  {
    id: "assignment-without-consent",
    pattern: /assign[^.]{0,120}without[^.]{0,60}consent/i,
    note: "Your agreement can be transferred to someone else without asking you.",
    weight: 22,
  },
  {
    id: "entry-without-notice",
    pattern: /(?:enter|inspect)[^.]{0,120}(?:at any time|without[^.]{0,30}notice)/i,
    note: "Allows entry into the premises without warning.",
    weight: 30,
  },
  {
    id: "one-sided-termination",
    pattern: /may terminate[^.]{0,100}without assigning any reason/i,
    note: "One side can end the agreement without giving a reason.",
    weight: 30,
  },
  {
    id: "all-repairs-on-you",
    pattern: /(?:all repairs|structural repairs)[^.]{0,120}(?:licensee|tenant|borrower)[^.]{0,40}(?:cost|expense)/i,
    note: "Puts even structural repair costs on you.",
    weight: 26,
  },
];

export interface RuleRiskResult {
  score: number;
  signals: RiskSignal[];
  /** A plain-language summary built from what matched. */
  explanation: string;
}

export function assessClause(text: string): RuleRiskResult {
  const signals: RiskSignal[] = [];
  for (const rule of RULES) {
    if (rule.pattern.test(text)) {
      signals.push({ id: rule.id, note: rule.note, weight: rule.weight });
    }
  }

  // Diminishing returns: the second and third flags in one clause add less than
  // the first, so a clause is not pushed to Critical by sheer verbosity.
  const sorted = [...signals].sort((a, b) => b.weight - a.weight);
  let raw = 0;
  sorted.forEach((signal, index) => {
    raw += signal.weight * (index === 0 ? 1 : index === 1 ? 0.6 : 0.35);
  });

  const score = clampScore(raw);
  const explanation = signals.length
    ? sorted.map((signal) => signal.note).join(" ")
    : "No one-sided terms matched the rule set for this clause.";

  return { score, signals: sorted, explanation };
}
