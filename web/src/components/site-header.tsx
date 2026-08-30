"use client";

import { useEffect, useState } from "react";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

import { Logo } from "@/components/logo";
import { Icon, type IconName } from "@/components/icon-sprite";
import { LANGUAGES } from "@/lib/i18n/languages";

/**
 * Marketing header, ported from the design system.
 *
 * The design's menus advertised Compare Documents, Risk Alerts and a Glossary.
 * None of those exist in this app, so they are not listed — every entry below
 * leads somewhere real. Auth is Clerk's, not a mock /login route.
 */
const FEATURES: { href: string; icon: IconName; title: string; note: string }[] = [
  {
    href: "/dashboard",
    icon: "ask",
    title: "Ask Anything",
    note: "Answers grounded in your own document, citing the clause they came from",
  },
  {
    href: "/dashboard",
    icon: "risk",
    title: "Clause Risk Scoring",
    note: "Every clause scored and banded, with a plain explanation",
  },
  {
    href: "/dashboard",
    icon: "plain",
    title: "Omission Radar",
    note: "The protective clauses your document leaves out",
  },
  {
    href: "/dashboard",
    icon: "book",
    title: "Statute Grounding",
    note: "The Indian Acts that govern the document, linked to Indian Kanoon",
  },
  {
    href: "/dashboard",
    icon: "loan",
    title: "Affordability (FOIR)",
    note: "Whether you can actually carry what you are about to sign",
  },
  {
    href: "/dashboard",
    icon: "translate",
    title: "Multilingual Support",
    note: "Explanations in the language you think in",
  },
];

const DOCTYPES: { href: string; icon: IconName; title: string; note: string }[] = [
  { href: "/dashboard", icon: "home", title: "Rental Agreements", note: "Deposits, notice periods, lock-in" },
  { href: "/dashboard", icon: "loan", title: "Loan Agreements", note: "Interest, penalties, prepayment" },
  { href: "/dashboard", icon: "work", title: "Employment Agreements", note: "Notice, bond, non-compete" },
  { href: "/dashboard", icon: "tos", title: "Service Agreements", note: "What you actually agreed to" },
  { href: "/dashboard", icon: "govt", title: "Non-disclosure Agreements", note: "What you may and may not say" },
];

function Menu({ items }: { items: typeof FEATURES }) {
  return (
    <div className="nav-menu">
      {items.map((it) => (
        <a className="nav-menu-item" href={it.href} key={it.title}>
          <span className="feat-icon">
            <Icon name={it.icon} />
          </span>
          <span>
            <h5>{it.title}</h5>
            <p>{it.note}</p>
          </span>
        </a>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [sheet, setSheet] = useState(false);

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 20);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sheet ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setSheet(false);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [sheet]);

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="container">
          <div className="nav-shell">
            <Logo size="lg" />
            <nav className="nav-links">
              <div className="nav-item">
                <a className="nav-link" href="#features">
                  Features <Icon name="chev" className="nav-caret" />
                </a>
                <Menu items={FEATURES} />
              </div>
              <a className="nav-link" href="#how">
                How it Works
              </a>
              <div className="nav-item">
                <a className="nav-link" href="#documents">
                  Document Types <Icon name="chev" className="nav-caret" />
                </a>
                <Menu items={DOCTYPES} />
              </div>
              <a className="nav-link" href="/compare">
                Compare
              </a>
              <a className="nav-link" href="/glossary">
                Glossary
              </a>
              <a className="nav-link" href="#privacy">
                Privacy
              </a>
            </nav>
            <div className="nav-actions">
              <button
                className="btn btn-ghost btn-icon nav-toggle"
                aria-label="Open menu"
                aria-expanded={sheet}
                onClick={() => setSheet(true)}
              >
                <Icon name="menu" />
              </button>

              {/* Clerk owns the session. The gate is presentational only — every
                  API route re-checks the session server-side. */}
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="btn btn-ghost nav-login">Login</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="btn btn-primary">
                    <span className="cta-long">Try for Free</span>
                    <span className="cta-short">Try Free</span>
                  </button>
                </SignUpButton>
              </Show>

              <Show when="signed-in">
                <a className="btn btn-primary" href="/dashboard">
                  <span className="cta-long">Open dashboard</span>
                  <span className="cta-short">Dashboard</span>
                </a>
                <UserButton />
              </Show>
            </div>
          </div>
        </div>
      </header>

      <div className={`nav-sheet${sheet ? " open" : ""}`}>
        <div className="nav-sheet-head">
          <Logo />
          <button
            className="btn btn-ghost btn-icon"
            aria-label="Close menu"
            onClick={() => setSheet(false)}
          >
            <Icon name="close" />
          </button>
        </div>

        <div className="sheet-group">
          <h4>What it does</h4>
          {FEATURES.slice(0, 5).map((f) => (
            <a className="sheet-link" href={f.href} key={f.title} onClick={() => setSheet(false)}>
              <Icon name={f.icon} /> {f.title}
            </a>
          ))}
        </div>

        <div className="sheet-group">
          <h4>Document types</h4>
          {DOCTYPES.map((d) => (
            <a className="sheet-link" href={d.href} key={d.title} onClick={() => setSheet(false)}>
              <Icon name={d.icon} /> {d.title}
            </a>
          ))}
          <a className="sheet-link" href="/compare" onClick={() => setSheet(false)}>
            <Icon name="compare" /> Compare Documents
          </a>
          <a className="sheet-link" href="/glossary" onClick={() => setSheet(false)}>
            <Icon name="book" /> Legal Glossary
          </a>
        </div>

        {/* The five languages the catalogue actually ships. Informational here;
            the working switcher lives on the analysis screen. */}
        <div className="sheet-group">
          <h4>Explain in</h4>
          <div className="sheet-langs">
            {LANGUAGES.map((l) => (
              <span className="chip" lang={l.code} key={l.code} style={{ cursor: "default" }}>
                {l.label}
              </span>
            ))}
          </div>
        </div>

        <div className="sheet-foot">
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <button className="btn btn-primary btn-lg btn-block">Create an account</button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="btn btn-secondary btn-lg btn-block">Login</button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <a className="btn btn-primary btn-lg btn-block" href="/dashboard">
              Upload a Document
            </a>
          </Show>
        </div>
      </div>
    </>
  );
}
