"use client";

import { useState } from "react";
import { LogoIcon, type LogoVariant } from "@/components/logo";

const LOGO_OPTIONS: { id: LogoVariant; name: string; tag: string; description: string }[] = [
  {
    id: "monolith",
    name: "The Legal Monolith",
    tag: "Modern & Sharp (Recommended)",
    description: "Minimalist dual-tone architectural C & G monogram with gradient glass sheen.",
  },
  {
    id: "ribbon",
    name: "Geometric Ribbon",
    tag: "Fluid & Dynamic",
    description: "Intertwined dual-ribbon arcs weaving slate-charcoal into luminous warm amber.",
  },
  {
    id: "shield",
    name: "Legal Shield & Crest",
    tag: "Authority & Protection",
    description: "Midnight slate security shield with embossed ivory & gold C-G monogram.",
  },
  {
    id: "scales",
    name: "Scales of Balance",
    tag: "Classic Justice Symbol",
    description: "Abstract minimalist balance scales where each pan gracefully forms C and G.",
  },
  {
    id: "section",
    name: "Section Mark (§)",
    tag: "Statutory & Elegant",
    description: "Flowing legal section symbol (§) crafted from modern intertwined loops.",
  },
];

export function LogoShowcase() {
  const [activeVariant, setActiveVariant] = useState<LogoVariant>("monolith");

  return (
    <section className="section" style={{ background: "var(--cw-surface-warm)", borderTop: "1px solid var(--cw-border)" }}>
      <div className="container">
        <div className="stack center tac g12" style={{ maxWidth: 700, margin: "0 auto 36px" }}>
          <div className="eyebrow">Brand Identity Explorer</div>
          <h2 className="h2 balance">Pick your favorite Logo Design</h2>
          <p className="lead balance" style={{ fontSize: "15.5px", color: "var(--cw-text-2)" }}>
            Click any logo variant below to inspect the design, geometry, and styling across the website.
          </p>
        </div>

        <div className="grid grid-3" style={{ gap: "20px", maxWidth: "1020px", margin: "0 auto" }}>
          {LOGO_OPTIONS.map((opt) => {
            const isSelected = activeVariant === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => setActiveVariant(opt.id)}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "24px",
                  cursor: "pointer",
                  border: isSelected ? "2px solid var(--cw-accent)" : "1px solid var(--cw-border)",
                  boxShadow: isSelected
                    ? "0 10px 28px -6px rgba(249,115,22,0.22)"
                    : "0 2px 10px -2px rgba(0,0,0,0.04)",
                  transition: "all 0.2s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {isSelected && (
                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#fff",
                      background: "var(--cw-accent-deep)",
                      padding: "2px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    Active in Header
                  </span>
                )}

                {/* Logo Display Box */}
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "18px",
                    background: opt.id === "shield" ? "#0F172A" : "#FFFFFF",
                    border: "1.5px solid var(--cw-border)",
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "0 4px 14px -3px rgba(0,0,0,0.08)",
                  }}
                >
                  <div style={{ width: "52px", height: "52px" }}>
                    <LogoIcon variant={opt.id} />
                  </div>
                </div>

                <div>
                  <h4 className="h4" style={{ margin: "0 0 4px", fontSize: "1.1rem", fontWeight: 700 }}>
                    {opt.name}
                  </h4>
                  <span
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 600,
                      color: "var(--cw-accent-deep)",
                      background: "var(--cw-accent-surface)",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      display: "inline-block",
                      marginBottom: "8px",
                    }}
                  >
                    {opt.tag}
                  </span>
                  <p style={{ fontSize: "13px", lineHeight: "1.45", color: "var(--cw-text-2)", margin: 0 }}>
                    {opt.description}
                  </p>
                </div>

                {/* Live Brand Preview */}
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "12px",
                    borderTop: "1px solid var(--cw-border)",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <div style={{ width: "26px", height: "26px" }}>
                    <LogoIcon variant={opt.id} />
                  </div>
                  <span style={{ fontSize: "17px", fontWeight: 750, letterSpacing: "-0.03em" }}>
                    Clause<span className="accent" style={{ color: "var(--cw-accent)" }}>Wise</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
