import { Icon } from "@/components/icon-sprite";

/**
 * The tiles mirror the document types the detector actually recognises
 * (lib/doc-type.ts: rental, loan, employment, nda, service). Anything else
 * falls back to the general checklist, which is what the last tile says.
 */
export function DocTypes() {
  return (
    <section
      className="section"
      id="documents"
      style={{
        background: "var(--cw-surface-warm)",
        borderTop: "1px solid var(--cw-border)",
        borderBottom: "1px solid var(--cw-border)",
      }}
    >
      <div className="container">
        <div className="stack center tac g16" style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 className="h2 balance">
            Built for the documents
            <br />
            ordinary people actually sign
          </h2>
          <p className="lead balance" style={{ maxWidth: "56ch" }}>
            Not enterprise paperwork — the rental agreement, the loan sanction letter and the
            offer letter that decide how your year goes.
          </p>
        </div>

        <div className="grid grid-6 mt40" style={{ gap: 14 }}>
          <a className="tile" href="/dashboard">
            <Icon name="home" />
            Rental / Leave &amp; Licence
            <span>Deposit, notice period, lock-in</span>
          </a>
          <a className="tile" href="/dashboard">
            <Icon name="loan" />
            Loan Agreements
            <span>Interest, penalties, prepayment</span>
          </a>
          <a className="tile" href="/dashboard">
            <Icon name="work" />
            Employment Agreements
            <span>Notice, bond, non-compete</span>
          </a>
          <a className="tile" href="/dashboard">
            <Icon name="tos" />
            Service Agreements
            <span>Scope, termination, liability</span>
          </a>
          <a className="tile" href="/dashboard">
            <Icon name="govt" />
            Non-disclosure Agreements
            <span>What you may and may not say</span>
          </a>
          <a className="tile" href="/dashboard">
            <Icon name="doc" />
            Anything else
            <span>Split into clauses on a general checklist</span>
          </a>
        </div>

        <div className="row center mt32">
          <a className="btn btn-secondary" href="/dashboard">
            Upload a document
            <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
