import { Icon } from "@/components/icon-sprite";
import type { DocumentTypeResult } from "@/lib/doc-type";
import { translate } from "@/lib/i18n";
import type { LanguageCode } from "@/lib/i18n/languages";

export function DocumentInsights({
  result,
  language,
}: {
  result: DocumentTypeResult;
  language: LanguageCode;
}) {
  const t = (text: string) => translate(text, language);
  return (
    <section className="card card-p">
      <div className="row between wrap g12">
        <div>
          <h3 className="h4 row g8">
            <Icon name="doc" style={{ width: 17, height: 17 }} />
            {t("Document type")}
          </h3>
          <p className="small mt8" style={{ maxWidth: "52ch" }}>
            Detected in code from the words in the document — no model is involved.
          </p>
        </div>
        <span className="badge badge-neutral badge-lg">{result.label}</span>
      </div>

      <div className="row g6 wrap mt16">
        <span className={`badge badge-${result.financial ? "important" : "clear"}`}>
          <span className={`dot dot-${result.financial ? "important" : "clear"}`} />
          {result.financial ? "financial" : "non-financial"}
        </span>
        <span className="badge badge-neutral">{result.confidence} confidence</span>
      </div>

      <div className="stack g8 mt16">
        {result.signals.length > 0 ? (
          <p className="tiny">Matched on: {result.signals.join(", ")}.</p>
        ) : (
          <p className="tiny">
            No strong type signals found, so the general checklist is used.
          </p>
        )}
        {result.financialReasons.length > 0 ? (
          <p className="tiny">Financial signals: {result.financialReasons.join("; ")}.</p>
        ) : null}
      </div>
    </section>
  );
}
