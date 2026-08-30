"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icon-sprite";
import {
  GLOSSARY_CATEGORIES,
  GLOSSARY_TERMS,
  type GlossaryTerm,
} from "@/lib/glossary-data";

export function GlossaryView() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedRisk, setSelectedRisk] = useState<string>("all");
  const [expandedTermIds, setExpandedTermIds] = useState<Set<string>>(new Set());
  const [copiedTermId, setCopiedTermId] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    const q = search.trim().toLowerCase();
    return GLOSSARY_TERMS.filter((term) => {
      // Category filter
      if (selectedCategory !== "all" && term.category !== selectedCategory) {
        return false;
      }
      // Risk filter
      if (selectedRisk !== "all" && term.riskLevel !== selectedRisk) {
        return false;
      }
      // Search query
      if (!q) return true;
      return (
        term.term.toLowerCase().includes(q) ||
        term.summary.toLowerCase().includes(q) ||
        term.explanation.toLowerCase().includes(q) ||
        term.governingAct?.toLowerCase().includes(q) ||
        term.sampleClause.toLowerCase().includes(q) ||
        term.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [search, selectedCategory, selectedRisk]);

  const toggleExpand = (id: string) => {
    setExpandedTermIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedTermIds(new Set(filteredTerms.map((t) => t.id)));
  };

  const collapseAll = () => {
    setExpandedTermIds(new Set());
  };

  const copyClause = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTermId(id);
    setTimeout(() => setCopiedTermId(null), 2000);
  };

  const getRiskBadge = (level: GlossaryTerm["riskLevel"]) => {
    switch (level) {
      case "critical":
        return {
          label: "🔴 High Risk / Unfair Clause",
          color: "#DC2626",
          bg: "#FEF2F2",
          border: "#FECACA",
        };
      case "caution":
        return {
          label: "🟡 Needs Caution",
          color: "#D97706",
          bg: "#FFFBEB",
          border: "#FDE68A",
        };
      case "safe":
        return {
          label: "🟢 Standard / Protective",
          color: "#16A34A",
          bg: "#F0FDF4",
          border: "#BBF7D0",
        };
    }
  };

  return (
    <div className="container" style={{ paddingBottom: "96px" }}>
      {/* Header */}
      <div className="stack center tac g16" style={{ maxWidth: 820, margin: "0 auto 40px" }}>
        <div className="eyebrow" style={{ marginTop: "24px" }}>
          Legal Dictionary · Indian Contract Plain-Language Decoder
        </div>
        <h1 className="display balance" style={{ fontSize: "2.85rem", lineHeight: 1.15 }}>
          Common contract terms,{" "}
          <span className="accent" style={{ color: "var(--cw-accent-deep)" }}>
            decoded in plain words.
          </span>
        </h1>
        <p className="lead balance" style={{ maxWidth: "62ch", color: "var(--cw-text-2)" }}>
          Clear, jargon-free explanations of clauses commonly found in Indian rental agreements, loan sanction letters, employment contracts, and commercial agreements — grounded in Indian statutes and RBI norms.
        </p>

        {/* Search Bar */}
        <div
          style={{
            width: "100%",
            maxWidth: "640px",
            position: "relative",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "#fff",
              border: "1.5px solid var(--cw-border)",
              borderRadius: "14px",
              padding: "12px 18px",
              boxShadow: "0 4px 18px -4px rgba(0,0,0,0.06)",
              transition: "border-color 0.2s ease",
            }}
          >
            <Icon name="search" style={{ width: "20px", height: "20px", color: "var(--cw-text-3)", flex: "none" }} />
            <input
              type="text"
              placeholder="Search 600+ legal terms, Indian Acts, or keywords (e.g. lock-in, non-compete, Section 27, deposit, FOIR, indemnity)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                fontSize: "15.5px",
                color: "var(--cw-text-1)",
                background: "transparent",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "var(--cw-text-3)",
                  display: "flex",
                  alignItems: "center",
                  padding: "4px",
                }}
                aria-label="Clear search"
              >
                <Icon name="close" style={{ width: "16px", height: "16px" }} />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          className="row center wrap g8"
          style={{ marginTop: "14px" }}
        >
          {GLOSSARY_CATEGORIES.map((cat) => {
            const count =
              cat.id === "all"
                ? GLOSSARY_TERMS.length
                : GLOSSARY_TERMS.filter((t) => t.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="chip"
                style={{
                  padding: "7px 16px",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  borderRadius: "999px",
                  border: "1px solid",
                  borderColor: isSelected ? "var(--cw-accent)" : "var(--cw-border)",
                  background: isSelected ? "var(--cw-accent-surface)" : "#fff",
                  color: isSelected ? "var(--cw-accent-deep)" : "var(--cw-text-2)",
                  transition: "all 0.15s ease",
                }}
              >
                {cat.label} <span style={{ opacity: 0.75, fontSize: "11px", marginLeft: "4px" }}>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Risk Level Filter */}
        <div className="row center g16 wrap" style={{ marginTop: "6px", fontSize: "12.5px" }}>
          <span style={{ color: "var(--cw-text-3)", fontWeight: 500 }}>Filter by risk:</span>
          {[
            { id: "all", label: "All Risk Levels" },
            { id: "critical", label: "🔴 High Risk" },
            { id: "caution", label: "🟡 Caution" },
            { id: "safe", label: "🟢 Standard" },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRisk(r.id)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "2px 6px",
                fontSize: "12.5px",
                fontWeight: selectedRisk === r.id ? 600 : 400,
                color: selectedRisk === r.id ? "var(--cw-accent-deep)" : "var(--cw-text-3)",
                textDecoration: selectedRisk === r.id ? "underline" : "none",
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Controls Bar */}
      <div
        className="row between wrap g10"
        style={{
          maxWidth: 920,
          margin: "0 auto 16px",
          padding: "0 4px",
          borderBottom: "1px solid var(--cw-border)",
          paddingBottom: "12px",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--cw-text-2)" }}>
          Showing {filteredTerms.length} of {GLOSSARY_TERMS.length} terms
        </span>

        <div className="row g12" style={{ alignItems: "center" }}>
          <button
            onClick={expandAll}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "12.5px",
              color: "var(--cw-accent-deep)",
              fontWeight: 500,
            }}
          >
            Expand All
          </button>
          <span style={{ color: "var(--cw-border)" }}>|</span>
          <button
            onClick={collapseAll}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "12.5px",
              color: "var(--cw-text-3)",
              fontWeight: 500,
            }}
          >
            Collapse All
          </button>
          {(search || selectedCategory !== "all" || selectedRisk !== "all") && (
            <>
              <span style={{ color: "var(--cw-border)" }}>|</span>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                  setSelectedRisk("all");
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "12.5px",
                  color: "var(--cw-accent-deep)",
                  fontWeight: 500,
                }}
              >
                Reset filters
              </button>
            </>
          )}
        </div>
      </div>

      {/* Terms List */}
      <div className="stack g16" style={{ maxWidth: 920, margin: "0 auto" }}>
        {filteredTerms.length === 0 ? (
          <div
            className="stack center tac g12"
            style={{
              padding: "56px 24px",
              background: "var(--cw-surface-warm)",
              borderRadius: "16px",
              border: "1px dashed var(--cw-border)",
            }}
          >
            <Icon name="search" style={{ width: "36px", height: "36px", color: "var(--cw-text-3)" }} />
            <h3 className="h3" style={{ color: "var(--cw-text-2)" }}>
              No matching terms found
            </h3>
            <p className="small" style={{ color: "var(--cw-text-3)", maxWidth: "45ch" }}>
              Try searching for different keywords, such as &quot;deposit&quot;, &quot;penalty&quot;, &quot;notice&quot;, &quot;FOIR&quot;, or &quot;Act&quot;.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
                setSelectedRisk("all");
              }}
              className="btn btn-secondary mt8"
            >
              View all legal terms
            </button>
          </div>
        ) : (
          filteredTerms.map((term) => {
            const isExpanded = expandedTermIds.has(term.id);
            const risk = getRiskBadge(term.riskLevel);

            return (
              <div
                key={term.id}
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  border: isExpanded ? "1px solid var(--cw-accent-border)" : "1px solid var(--cw-border)",
                  boxShadow: isExpanded
                    ? "0 6px 20px -4px rgba(249,115,22,0.08)"
                    : "0 2px 8px -2px rgba(0,0,0,0.04)",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                }}
              >
                {/* Main Card Summary Header */}
                <div
                  onClick={() => toggleExpand(term.id)}
                  style={{
                    padding: "20px 24px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div className="row between wrap g8" style={{ alignItems: "center" }}>
                    <div className="row g10" style={{ alignItems: "center" }}>
                      <h3
                        className="h4"
                        style={{
                          margin: 0,
                          fontWeight: 600,
                          fontSize: "1.2rem",
                          color: "var(--cw-text-1)",
                        }}
                      >
                        {term.term}
                      </h3>
                      <span
                        className="ui-chip"
                        style={{
                          fontSize: "11px",
                          padding: "3px 9px",
                          borderRadius: "6px",
                          background: "var(--cw-surface-warm)",
                          border: "1px solid var(--cw-border)",
                          color: "var(--cw-text-2)",
                          fontWeight: 500,
                        }}
                      >
                        {term.categoryLabel}
                      </span>
                    </div>

                    <div className="row g8" style={{ alignItems: "center" }}>
                      <span
                        style={{
                          fontSize: "11.5px",
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: "6px",
                          background: risk.bg,
                          color: risk.color,
                          border: `1px solid ${risk.border}`,
                        }}
                      >
                        {risk.label}
                      </span>
                      <span
                        style={{
                          display: "grid",
                          placeItems: "center",
                          width: "24px",
                          height: "24px",
                          borderRadius: "6px",
                          background: isExpanded ? "var(--cw-accent-surface)" : "transparent",
                          color: isExpanded ? "var(--cw-accent-deep)" : "var(--cw-text-3)",
                        }}
                      >
                        <Icon
                          name="chev"
                          style={{
                            width: "16px",
                            height: "16px",
                            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s ease",
                          }}
                        />
                      </span>
                    </div>
                  </div>

                  <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.55", color: "var(--cw-text-2)" }}>
                    {term.summary}
                  </p>
                </div>

                {/* Expanded Detailed Breakdown */}
                {isExpanded && (
                  <div
                    style={{
                      padding: "0 24px 24px",
                      borderTop: "1px solid var(--cw-border)",
                      background: "#FAFAFA",
                    }}
                  >
                    <div className="stack g18" style={{ marginTop: "20px" }}>
                      {/* Plain Language Explanation */}
                      <div>
                        <h5
                          style={{
                            fontSize: "11.5px",
                            fontWeight: 700,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: "var(--cw-text-3)",
                            marginBottom: "6px",
                          }}
                        >
                          How this affects you in practice
                        </h5>
                        <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", color: "var(--cw-text-1)" }}>
                          {term.explanation}
                        </p>
                      </div>

                      {/* What to look for in your agreement */}
                      <div
                        style={{
                          padding: "14px 18px",
                          borderRadius: "10px",
                          background: risk.bg,
                          border: `1px solid ${risk.border}`,
                        }}
                      >
                        <div className="row g10" style={{ alignItems: "flex-start" }}>
                          <Icon name="risk" style={{ width: "16px", height: "16px", color: risk.color, marginTop: "2px", flex: "none" }} />
                          <div>
                            <b style={{ fontSize: "13px", color: risk.color }}>What to check in your contract:</b>
                            <p style={{ margin: "4px 0 0", fontSize: "13.5px", lineHeight: "1.55", color: "var(--cw-text-1)" }}>
                              {term.riskNote}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Sample Contract Clause */}
                      <div>
                        <div className="row between" style={{ marginBottom: "6px", alignItems: "center" }}>
                          <h5
                            style={{
                              fontSize: "11.5px",
                              fontWeight: 700,
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                              color: "var(--cw-text-3)",
                              margin: 0,
                            }}
                          >
                            Example clause language in contracts
                          </h5>
                          <button
                            onClick={() => copyClause(term.id, term.sampleClause)}
                            style={{
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "11.5px",
                              color: copiedTermId === term.id ? "var(--cw-accent-deep)" : "var(--cw-text-3)",
                              fontWeight: 600,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            {copiedTermId === term.id ? "✓ Copied" : "Copy Clause"}
                          </button>
                        </div>
                        <pre
                          style={{
                            background: "#fff",
                            border: "1px solid var(--cw-border)",
                            borderRadius: "8px",
                            padding: "12px 14px",
                            fontSize: "12.5px",
                            lineHeight: "1.5",
                            color: "var(--cw-text-1)",
                            whiteSpace: "pre-wrap",
                            fontFamily: "var(--font-geist-mono, monospace)",
                            margin: 0,
                          }}
                        >
                          {term.sampleClause}
                        </pre>
                      </div>

                      {/* Indian Act & Statute Grounding */}
                      {term.governingAct && (
                        <div
                          className="row between wrap g10"
                          style={{
                            alignItems: "center",
                            paddingTop: "6px",
                            borderTop: "1px solid var(--cw-border)",
                          }}
                        >
                          <div className="row g8" style={{ alignItems: "center" }}>
                            <Icon name="book" style={{ width: "15px", height: "15px", color: "var(--cw-accent-deep)" }} />
                            <span style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--cw-text-1)" }}>
                              {term.governingAct}
                            </span>
                            {term.actNote && (
                              <span style={{ fontSize: "12px", color: "var(--cw-text-3)" }}>
                                — {term.actNote}
                              </span>
                            )}
                          </div>

                          <a
                            href="/dashboard"
                            className="link-accent"
                            style={{ fontSize: "12.5px", fontWeight: 500 }}
                          >
                            Scan my contract for this clause →
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom CTA */}
      <div
        className="stack center tac g16 mt48"
        style={{
          maxWidth: 720,
          margin: "56px auto 0",
          padding: "40px 24px",
          background: "var(--cw-surface-warm)",
          borderRadius: "18px",
          border: "1px solid var(--cw-border)",
        }}
      >
        <h3 className="h3" style={{ color: "var(--cw-text-1)", fontSize: "1.75rem" }}>
          Have an agreement you want to check?
        </h3>
        <p className="lead" style={{ fontSize: "15.5px", color: "var(--cw-text-2)", maxWidth: "52ch" }}>
          ClauseWise identifies these terms automatically, redacts your personal details, scores every clause for risk, and explains your legal rights.
        </p>
        <a className="btn btn-primary btn-lg mt8" href="/dashboard">
          <Icon name="upload" />
          Upload &amp; Analyze a Document
        </a>
      </div>
    </div>
  );
}
