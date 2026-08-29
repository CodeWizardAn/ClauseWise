import { Icon } from "@/components/icon-sprite";
import { translate } from "@/lib/i18n";
import type { LanguageCode } from "@/lib/i18n/languages";
import type { OmissionResult } from "@/lib/omission";
import { statutesByIds } from "@/lib/statutes";

/**
 * Omission Radar.
 *
 * OmissionFinding carries no severity field, so the design's per-item severity
 * dot is driven by the one real signal there is: a missing protective clause is
 * a gap (risk tone), a present one is not (clear tone). No severity is invented
 * per item.
 */
export function OmissionPanel({
  omission,
  language,
}: {
  omission: OmissionResult;
  language: LanguageCode;
}) {
  const t = (text: string) => translate(text, language);

  return (
    <section className="card card-p">
      <div className="row between wrap g12">
        <div>
          <h3 className="h4 row g8">
            <Icon name="risk" style={{ width: 17, height: 17 }} />
            {t("Omission Radar")}
          </h3>
          <p className="small mt8" style={{ maxWidth: "52ch" }}>
            What this document does <em>not</em> say. Absences are harder to spot than bad
            clauses, and cost more.
          </p>
        </div>
        <span
          className={`badge badge-${omission.missingCount > 0 ? "risk" : "clear"} badge-lg`}
        >
          <span className={`dot dot-${omission.missingCount > 0 ? "risk" : "clear"}`} />
          {omission.missingCount} {omission.missingCount === 1 ? "gap" : "gaps"}
        </span>
      </div>

      <div className="row g6 wrap mt16">
        <span className="badge badge-neutral">
          {omission.presentCount} of {omission.checkedCount} present
        </span>
        <span className="badge badge-neutral">{omission.checklistLabel} checklist</span>
      </div>

      {omission.missing.length > 0 ? (
        <>
          <p className="label mt20">
            {t("Protective clauses this document does not contain")}
          </p>
          <ul className="stack g10 mt12">
            {omission.missing.map((item) => (
              <li className="omission" key={item.id}>
                <span className="dot dot-risk" />
                <div style={{ minWidth: 0 }}>
                  <b>{t(item.title)}</b>
                  <span className="small" style={{ display: "block" }}>
                    {t(item.why)}
                  </span>
                  {item.statuteIds.length > 0 ? (
                    <div className="row g6 wrap mt8">
                      {statutesByIds(item.statuteIds).map((statute) => (
                        <span key={statute.id} className="badge badge-neutral">
                          {statute.name}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {item.cancelledBy ? (
                    <span className="tiny" style={{ display: "block", marginTop: 6, fontStyle: "italic" }}>
                      The document addresses this but takes it away: &ldquo;{item.cancelledBy}&rdquo;
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="small mt20">
          Every clause on the {omission.checklistLabel} checklist was found.
        </p>
      )}

      {omission.present.length > 0 ? (
        <details className="mt20">
          <summary className="label" style={{ cursor: "pointer" }}>
            {omission.presentCount} clauses found
          </summary>
          <ul className="stack g8 mt12">
            {omission.present.map((item) => (
              <li key={item.id} className="row g8" style={{ alignItems: "flex-start" }}>
                <span className="dot dot-clear" style={{ marginTop: 7 }} />
                <span className="small">{t(item.title)}</span>
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      <p className="disclaimer mt20">
        <Icon name="info" />
        {t(
          "Checks are keyword and pattern based, not a legal review. A clause worded unusually may be reported as missing when it is present.",
        )}
      </p>
    </section>
  );
}
