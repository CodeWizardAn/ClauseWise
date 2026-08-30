/**
 * Document Version Comparison & Clause Shift Engine.
 *
 * Implements deterministic clause alignment, word-level Myers diffing,
 * numerical financial delta comparison, and risk shift classification.
 */

import { type ExtractedFigures } from "./figures";
import { type SegmentedClause } from "./segment";

export type DiffType = "added" | "removed" | "modified" | "identical";
export type RiskShift = "increased" | "decreased" | "unchanged" | "new_risk" | "removed_risk";
export type FinancialImpact = "favorable" | "unfavorable" | "neutral" | "caution";

export interface WordDiffToken {
  type: "same" | "add" | "del";
  text: string;
}

export interface AlignedClausePair {
  id: string;
  diffType: DiffType;
  clauseA: SegmentedClause | null;
  clauseB: SegmentedClause | null;
  title: string;
  similarityScore: number;
  wordDiff: WordDiffToken[];
  riskShift: RiskShift;
  shiftNote: string;
}

export interface FigureComparisonItem {
  id: string;
  label: string;
  valueA: string;
  valueB: string;
  deltaText: string;
  impact: FinancialImpact;
  explanation: string;
}

export interface ComparisonReport {
  summary: {
    totalClausesA: number;
    totalClausesB: number;
    addedCount: number;
    modifiedCount: number;
    removedCount: number;
    identicalCount: number;
    highRiskChangesCount: number;
    verdict: string;
    verdictLevel: "critical" | "caution" | "safe";
  };
  financialMatrix: FigureComparisonItem[];
  alignedClauses: AlignedClausePair[];
}

/**
 * Tokenize a string into words and punctuation tokens.
 */
