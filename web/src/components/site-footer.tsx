import { Logo } from "@/components/logo";
import { LANGUAGES } from "@/lib/i18n/languages";

/**
 * Footer, ported from the design system. The design listed Compare, Glossary
 * and Risk Alerts columns; those features do not exist here, so the columns
 * describe what this build actually does and every link resolves.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="grid grid-4" style={{ gap: "40px" }}>
          <div className="stack g14">
            <Logo />
            <p className="small" style={{ maxWidth: "30ch" }}>
              Understand every clause. Know what you&rsquo;re signing.
            </p>
          </div>

          <div>
            <h5 className="foot-col-title">What it does</h5>
            <a className="foot-link" href="#features">Ask about a clause</a>
            <a className="foot-link" href="#features">Clause risk scoring</a>
            <a className="foot-link" href="#features">Omission Radar</a>
            <a className="foot-link" href="#features">Statute grounding</a>
            <a className="foot-link" href="#features">Affordability (FOIR)</a>
          </div>

          <div>
            <h5 className="foot-col-title">Documents</h5>
            <a className="foot-link" href="#documents">Rental Agreements</a>
            <a className="foot-link" href="#documents">Loan Agreements</a>
            <a className="foot-link" href="#documents">Employment Agreements</a>
            <a className="foot-link" href="#documents">Service Agreements</a>
            <a className="foot-link" href="#documents">Non-disclosure Agreements</a>
          </div>

          <div>
            <h5 className="foot-col-title">Product</h5>
            <a className="foot-link" href="/dashboard">Dashboard</a>
            <a className="foot-link" href="/compare">Compare Versions</a>
            <a className="foot-link" href="/glossary">Legal Glossary</a>
            <a className="foot-link" href="#how">How it Works</a>
            <a className="foot-link" href="#privacy">Privacy &amp; redaction</a>
            <a
              className="foot-link"
              href="https://indiankanoon.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Statute links by IKanoon
            </a>
          </div>
        </div>

        <div className="foot-bottom">
          <span className="small">© 2026 ClauseWise.</span>
          <span className="tiny" style={{ maxWidth: "58ch" }}>
            ClauseWise provides information about documents you upload. It is not legal or
            financial advice. Always consult a qualified professional before signing.
          </span>
          <span className="tiny">
            {LANGUAGES.map((l) => l.short).join(" · ")}
          </span>
        </div>
      </div>
    </footer>
  );
}
