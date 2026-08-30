"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon-sprite";

interface SampleTerm {
  id: string;
  term: string;
  category: string;
  categoryLabel: string;
  risk: "safe" | "caution" | "critical";
  summary: string;
  act: string;
  badge: string;
}

const SAMPLE_TERMS: SampleTerm[] = [
  {
    id: "lock-in-period",
    term: "Lock-in Period",
    category: "rental",
    categoryLabel: "Rental & Property",
    risk: "caution",
    summary: "A fixed initial period during which vacating early attracts deposit forfeiture or remaining months' rent.",
    act: "Indian Contract Act, 1872 (Section 74)",
    badge: "🟡 Needs Caution",
  },
  {
    id: "service-bond-liquidated-damages",
    term: "Employment Service Bond",
    category: "employment",
    categoryLabel: "Employment",
    risk: "critical",
    summary: "Forces employee to pay a penalty (e.g. ₹2 Lakhs) if resigning before 1-3 years. Enforceable ONLY for actual training expenses.",
    act: "Indian Contract Act, 1872 (Section 27 & 74)",
    badge: "🔴 High Exit Risk",
  },
  {
    id: "penal-interest-compounding",
    term: "Compounding Penal Interest",
    category: "loan",
    categoryLabel: "Loans & Banking",
    risk: "critical",
    summary: "Charging interest upon interest for missed EMI dates. Banned by RBI circulars; lenders must charge flat penal charges only.",
    act: "RBI Fair Lending Guidelines (2023)",
    badge: "🔴 RBI Non-Compliant",
  },
  {
    id: "non-compete-clause",
    term: "Post-Employment Non-Compete",
    category: "employment",
    categoryLabel: "Employment",
    risk: "safe",
    summary: "Barring employee from joining a competitor after resigning. Completely VOID and unenforceable in India under Section 27.",
    act: "Indian Contract Act, 1872 (Section 27)",
    badge: "🟢 Legally Void in India",
  },
  {
    id: "quiet-enjoyment",
    term: "Covenant of Quiet Enjoyment",
    category: "rental",
    categoryLabel: "Rental & Property",
    risk: "safe",
    summary: "Tenant's legal right to peaceful possession without surprise landlord visits, intrusive inspections, or utility shutoffs.",
    act: "Transfer of Property Act, 1882 (Section 108(c))",
    badge: "🟢 Tenant Protection",
  },
  {
    id: "foreclosure-prepayment-penalty",
    term: "Foreclosure & Prepayment Penalty",
    category: "loan",
    categoryLabel: "Loans & Banking",
    risk: "safe",
    summary: "Charges levied for early loan payoff. RBI strictly prohibits prepayment penalties on individual floating-rate home/personal loans.",
    act: "RBI Master Direction on Lending",
    badge: "🟢 RBI Regulated",
  },
  {
    id: "indemnity-clause",
    term: "Broad Indemnity Clause",
    category: "contract",
    categoryLabel: "General Contract",
    risk: "critical",
    summary: "Obligation to compensate the other party for any loss, legal fees, or third-party liabilities arising from contract use.",
    act: "Indian Contract Act, 1872 (Section 124)",
    badge: "🔴 High Liability",
  },
  {
    id: "dpdp-act-consent",
    term: "DPDP Act Digital Data Consent",
    category: "contract",
    categoryLabel: "General Contract",
    risk: "safe",
    summary: "Explicit, unambiguous consent required for processing citizen data. Gives rights to access, correct, and erase personal data.",
    act: "Digital Personal Data Protection Act, 2023",
    badge: "🟢 Statutory Citizen Right",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Topics" },
  { id: "rental", label: "Rental & Property" },
  { id: "loan", label: "Loans & Banking" },
  { id: "employment", label: "Employment & HR" },
  { id: "contract", label: "General Contracts" },
];

export function GlossaryFeature() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = SAMPLE_TERMS.filter((t) => {
    if (selectedCat !== "all" && t.category !== selectedCat) return false;
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      t.term.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q) ||
      t.act.toLowerCase().includes(q)
    );
  });

  return (
    <section className="section" id="glossary" style={{ background: "var(--cw-bg)" }}>
      <div className="container">
        {/* Header */}
        <div className="stack center tac g16" style={{ maxWidth: 740, margin: "0 auto 40px" }}>
          <div className="eyebrow">610+ Indian Legal Jargons · Plain-Language Decoder</div>
          <h2 className="h2 balance">
            Decode confusing contract terms
            <br />
            before you put your pen to paper
          </h2>
          <p className="lead balance" style={{ maxWidth: "58ch" }}>
            From lock-in penalties and Section 27 non-competes to SARFAESI repossession and FOIR limits — understand every legal obligation with zero jargon, grounded in Indian Acts.
          </p>

          {/* Quick Search Bar */}
          <div
            style={{
              width: "100%",
              maxWidth: "540px",
              marginTop: "8px",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "#fff",
                border: "1.5px solid var(--cw-border)",
                borderRadius: "14px",
                padding: "10px 16px",
                boxShadow: "0 4px 16px -4px rgba(0,0,0,0.05)",
              }}
            >
              <Icon name="search" style={{ width: "18px", height: "18px", color: "var(--cw-text-3)" }} />
              <input
                type="text"
                placeholder="Search lock-in, bond, FOIR, deposit, non-compete..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: "14.5px",
                  color: "var(--cw-text)",
                  background: "transparent",
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "12px",
                    color: "var(--cw-text-3)",
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "center",
              marginTop: "12px",
            }}
          >
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "1px solid",
                  borderColor: selectedCat === c.id ? "var(--cw-accent)" : "var(--cw-border)",
                  background: selectedCat === c.id ? "var(--cw-accent-surface)" : "#fff",
                  color: selectedCat === c.id ? "var(--cw-accent-deep)" : "var(--cw-text-2)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Term Cards Grid */}
        <div className="grid grid-4" style={{ gap: "18px", marginBottom: "40px" }}>
          {filtered.slice(0, 8).map((t) => (
            <div
              key={t.id}
              className="card"
              style={{
                background: "#fff",
                border: "1px solid var(--cw-border)",
                borderRadius: "16px",
                padding: "22px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "14px",
                boxShadow: "0 4px 14px -3px rgba(0,0,0,0.04)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--cw-text-3)" }}>
                    {t.categoryLabel}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: "6px",
                      background: t.risk === "critical" ? "#FEF2F2" : t.risk === "caution" ? "#FFFBEB" : "#F0FDF4",
                      color: t.risk === "critical" ? "#DC2626" : t.risk === "caution" ? "#D97706" : "#16A34A",
                      border: `1px solid ${t.risk === "critical" ? "#FECACA" : t.risk === "caution" ? "#FDE68A" : "#BBF7D0"}`,
                    }}
                  >
                    {t.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--cw-text)", marginBottom: "8px" }}>
                  {t.term}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--cw-text-2)", lineHeight: 1.5 }}>
                  {t.summary}
                </p>
              </div>

              <div
                style={{
                  paddingTop: "12px",
                  borderTop: "1px solid var(--cw-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: "11px", color: "var(--cw-text-3)", fontWeight: 500, maxWidth: "160px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  ⚖️ {t.act}
                </span>
                <Link
                  href={`/glossary#${t.id}`}
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--cw-accent-deep)",
                    textDecoration: "none",
                  }}
                >
                  Read clause →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All CTA Banner */}
        <div
          style={{
            maxWidth: "880px",
            margin: "0 auto",
            background: "var(--cw-surface-warm)",
            border: "1px solid var(--cw-border)",
            borderRadius: "18px",
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <h4 style={{ fontSize: "16.5px", fontWeight: 700, color: "var(--cw-text)", marginBottom: "4px" }}>
              Looking for a specific legal statute or banking term?
            </h4>
            <p style={{ fontSize: "13.5px", color: "var(--cw-text-2)" }}>
              Access our complete library of <strong>610+ verified terms</strong> across Indian rental, banking, labour, and commercial laws.
            </p>
          </div>

          <Link
            href="/glossary"
            className="btn btn-primary"
            style={{
              padding: "10px 22px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Explore All 610+ Jargons <Icon name="chev" style={{ width: "14px", height: "14px" }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
