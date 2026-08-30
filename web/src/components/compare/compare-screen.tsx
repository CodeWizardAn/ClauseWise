"use client";

import { useState } from "react";
import { Icon } from "@/components/icon-sprite";
import { toast } from "@/components/toast";
import type { ComparisonReport, DiffType, AlignedClausePair } from "@/lib/compare";

interface CompareApiResponse {
  documentA: { filename: string; totalClauses: number };
  documentB: { filename: string; totalClauses: number };
  report: ComparisonReport;
}

export function CompareScreen() {
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [result, setResult] = useState<CompareApiResponse | null>(null);

  const [activeTab, setActiveTab] = useState<"diff" | "financial" | "advice">("diff");
  const [filterType, setFilterType] = useState<"all" | "high_risk" | "added" | "modified" | "removed">("all");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, which: "A" | "B") => {
    const file = e.target.files?.[0];
    if (file) {
      if (which === "A") setFileA(file);
      else setFileB(file);
    }
  };

  const handleRunComparison = async () => {
    if (!fileA || !fileB) {
      toast("Please select both Version A (Original) and Version B (Revised) files.", "error");
      return;
    }

    setLoading(true);
    setLoadingStep("Extracting and redacting personal identifiers in memory...");

    try {
      const form = new FormData();
      form.append("fileA", fileA);
      form.append("fileB", fileB);

      const res = await fetch("/api/compare", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Comparison failed with status ${res.status}`);
      }

      const data: CompareApiResponse = await res.json();
      setResult(data);
      toast("Comparison analysis complete!", "success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Comparison failed";
      toast(message, "error");
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  const filteredClauses = result?.report.alignedClauses.filter((pair) => {
    if (filterType === "all") return true;
    if (filterType === "high_risk") {
      return pair.riskShift === "new_risk" || pair.riskShift === "increased";
    }
    return pair.diffType === filterType;
  }) ?? [];

  const getDiffBadge = (diffType: DiffType) => {
    switch (diffType) {
      case "added":
        return { label: "+ Added Clause", bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" };
      case "modified":
        return { label: "✏️ Modified Terms", bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" };
      case "removed":
        return { label: "- Deleted Protection", bg: "#F3F4F6", color: "#4B5563", border: "#E5E7EB" };
      case "identical":
        return { label: "✓ Unchanged", bg: "#F0FDF4", color: "#16A34A", border: "#BBF7D0" };
    }
  };

  return (
    <div className="container" style={{ paddingBottom: "96px" }}>
      {/* Header */}
      <div className="stack center tac g16" style={{ maxWidth: 820, margin: "0 auto 36px" }}>
        <div className="eyebrow" style={{ marginTop: "24px" }}>
          Document Diff &amp; Shift Analyzer · PCE SW PS 10
        </div>
        <h1 className="display balance" style={{ fontSize: "2.75rem", lineHeight: 1.15 }}>
          Compare two versions of{" "}
          <span className="accent" style={{ color: "var(--cw-accent-deep)" }}>
            your agreement.
          </span>
        </h1>
        <p className="lead balance" style={{ maxWidth: "60ch", color: "var(--cw-text-2)" }}>
          Upload the original and revised drafts (or renewal lease). ClauseWise highlights newly added obligations, altered financial amounts, and deleted tenant/borrower protections side by side.
        </p>
      </div>

      {/* Upload Box (if no result yet or user wants to re-upload) */}
      {!result && (
        <div
          style={{
            maxWidth: "840px",
            margin: "0 auto 40px",
            background: "#fff",
            borderRadius: "20px",
            border: "1px solid var(--cw-border)",
            padding: "36px",
            boxShadow: "0 8px 30px -8px rgba(0,0,0,0.06)",
          }}
        >
          <div className="grid grid-2" style={{ gap: "24px" }}>
            {/* Version A Dropzone */}
            <div
              style={{
                border: "2px dashed",
                borderColor: fileA ? "var(--cw-accent)" : "var(--cw-border)",
                background: fileA ? "var(--cw-accent-surface)" : "var(--cw-surface-warm)",
                borderRadius: "16px",
                padding: "28px 20px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "#fff",
                  display: "grid",
                  placeItems: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <Icon name="doc" style={{ width: "22px", height: "22px", color: "var(--cw-accent-deep)" }} />
              </div>
              <div>
                <b style={{ fontSize: "15px", display: "block", color: "var(--cw-text-1)" }}>
                  Version A: Original Draft
                </b>
                <span style={{ fontSize: "12.5px", color: "var(--cw-text-3)" }}>
                  {fileA ? fileA.name : "Previous year agreement / Initial draft"}
                </span>
              </div>
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={(e) => handleFileChange(e, "A")}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
              <span className="btn btn-secondary btn-sm" style={{ pointerEvents: "none" }}>
                {fileA ? "Change File" : "Choose File A"}
              </span>
            </div>

            {/* Version B Dropzone */}
            <div
              style={{
                border: "2px dashed",
                borderColor: fileB ? "var(--cw-accent)" : "var(--cw-border)",
                background: fileB ? "var(--cw-accent-surface)" : "var(--cw-surface-warm)",
                borderRadius: "16px",
                padding: "28px 20px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "#fff",
                  display: "grid",
                  placeItems: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <Icon name="compare" style={{ width: "22px", height: "22px", color: "var(--cw-accent-dark)" }} />
              </div>
              <div>
                <b style={{ fontSize: "15px", display: "block", color: "var(--cw-text-1)" }}>
                  Version B: Revised Draft
                </b>
                <span style={{ fontSize: "12.5px", color: "var(--cw-text-3)" }}>
                  {fileB ? fileB.name : "New renewal contract / Counter draft"}
                </span>
              </div>
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={(e) => handleFileChange(e, "B")}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
              <span className="btn btn-secondary btn-sm" style={{ pointerEvents: "none" }}>
                {fileB ? "Change File" : "Choose File B"}
              </span>
            </div>
          </div>

          <div className="row center mt32">
            <button
              onClick={handleRunComparison}
              disabled={loading || !fileA || !fileB}
              className="btn btn-primary btn-lg"
              style={{ minWidth: "260px" }}
            >
              {loading ? (
                <span>Comparing Documents...</span>
              ) : (
                <>
                  <Icon name="compare" /> Compare Both Versions
                </>
              )}
            </button>
          </div>

          {loading && (
            <p className="small tac mt16" style={{ color: "var(--cw-text-2)" }}>
              {loadingStep}
            </p>
          )}
        </div>
      )}

      {/* Results View */}
      {result && (
        <div className="stack g24" style={{ maxWidth: 1040, margin: "0 auto" }}>
          {/* Executive Verdict Banner */}
          <div
            style={{
              padding: "24px 28px",
              borderRadius: "18px",
              background: result.report.summary.verdictLevel === "critical" ? "#FEF2F2" : "#FFFBEB",
              border: `1.5px solid ${result.report.summary.verdictLevel === "critical" ? "#FECACA" : "#FDE68A"}`,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div className="row g14" style={{ alignItems: "flex-start", flex: 1, minWidth: "280px" }}>
              <Icon
                name={result.report.summary.verdictLevel === "critical" ? "risk" : "plain"}
                style={{
                  width: "24px",
                  height: "24px",
                  color: result.report.summary.verdictLevel === "critical" ? "#DC2626" : "#D97706",
                  marginTop: "2px",
                  flex: "none",
                }}
              />
              <div>
                <h3
                  style={{
                    margin: "0 0 4px",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: result.report.summary.verdictLevel === "critical" ? "#991B1B" : "#92400E",
                  }}
                >
                  Version Shift Verdict
                </h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.5", color: "var(--cw-text-1)" }}>
                  {result.report.summary.verdict}
                </p>
              </div>
            </div>

            <button
              onClick={() => setResult(null)}
              className="btn btn-secondary btn-sm"
              style={{ flex: "none" }}
            >
              Compare Different Files
            </button>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-4" style={{ gap: "14px" }}>
            <div className="card card-p tac" style={{ padding: "16px" }}>
              <span className="small mute">Added Clauses</span>
              <h2 style={{ margin: "4px 0 0", color: "#DC2626", fontSize: "1.8rem" }}>
                +{result.report.summary.addedCount}
              </h2>
            </div>
            <div className="card card-p tac" style={{ padding: "16px" }}>
              <span className="small mute">Modified Clauses</span>
              <h2 style={{ margin: "4px 0 0", color: "#D97706", fontSize: "1.8rem" }}>
                {result.report.summary.modifiedCount}
              </h2>
            </div>
            <div className="card card-p tac" style={{ padding: "16px" }}>
              <span className="small mute">Deleted Protections</span>
              <h2 style={{ margin: "4px 0 0", color: "#4B5563", fontSize: "1.8rem" }}>
                -{result.report.summary.removedCount}
              </h2>
            </div>
            <div className="card card-p tac" style={{ padding: "16px" }}>
              <span className="small mute">Identical Clauses</span>
              <h2 style={{ margin: "4px 0 0", color: "#16A34A", fontSize: "1.8rem" }}>
                {result.report.summary.identicalCount}
              </h2>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="row between wrap g12" style={{ borderBottom: "1px solid var(--cw-border)", paddingBottom: "10px" }}>
            <div className="row g8">
              <button
                onClick={() => setActiveTab("diff")}
                className={`btn ${activeTab === "diff" ? "btn-primary" : "btn-ghost"}`}
                style={{ height: "38px", fontSize: "14px" }}
              >
                <Icon name="compare" /> Side-by-Side Clause Diff ({result.report.alignedClauses.length})
              </button>
              {result.report.financialMatrix.length > 0 && (
                <button
                  onClick={() => setActiveTab("financial")}
                  className={`btn ${activeTab === "financial" ? "btn-primary" : "btn-ghost"}`}
                  style={{ height: "38px", fontSize: "14px" }}
                >
                  <Icon name="loan" /> Financial Delta Matrix ({result.report.financialMatrix.length})
                </button>
              )}
            </div>

            {activeTab === "diff" && (
              <div className="row g6 wrap" style={{ fontSize: "12px" }}>
                <button
                  onClick={() => setFilterType("all")}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    border: "1px solid var(--cw-border)",
                    background: filterType === "all" ? "var(--cw-accent-surface)" : "#fff",
                    color: filterType === "all" ? "var(--cw-accent-deep)" : "var(--cw-text-2)",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  All ({result.report.alignedClauses.length})
                </button>
                <button
                  onClick={() => setFilterType("high_risk")}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    border: "1px solid var(--cw-border)",
                    background: filterType === "high_risk" ? "#FEF2F2" : "#fff",
                    color: filterType === "high_risk" ? "#DC2626" : "var(--cw-text-2)",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  🔴 High Risk ({result.report.summary.highRiskChangesCount})
                </button>
                <button
                  onClick={() => setFilterType("added")}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    border: "1px solid var(--cw-border)",
                    background: filterType === "added" ? "var(--cw-surface-warm)" : "#fff",
                    color: filterType === "added" ? "var(--cw-text-1)" : "var(--cw-text-2)",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Added (+{result.report.summary.addedCount})
                </button>
                <button
                  onClick={() => setFilterType("modified")}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    border: "1px solid var(--cw-border)",
                    background: filterType === "modified" ? "var(--cw-surface-warm)" : "#fff",
                    color: filterType === "modified" ? "var(--cw-text-1)" : "var(--cw-text-2)",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Modified ({result.report.summary.modifiedCount})
                </button>
              </div>
            )}
          </div>

          {/* TAB 1: Financial Shift Matrix */}
          {activeTab === "financial" && (
            <div className="stack g16">
              <div
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1px solid var(--cw-border)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr",
                    padding: "14px 20px",
                    background: "var(--cw-surface-warm)",
                    fontWeight: 600,
                    fontSize: "13px",
                    color: "var(--cw-text-2)",
                    borderBottom: "1px solid var(--cw-border)",
                  }}
                >
                  <span>Financial Term</span>
                  <span>Version A ({result.documentA.filename})</span>
                  <span>Version B ({result.documentB.filename})</span>
                  <span>Impact &amp; Delta</span>
                </div>

                {result.report.financialMatrix.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr",
                      padding: "16px 20px",
                      borderBottom: "1px solid var(--cw-border)",
                      fontSize: "14px",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <b>{item.label}</b>
                      <p style={{ margin: "2px 0 0", fontSize: "12px", color: "var(--cw-text-3)" }}>
                        {item.explanation}
                      </p>
                    </div>
                    <span style={{ fontFamily: "var(--font-geist-mono, monospace)" }}>{item.valueA}</span>
                    <span style={{ fontFamily: "var(--font-geist-mono, monospace)", fontWeight: 600 }}>
                      {item.valueB}
                    </span>
                    <div>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          padding: "3px 8px",
                          borderRadius: "6px",
                          background: item.impact === "unfavorable" ? "#FEF2F2" : item.impact === "favorable" ? "#F0FDF4" : "#F3F4F6",
                          color: item.impact === "unfavorable" ? "#DC2626" : item.impact === "favorable" ? "#16A34A" : "#374151",
                        }}
                      >
                        {item.deltaText}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Side-by-Side Clause Diff */}
          {activeTab === "diff" && (
            <div className="stack g18">
              {filteredClauses.length === 0 ? (
                <div className="card card-p tac">
                  <p className="mute">No clauses matched the selected filter.</p>
                </div>
              ) : (
                filteredClauses.map((pair) => {
                  const badge = getDiffBadge(pair.diffType);

                  return (
                    <div
                      key={pair.id}
                      style={{
                        background: "#fff",
                        borderRadius: "16px",
                        border: "1px solid var(--cw-border)",
                        overflow: "hidden",
                        boxShadow: "0 2px 8px -2px rgba(0,0,0,0.04)",
                      }}
                    >
                      {/* Clause Card Header */}
                      <div
                        className="row between wrap g10"
                        style={{
                          padding: "14px 20px",
                          background: "var(--cw-surface-warm)",
                          borderBottom: "1px solid var(--cw-border)",
                          alignItems: "center",
                        }}
                      >
                        <div className="row g10" style={{ alignItems: "center" }}>
                          <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 700 }}>{pair.title}</h4>
                          <span
                            style={{
                              fontSize: "11.5px",
                              fontWeight: 600,
                              padding: "2px 8px",
                              borderRadius: "6px",
                              background: badge.bg,
                              color: badge.color,
                              border: `1px solid ${badge.border}`,
                            }}
                          >
                            {badge.label}
                          </span>
                        </div>

                        <span style={{ fontSize: "12.5px", color: "var(--cw-text-2)" }}>{pair.shiftNote}</span>
                      </div>

                      {/* Side-by-side comparison body */}
                      <div
                        className="grid grid-2"
                        style={{
                          gap: "1px",
                          background: "var(--cw-border)",
                        }}
                      >
                        {/* Left Pane: Version A */}
                        <div style={{ background: "#fff", padding: "18px 20px" }}>
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 700,
                              letterSpacing: "0.05em",
                              textTransform: "uppercase",
                              color: "var(--cw-text-3)",
                              display: "block",
                              marginBottom: "8px",
                            }}
                          >
                            Version A (Original)
                          </span>
                          {pair.clauseA ? (
                            <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.6", color: "var(--cw-text-2)" }}>
                              {pair.clauseA.text}
                            </p>
                          ) : (
                            <i style={{ fontSize: "13px", color: "var(--cw-text-3)" }}>
                              [Clause did not exist in Version A]
                            </i>
                          )}
                        </div>

                        {/* Right Pane: Version B with Highlights */}
                        <div style={{ background: "#FFFBF8", padding: "18px 20px" }}>
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 700,
                              letterSpacing: "0.05em",
                              textTransform: "uppercase",
                              color: "var(--cw-accent-deep)",
                              display: "block",
                              marginBottom: "8px",
                            }}
                          >
                            Version B (Revised Draft)
                          </span>
                          {pair.clauseB ? (
                            <div style={{ fontSize: "13.5px", lineHeight: "1.6", color: "var(--cw-text-1)" }}>
                              {pair.wordDiff.map((token, idx) => {
                                if (token.type === "add") {
                                  return (
                                    <span
                                      key={idx}
                                      style={{
                                        background: "#DCFCE7",
                                        color: "#166534",
                                        fontWeight: 600,
                                        padding: "1px 3px",
                                        borderRadius: "3px",
                                        marginRight: "2px",
                                      }}
                                    >
                                      {token.text}{" "}
                                    </span>
                                  );
                                }
                                if (token.type === "del") {
                                  return (
                                    <span
                                      key={idx}
                                      style={{
                                        background: "#FEE2E2",
                                        color: "#991B1B",
                                        textDecoration: "line-through",
                                        padding: "1px 3px",
                                        borderRadius: "3px",
                                        marginRight: "2px",
                                        opacity: 0.7,
                                      }}
                                    >
                                      {token.text}{" "}
                                    </span>
                                  );
                                }
                                return <span key={idx}>{token.text} </span>;
                              })}
                            </div>
                          ) : (
                            <i style={{ fontSize: "13px", color: "#DC2626" }}>
                              [Deleted in Version B]
                            </i>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