function tokenizeWords(text: string): string[] {
  const matches = text.match(/[\w'-]+|[^\s\w]/g);
  return matches ?? [];
}

/**
 * Compute word-level diff using Longest Common Subsequence (LCS).
 */
export function computeWordDiff(textA: string, textB: string): WordDiffToken[] {
  const wordsA = tokenizeWords(textA);
  const wordsB = tokenizeWords(textB);

  const n = wordsA.length;
  const m = wordsB.length;

  if (n === 0 && m === 0) return [];
  if (n === 0) return wordsB.map((w) => ({ type: "add", text: w }));
  if (m === 0) return wordsA.map((w) => ({ type: "del", text: w }));

  // DP table for LCS
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (wordsA[i - 1].toLowerCase() === wordsB[j - 1].toLowerCase()) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to build diff
  const result: WordDiffToken[] = [];
  let i = n;
  let j = m;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && wordsA[i - 1].toLowerCase() === wordsB[j - 1].toLowerCase()) {
      result.unshift({ type: "same", text: wordsB[j - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: "add", text: wordsB[j - 1] });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      result.unshift({ type: "del", text: wordsA[i - 1] });
      i--;
    }
  }

  return result;
}

/**
 * Compute Jaccard Similarity between two texts.
 */
function jaccardSimilarity(textA: string, textB: string): number {
  const setA = new Set(tokenizeWords(textA.toLowerCase()));
  const setB = new Set(tokenizeWords(textB.toLowerCase()));

  if (setA.size === 0 && setB.size === 0) return 1.0;
  if (setA.size === 0 || setB.size === 0) return 0.0;

  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }

  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Compare extracted financial figures between Doc A and Doc B.
 */
export function compareFigures(
  figA: ExtractedFigures | null,
  figB: ExtractedFigures | null
): FigureComparisonItem[] {
  const items: FigureComparisonItem[] = [];

  // 1. Rent Comparison
  const rentA = figA?.rent?.amount;
  const rentB = figB?.rent?.amount;
  if (rentA !== undefined || rentB !== undefined) {
    let deltaText = "Unchanged";
    let impact: FinancialImpact = "neutral";
    let explanation = "Rent amount remains consistent between drafts.";

    if (rentA !== undefined && rentB !== undefined) {
      const diff = rentB - rentA;
      const pct = Math.round((diff / rentA) * 100);
      if (diff > 0) {
        deltaText = `+₹${diff.toLocaleString("en-IN")} (+${pct}%)`;
        impact = "unfavorable";
        explanation = `Monthly rent increased by ${pct}% in the revised draft.`;
      } else if (diff < 0) {
        deltaText = `-₹${Math.abs(diff).toLocaleString("en-IN")} (${pct}%)`;
        impact = "favorable";
        explanation = `Monthly rent was reduced by ${Math.abs(pct)}% in the revised draft.`;
      }
    } else if (rentB !== undefined && rentA === undefined) {
      deltaText = "Added in Version B";
      impact = "caution";
      explanation = "New rent figure introduced in the revised draft.";
    } else if (rentA !== undefined && rentB === undefined) {
      deltaText = "Omitted in Version B";
      impact = "caution";
      explanation = "Rent figure was omitted or altered in the revised draft.";
    }

    items.push({
      id: "rent",
      label: "Monthly Rent",
      valueA: rentA !== undefined ? `₹${rentA.toLocaleString("en-IN")}` : "Not Specified",
      valueB: rentB !== undefined ? `₹${rentB.toLocaleString("en-IN")}` : "Not Specified",
      deltaText,
      impact,
      explanation,
    });
  }

  // 2. Loan EMI Comparison
  const emiA = figA?.emi?.amount;
  const emiB = figB?.emi?.amount;
  if (emiA !== undefined || emiB !== undefined) {
    let deltaText = "Unchanged";
    let impact: FinancialImpact = "neutral";
    let explanation = "EMI instalment remains unchanged.";

    if (emiA !== undefined && emiB !== undefined) {
      const diff = emiB - emiA;
      const pct = Math.round((diff / emiA) * 100);
      if (diff > 0) {
        deltaText = `+₹${diff.toLocaleString("en-IN")} (+${pct}%)`;
        impact = "unfavorable";
        explanation = `Monthly EMI increased in the revised draft.`;
      } else if (diff < 0) {
        deltaText = `-₹${Math.abs(diff).toLocaleString("en-IN")} (${pct}%)`;
        impact = "favorable";
        explanation = `Monthly EMI reduced in the revised draft.`;
      }
    }

    items.push({
      id: "emi",
      label: "Monthly EMI",
      valueA: emiA !== undefined ? `₹${emiA.toLocaleString("en-IN")}` : "Not Specified",
      valueB: emiB !== undefined ? `₹${emiB.toLocaleString("en-IN")}` : "Not Specified",
      deltaText,
      impact,
      explanation,
    });
  }

  // 3. Security Deposit Comparison
  const depA = figA?.deposit?.amount;
  const depB = figB?.deposit?.amount;
  if (depA !== undefined || depB !== undefined) {
    let deltaText = "Unchanged";
    let impact: FinancialImpact = "neutral";
    let explanation = "Security deposit amount remains identical.";

    if (depA !== undefined && depB !== undefined) {
      const diff = depB - depA;
      const pct = Math.round((diff / depA) * 100);
      if (diff > 0) {
        deltaText = `+₹${diff.toLocaleString("en-IN")} (+${pct}%)`;
        impact = "unfavorable";
        explanation = `Landlord increased the upfront security deposit.`;
      } else if (diff < 0) {
        deltaText = `-₹${Math.abs(diff).toLocaleString("en-IN")} (${pct}%)`;
        impact = "favorable";
        explanation = `Security deposit decreased in the revised draft.`;
      }
    }

    items.push({
      id: "deposit",
      label: "Security Deposit",
      valueA: depA !== undefined ? `₹${depA.toLocaleString("en-IN")}` : "Not Specified",
      valueB: depB !== undefined ? `₹${depB.toLocaleString("en-IN")}` : "Not Specified",
      deltaText,
      impact,
      explanation,
    });
  }

  // 4. Rate Figures (Interest & Penalty)
  const intA = figA?.interestRate?.percent;
  const intB = figB?.interestRate?.percent;
  if (intA !== undefined || intB !== undefined) {
    let deltaText = "Unchanged";
    let impact: FinancialImpact = "neutral";
    let explanation = "Interest rate remains unchanged.";

    if (intA !== undefined && intB !== undefined) {
      const diff = intB - intA;
      if (diff > 0) {
        deltaText = `+${diff.toFixed(2)}%`;
        impact = "unfavorable";
        explanation = "Interest rate increased in revised draft.";
      } else if (diff < 0) {
        deltaText = `${diff.toFixed(2)}%`;
        impact = "favorable";
        explanation = "Interest rate reduced in revised draft.";
      }
    }

    items.push({
      id: "interest",
      label: "Interest Rate",
      valueA: intA !== undefined ? `${intA}% p.a.` : "Not Specified",
      valueB: intB !== undefined ? `${intB}% p.a.` : "Not Specified",
      deltaText,
      impact,
      explanation,
    });
  }

  const penA = figA?.penaltyRate?.percent;
  const penB = figB?.penaltyRate?.percent;
  if (penA !== undefined || penB !== undefined) {
    let deltaText = "Unchanged";
    let impact: FinancialImpact = "neutral";
    let explanation = "Penal rate remains unchanged.";

    if (penA !== undefined && penB !== undefined) {
      const diff = penB - penA;
      if (diff > 0) {
        deltaText = `+${diff.toFixed(2)}%`;
        impact = "unfavorable";
        explanation = "Default penal charge was increased in revised draft.";
      } else if (diff < 0) {
        deltaText = `${diff.toFixed(2)}%`;
        impact = "favorable";
        explanation = "Penal charge was reduced in revised draft.";
      }
    }

    items.push({
      id: "penalty",
      label: "Penal Interest / Default Rate",
      valueA: penA !== undefined ? `${penA}%` : "Not Specified",
      valueB: penB !== undefined ? `${penB}%` : "Not Specified",
      deltaText,
      impact,
      explanation,
    });
  }

  return items;
}

/**
 * Align clauses between Document A and Document B.
 */
export function alignDocumentClauses(
  clausesA: SegmentedClause[],
  clausesB: SegmentedClause[]
): AlignedClausePair[] {
  const pairedA = new Set<number>();
  const pairedB = new Set<number>();
  const aligned: AlignedClausePair[] = [];

  // Pass 1: Match identical or highly similar clauses (Similarity >= 0.45)
  for (let i = 0; i < clausesA.length; i++) {
    const a = clausesA[i];
    let bestMatchIdx = -1;
    let bestScore = 0;

    for (let j = 0; j < clausesB.length; j++) {
      if (pairedB.has(j)) continue;
      const b = clausesB[j];

      let score = jaccardSimilarity(a.text, b.text);

      // Boost if title matches
      if (a.title && b.title && a.title.toLowerCase() === b.title.toLowerCase()) {
        score = Math.min(1.0, score + 0.35);
      }

      if (score > bestScore && score >= 0.4) {
        bestScore = score;
        bestMatchIdx = j;
      }
    }

    if (bestMatchIdx !== -1) {
      const b = clausesB[bestMatchIdx];
      pairedA.add(i);
      pairedB.add(bestMatchIdx);

      const isIdentical = a.text.trim() === b.text.trim();
      const diffType: DiffType = isIdentical ? "identical" : "modified";
      const wordDiff = isIdentical
        ? [{ type: "same" as const, text: b.text }]
        : computeWordDiff(a.text, b.text);

      let riskShift: RiskShift = "unchanged";
      let shiftNote = "Clause terms remain unchanged.";

      if (!isIdentical) {
        // Detect keyword shifts (e.g. non-compete, lock-in, penalty)
        const hasPenaltyShift =
          /penalty|forfeit|liquidated damages|compound/i.test(b.text) &&
          !/penalty|forfeit|liquidated damages|compound/i.test(a.text);

        if (hasPenaltyShift) {
          riskShift = "increased";
          shiftNote = "New penalty or liability terms inserted into this clause.";
        } else {
          shiftNote = "Clause wording or specific parameters modified.";
        }
      }

      aligned.push({
        id: `pair-${i}-${bestMatchIdx}`,
        diffType,
        clauseA: a,
        clauseB: b,
        title: b.title || a.title || `Clause ${aligned.length + 1}`,
        similarityScore: bestScore,
        wordDiff,
        riskShift,
        shiftNote,
      });
    }
  }

  // Pass 2: Remaining clauses in A were REMOVED in B
  for (let i = 0; i < clausesA.length; i++) {
    if (!pairedA.has(i)) {
      const a = clausesA[i];
      aligned.push({
        id: `removed-${i}`,
        diffType: "removed",
        clauseA: a,
        clauseB: null,
        title: a.title || `Clause ${a.index} (Deleted)`,
        similarityScore: 0,
        wordDiff: a.text.split(/\s+/).map((t) => ({ type: "del", text: t })),
        riskShift: "removed_risk",
        shiftNote: "This clause existed in Version A but was deleted in Version B.",
      });
    }
  }

  // Pass 3: Remaining clauses in B were ADDED in B
  for (let j = 0; j < clausesB.length; j++) {
    if (!pairedB.has(j)) {
      const b = clausesB[j];
      const isHighRisk = /non-compete|lock-in|forfeit|penalty|indemnify|liquidated damages|unilateral/i.test(
        b.text
      );

      aligned.push({
        id: `added-${j}`,
        diffType: "added",
        clauseA: null,
        clauseB: b,
        title: b.title || `Clause ${b.index} (New)`,
        similarityScore: 0,
        wordDiff: b.text.split(/\s+/).map((t) => ({ type: "add", text: t })),
        riskShift: isHighRisk ? "new_risk" : "unchanged",
        shiftNote: isHighRisk
          ? "⚠️ New potentially high-risk covenant introduced in Version B."
          : "New clause introduced in Version B.",
      });
    }
  }

  return aligned;
}

/**
 * Generate full document version comparison report.
 */
export function generateComparisonReport(
  clausesA: SegmentedClause[],
  clausesB: SegmentedClause[],
  figuresA: ExtractedFigures | null,
  figuresB: ExtractedFigures | null
): ComparisonReport {
  const alignedClauses = alignDocumentClauses(clausesA, clausesB);
  const financialMatrix = compareFigures(figuresA, figuresB);

  const addedCount = alignedClauses.filter((c) => c.diffType === "added").length;
  const modifiedCount = alignedClauses.filter((c) => c.diffType === "modified").length;
  const removedCount = alignedClauses.filter((c) => c.diffType === "removed").length;
  const identicalCount = alignedClauses.filter((c) => c.diffType === "identical").length;
  const highRiskChangesCount = alignedClauses.filter(
    (c) => c.riskShift === "new_risk" || c.riskShift === "increased"
  ).length;

  let verdict = "Versions are substantively identical with minimal changes.";
  let verdictLevel: "critical" | "caution" | "safe" = "safe";

  if (highRiskChangesCount > 0 || financialMatrix.some((f) => f.impact === "unfavorable")) {
    verdict = `Version B introduces ${highRiskChangesCount} heightened risk points and unfavorable financial adjustments compared to Version A. Review carefully before signing.`;
    verdictLevel = "critical";
  } else if (modifiedCount > 0 || addedCount > 0 || removedCount > 0) {
    verdict = `Version B contains ${modifiedCount + addedCount + removedCount} structural clause edits. Verify that agreed terms are accurately captured.`;
    verdictLevel = "caution";
  }

  return {
    summary: {
      totalClausesA: clausesA.length,
      totalClausesB: clausesB.length,
      addedCount,
      modifiedCount,
      removedCount,
      identicalCount,
      highRiskChangesCount,
      verdict,
      verdictLevel,
    },
    financialMatrix,
    alignedClauses,
  };
}
