"use client";
import { useState } from "react";
import { Icon, type IconName } from "@/components/icon-sprite";

type Persona = {
  key: string; label: string; icon: IconName; blurb: string; points: string[];
};

const PERSONAS: Persona[] = [
  { key: "tenant", label: "Tenants", icon: "home",
    blurb: "ClauseWise helps tenants understand deposits, notice periods and lock-in terms before handing over money — and shows exactly what the landlord can and cannot deduct.",
    points: ["Know what your deposit really covers", "Spot uncapped rent increases",
             "Understand notice and lock-in periods", "See who pays for which repairs"] },
  { key: "student", label: "Students", icon: "book",
    blurb: "Students use ClauseWise for hostel agreements, education loan terms and scheme circulars — to check eligibility and repayment conditions before committing.",
    points: ["Check whether a scheme applies to you", "Understand moratorium and repayment",
             "Read hostel rules without the jargon", "Get explanations in your own language"] },
  { key: "borrower", label: "Borrowers", icon: "loan",
    blurb: "First-time borrowers use ClauseWise to see the real cost of a loan — the interest basis, the penalties, and what happens if a payment is missed.",
    points: ["Find prepayment and foreclosure charges", "See what a missed EMI actually triggers",
             "See which Acts govern the loan", "Understand floating vs fixed rates"] },
  { key: "employee", label: "Employees", icon: "work",
    blurb: "New employees use ClauseWise on offer letters and employment agreements — notice periods, bonds and non-compete clauses, explained before day one.",
    points: ["Understand notice periods and buyouts", "Spot training bonds and their cost",
             "Read non-compete terms in plain words", "Check what your CTC actually includes"] },
];

export function PersonaTabs() {
  const [active, setActive] = useState("tenant");
  const current = PERSONAS.find((p) => p.key === active)!;

  return (
    <div className="persona mt40">
      <div className="persona-tabs" role="tablist" aria-label="Who ClauseWise is for">
        {PERSONAS.map((p) => (
          <button
            key={p.key}
            role="tab"
            id={`tab-${p.key}`}
            aria-selected={p.key === active}
            aria-controls={`panel-${p.key}`}
            className={`persona-tab${p.key === active ? " active" : ""}`}
            onClick={() => setActive(p.key)}
          >
            <span className="persona-face"><Icon name={p.icon} /></span>
            {p.label}
          </button>
        ))}
      </div>

      <div
        className="persona-body"
        role="tabpanel"
        id={`panel-${current.key}`}
        aria-labelledby={`tab-${current.key}`}
      >
        <p className="lead" style={{ maxWidth: "72ch" }}>{current.blurb}</p>
        <h4 className="h4 mt24">What {current.label.toLowerCase()} get</h4>
        <div className="grid grid-2 mt16" style={{ gap: "14px 32px" }}>
          {current.points.map((pt) => (
            <div className="check-item" key={pt}>
              <span className="check-dot"><Icon name="check" /></span>
              {pt}
            </div>
          ))}
        </div>
        <div className="row g10 mt24 wrap">
          <a className="btn btn-primary" href="/dashboard">Upload a Document</a>
          <a className="btn btn-secondary" href="#privacy">How your data is handled</a>
        </div>
      </div>
    </div>
  );
}
