import { LANGUAGES } from "@/lib/i18n/languages";

/**
 * The design marquee advertised twelve Indian languages. This build ships a
 * prebuilt catalogue for five, so it lists five — the marquee is duplicated
 * once (aria-hidden) purely to make the CSS slide loop seamless.
 */
export function Multilingual() {
  return (
    <section className="section-sm">
      <div className="container">
        <div className="card card-p" style={{ padding: "44px 40px", background: "var(--cw-surface-warm)" }}>
          <div className="stack center tac g14">
            <h2 className="h2 balance" style={{ maxWidth: "22ch" }}>
              Explained in the language you think in
            </h2>
            <p className="lead balance" style={{ maxWidth: "54ch" }}>
              The document stays in its original language. The explanation arrives in yours.
            </p>
          </div>
          <div className="marquee mt32">
            <div className="marquee-track">
              {LANGUAGES.map((l) => (
                <span className="chip" lang={l.code} key={l.code}>
                  {l.label}
                </span>
              ))}
              {LANGUAGES.map((l) => (
                <span className="chip" lang={l.code} key={`echo-${l.code}`} aria-hidden="true">
                  {l.label}
                </span>
              ))}
            </div>
          </div>
          <p className="tiny tac mt20">
            Clause explanations are regenerated in the language you pick. Amounts, statute names
            and links are never translated.
          </p>
        </div>
      </div>
    </section>
  );
}
