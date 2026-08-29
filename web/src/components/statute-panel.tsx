import { Icon } from "@/components/icon-sprite";
import { translate } from "@/lib/i18n";
import type { LanguageCode } from "@/lib/i18n/languages";
import type { StatuteFlag } from "@/lib/statute-rules";
import type { Statute } from "@/lib/statutes";

/**
 * Statute grounding.
 *
 * The design prototype put a section number in the .statute-ref pill
 * ("Section 108"). This app has no section numbers and refuses to invent them —
 * lib/statutes.ts is explicit that a confidently-wrong "Section 17(1)(d)" reads
 * as authority and is worse than no citation. The pill therefore carries the
 * one real qualifier on a Statute: its scope.
 */
const SCOPE_NOTE: Record<Statute["scope"], string> = {
  central: "central law",
  state: "varies by state",
  model: "model law — adoption varies",
  regulator: "regulator directions",
};

const FLAG_TONE: Record<StatuteFlag["severity"], "clear" | "important" | "severe"> = {
  info: "clear",
  caution: "important",
  serious: "severe",
};

/**
 * A link is rendered only when Indian Kanoon actually returned one for that
 * Act. Nothing is constructed from a guess, so an Act with no reference simply
 * shows its name.
 */
function StatuteLink({ statute }: { statute: Statute }) {
  if (!statute.reference) return null;
  return (
    <a
      className="link-accent tiny"
      href={statute.reference.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {statute.reference.title}
      <Icon name="ext" style={{ width: 12, height: 12 }} />
    </a>
  );
}

/** Required by Indian Kanoon's terms wherever their data is displayed. */
export function IkAttribution() {
  return (
    <p className="tiny">
      Statute links powered by{" "}
      <a
        className="link"
        href="https://indiankanoon.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        IKanoon
      </a>
      .
    </p>
  );
}

export function StatutePanel({
  statutes,
  flags,
  language,
}: {
  statutes: Statute[];
  flags: StatuteFlag[];
  language: LanguageCode;
}) {
  // Statute NAMES are never passed through translate() — only the prose is.
  const t = (text: string) => translate(text, language);
  if (statutes.length === 0 && flags.length === 0) return null;

  const anyLinked =
    statutes.some((statute) => statute.reference) ||
    flags.some((flag) => flag.statutes.some((statute) => statute.reference));

  return (
    <section className="card card-p">
      <h3 className="h4 row g8">
        <Icon name="book" style={{ width: 17, height: 17 }} />
        {t("Indian law that governs this document")}
      </h3>
      <p className="small mt8" style={{ maxWidth: "52ch" }}>
        Matched from a local table of Acts by document type. Acts are named, not cited to a
        section — informational only, not legal advice.
      </p>

      {statutes.length > 0 ? (
        <ul className="stack g12 mt20">
          {statutes.map((statute) => (
            <li className="statute" key={statute.id}>
              <span className="statute-ref">{t(SCOPE_NOTE[statute.scope])}</span>
              <div style={{ minWidth: 0 }}>
                <b>{statute.name}</b>
                <span className="small" style={{ display: "block" }}>
                  {t(statute.summary)}
                </span>
                {statute.caveat ? (
                  <span
                    className="tiny"
                    style={{ display: "block", marginTop: 4, fontStyle: "italic" }}
                  >
                    {t(statute.caveat)}
                  </span>
                ) : null}
                <StatuteLink statute={statute} />
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {flags.length > 0 ? (
        <>
          <p className="label mt24">
            {t("Conditions worth checking")} ({flags.length})
          </p>
          <ul className="stack g10 mt12">
            {flags.map((item) => (
              <li className="omission" key={item.id} style={{ display: "block" }}>
                <div className="row g6 wrap">
                  <span className={`badge badge-${FLAG_TONE[item.severity]}`}>
                    <span className={`dot dot-${FLAG_TONE[item.severity]}`} />
                    {item.severity}
                  </span>
                  {item.confidence === "varies-by-state" ? (
                    <span className="badge badge-neutral">
                      {t("check your state's limit")}
                    </span>
                  ) : null}
                </div>
                <b style={{ display: "block", marginTop: 8 }}>{t(item.title)}</b>
                <span className="small" style={{ display: "block", marginTop: 4 }}>
                  {t(item.why)}
                </span>
                <span className="tiny" style={{ display: "block", marginTop: 6 }}>
                  What we saw: {t(item.observed)}
                </span>
                <div className="stack g6 mt8">
                  <div className="row g6 wrap">
                    {item.statutes.map((statute) => (
                      <span key={statute.id} className="badge badge-neutral">
                        {statute.name}
                      </span>
                    ))}
                  </div>
                  {item.statutes.map((statute) => (
                    <StatuteLink key={`${statute.id}-link`} statute={statute} />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {anyLinked ? (
        <div className="mt20">
          <IkAttribution />
        </div>
      ) : null}
    </section>
  );
}
