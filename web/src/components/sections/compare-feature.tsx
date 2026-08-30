"use client";

import Link from "next/link";
import { Icon } from "@/components/icon-sprite";

export function CompareFeature() {
  return (
    <section
      className="section"
      id="compare"
      style={{
        background: "var(--cw-surface-warm)",
        borderTop: "1px solid var(--cw-border)",
        borderBottom: "1px solid var(--cw-border)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="stack center tac g16" style={{ maxWidth: 740, margin: "0 auto 48px" }}>
          <div className="eyebrow">Document Diff · Version Comparison</div>
          <h2 className="h2 balance">
            Spot sneaky changes in renewals
            <br />
            &amp; revised agreements
          </h2>
          <p className="lead balance" style={{ maxWidth: "58ch" }}>
            Landlords and lenders often slide in higher late-fee penalties, reduced notice periods, or
            unfair repair burdens during lease renewals. ClauseWise detects every altered word, shifted amount, and deleted tenant protection.
          </p>
        </div>

        {/* Visual Comparison Showcase Card */}
        <div
          style={{
            maxWidth: "1020px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "24px",
            border: "1px solid var(--cw-border)",
            boxShadow: "0 14px 40px -12px rgba(23,23,23,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Top Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 28px",
              background: "var(--cw-surface-warm)",
              borderBottom: "1px solid var(--cw-border)",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  fontWeight: 600,
                  padding: "4px 10px",
                  borderRadius: "20px",
                  background: "#FEF2F2",
                  color: "#DC2626",
                  border: "1px solid #FECACA",
                }}
              >
                🔴 2 Critical Shifts Detected
              </span>
              <span style={{ fontSize: "14px", color: "var(--cw-text-2)", fontWeight: 500 }}>
                Draft 1 (Original) vs Draft 2 (Landlord Revision)
              </span>
            </div>

            <Link
              href="/compare"
              className="btn btn-sm btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 18px",
                borderRadius: "10px",
                fontSize: "13.5px",
                fontWeight: 600,
              }}
            >
              Open Full Compare Tool <Icon name="chev" style={{ width: "14px", height: "14px" }} />
            </Link>
          </div>

          {/* Diff Grid Showcase */}
          <div className="grid grid-3" style={{ gap: "1px", background: "var(--cw-border)" }}>
            {/* Diff Card 1: Rent & Late Fee */}
            <div style={{ background: "#fff", padding: "28px" }}>
              <div
                style={{
                  display: "inline-flex",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  background: "#FFFBEB",
                  color: "#D97706",
                  border: "1px solid #FDE68A",
                  marginBottom: "12px",
                }}
              >
                ✏️ Modified Amount
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--cw-text-1)", marginBottom: "8px" }}>
                Clause 3: Rent &amp; Penal Rate
              </h4>
              <p style={{ fontSize: "13px", color: "var(--cw-text-2)", lineHeight: 1.5, marginBottom: "16px" }}>
                Rent increased from <strong style={{ color: "#16A34A" }}>₹25,000</strong> to <strong style={{ color: "#DC2626" }}>₹29,000 + ₹3,500 maint.</strong> plus added 18% compounding penalty.
              </p>
              <div
                style={{
                  fontSize: "12px",
                  padding: "10px 12px",
                  background: "var(--cw-surface-warm)",
                  borderRadius: "8px",
                  borderLeft: "3px solid #DC2626",
                  color: "var(--cw-text-1)",
                }}
              >
                <span style={{ textDecoration: "line-through", color: "#DC2626" }}>Rs. 25,000/- inclusive</span>{" "}
                <span style={{ fontWeight: 600, color: "#16A34A" }}>→ Rs. 29,000/- + 18% penal rate</span>
              </div>
            </div>

            {/* Diff Card 2: Deposit Forfeiture */}
            <div style={{ background: "#fff", padding: "28px" }}>
              <div
                style={{
                  display: "inline-flex",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  background: "#FEF2F2",
                  color: "#DC2626",
                  border: "1px solid #FECACA",
                  marginBottom: "12px",
                }}
              >
                + High Risk Added
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--cw-text-1)", marginBottom: "8px" }}>
                Clause 2: Lock-in &amp; Forfeiture
              </h4>
              <p style={{ fontSize: "13px", color: "var(--cw-text-2)", lineHeight: 1.5, marginBottom: "16px" }}>
                Lock-in extended from 3 to 6 months with newly slipped-in <strong style={{ color: "#DC2626" }}>100% deposit forfeiture</strong> if vacating early.
              </p>
              <div
                style={{
                  fontSize: "12px",
                  padding: "10px 12px",
                  background: "#FEF2F2",
                  borderRadius: "8px",
                  borderLeft: "3px solid #DC2626",
                  color: "#991B1B",
                }}
              >
                <strong>+ Added:</strong> If Tenant vacates early, entire security deposit shall be forfeited.
              </div>
            </div>

            {/* Diff Card 3: Repairs Shift */}
            <div style={{ background: "#fff", padding: "28px" }}>
              <div
                style={{
                  display: "inline-flex",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  background: "#F3F4F6",
                  color: "#4B5563",
                  border: "1px solid #E5E7EB",
                  marginBottom: "12px",
                }}
              >
                - Protection Removed
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--cw-text-1)", marginBottom: "8px" }}>
                Clause 6: Structural Repairs
              </h4>
              <p style={{ fontSize: "13px", color: "var(--cw-text-2)", lineHeight: 1.5, marginBottom: "16px" }}>
                Landlord duty to fix roof leakage and plumbing was deleted, shifting all structural repair liabilities onto the tenant.
              </p>
              <div
                style={{
                  fontSize: "12px",
                  padding: "10px 12px",
                  background: "#FFFBEB",
                  borderRadius: "8px",
                  borderLeft: "3px solid #D97706",
                  color: "#92400E",
                }}
              >
                <strong>Shift:</strong> Tenant solely responsible for all seepage &amp; structural repairs.
              </div>
            </div>
          </div>

          {/* Bottom Bar Action */}
          <div
            style={{
              padding: "20px 28px",
              background: "#fff",
              borderTop: "1px solid var(--cw-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "14px",
            }}
          >
            <span style={{ fontSize: "13.5px", color: "var(--cw-text-2)" }}>
              Works with <strong>PDF</strong>, <strong>DOCX</strong>, and <strong>TXT</strong>. In-memory Myers diff algorithm with zero cloud data leaks.
            </span>
            <Link
              href="/compare"
              className="btn btn-outline"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                padding: "8px 16px",
                borderRadius: "10px",
              }}
            >
              Compare Your Documents Now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
