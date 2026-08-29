"use client";

import { useEffect, useMemo, useState } from "react";

import { AffordabilityPanel } from "@/components/affordability-panel";
import { DocumentInsights } from "@/components/document-insights";
import { Icon } from "@/components/icon-sprite";
import { OmissionPanel } from "@/components/omission-panel";
import { PrivacyPanel } from "@/components/privacy-panel";
import { StatutePanel } from "@/components/statute-panel";
import { TypingAnimation } from "@/components/ui/typing-animation";
import type { ClauseRisk } from "@/lib/ai/risk";
import type { Clause } from "@/lib/segment";
import type { AnalysisResponse } from "@/lib/documents";
import { translate } from "@/lib/i18n";
import { DEFAULT_LANGUAGE, LANGUAGES, type LanguageCode } from "@/lib/i18n/languages";
import { SEVERITY_LABELS, type Severity } from "@/lib/severity";

/**
 * Analysis workspace — the design's three-column layout bound to real data.
 *
 * Everything shown here comes from GET /api/documents/[id] (ownership checked
 * server-side) plus POST /api/risk and POST /api/ask. The design prototype's
 * five hardcoded clauses, invented statute section numbers and per-clause
 * "your obligation / your right" blocks are gone: none of them have a source in
 * this app, and lib/statutes.ts explicitly refuses to cite section numbers.
 */

/**
 * The design system has four severity tones; the engine has five bands. This is
 * the only mapping — no severity is invented, each real band lands on a tone.
 */
const TONE: Record<Severity, "clear" | "important" | "risk" | "severe"> = {
  clean: "clear",
  low: "clear",
  medium: "important",
  high: "risk",
  critical: "severe",
};

/**
 * The clause text minus the marker-and-heading line, so a section header is not
 * printed twice. The stored clause always keeps the full original words; only
 * the rendering trims the duplicate.
 */
function bodyText(clause: Clause): string {
  if (!clause.heading) return clause.text;
  const prefix = clause.marker
    ? new RegExp(`^${clause.marker.replace(/\./g, "\\.")}[.):]?\\s*`)
    : null;
  const withoutMarker = prefix ? clause.text.replace(prefix, "") : clause.text;
  return withoutMarker.startsWith(clause.heading)
    ? withoutMarker.slice(clause.heading.length).trim()
    : clause.text;
}

/** Generic prompts. They make no claim about the document — /api/ask answers from it. */
const SUGGESTED = [
  "What happens if I pay late?",
  "How do I end this agreement?",
  "What am I required to pay?",
];

interface Turn {
  question: string;
  answer: {
    answer: string;
    citations: number[];
    found: boolean;
    source: "ai" | "keyword";
    notice: string | null;
  } | null;
  error: string | null;
}

export function Workspace({ analysis }: { analysis: AnalysisResponse }) {
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState<"doc" | "insights">("doc");
  const [language, setLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [risks, setRisks] = useState<Map<number, ClauseRisk> | null>(null);
  const [riskNotice, setRiskNotice] = useState<string | null>(null);
  const [riskPending, setRiskPending] = useState(false);
  const [draft, setDraft] = useState("");
  const [thread, setThread] = useState<Turn[]>([]);
  const [asking, setAsking] = useState(false);

  const t = (text: string) => translate(text, language);
  const clauses = analysis.clauses;
  const clause = clauses[selected];
  const risk = risks?.get(clause?.index ?? -1);

  /**
   * Clause risk is fetched after the analysis renders, so the deterministic
   * results appear immediately and the AI layer fills in when it arrives. If it
   * never arrives, everything above it still stands.
   */
  useEffect(() => {
    let cancelled = false;
    setRiskPending(true);
    fetch("/api/risk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId: analysis.documentId, language }),
    })
      .then(async (response) => {
        const payload = await response.json().catch(() => null);
        if (cancelled) return;
        if (!response.ok) {
          setRiskNotice(
            typeof payload?.error === "string"
              ? payload.error
              : "Clause analysis is unavailable — showing clauses without risk scoring.",
          );
          return;
        }
        const list: ClauseRisk[] = Array.isArray(payload?.risks) ? payload.risks : [];
        setRisks(new Map(list.map((item) => [item.index, item])));
        setRiskNotice(typeof payload?.notice === "string" ? payload.notice : null);
      })
      .catch(() => {
        if (!cancelled)
          setRiskNotice("Clause analysis is unavailable — showing clauses without risk scoring.");
      })
      .finally(() => {
        if (!cancelled) setRiskPending(false);
      });
    return () => {
      cancelled = true;
    };
  }, [analysis.documentId, language]);

  async function ask(question: string) {
    const asked = question.trim();
    if (!asked || asking) return;
    setAsking(true);
    setDraft("");
    setThread((previous) => [...previous, { question: asked, answer: null, error: null }]);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: analysis.documentId, question: asked, language }),
      });
      const payload = await response.json().catch(() => null);
      setThread((previous) =>
        previous.map((turn, index) =>
          index === previous.length - 1
            ? response.ok
              ? { ...turn, answer: payload }
              : {
                  ...turn,
                  error:
                    typeof payload?.error === "string"
                      ? payload.error
                      : `The server returned status ${response.status}.`,
                }
            : turn,
        ),
      );
    } catch {
      setThread((previous) =>
        previous.map((turn, index) =>
          index === previous.length - 1
            ? { ...turn, error: "Could not reach the app server." }
            : turn,
        ),
      );
    } finally {
      setAsking(false);
    }
  }

  const counted = useMemo(() => {
    const parts = [
      `${analysis.segmentation.clauseCount} ${
        analysis.segmentation.clauseCount === 1 ? "clause" : "clauses"
      }`,
      `${analysis.segmentation.wordCount.toLocaleString()} words`,
    ];
    if (analysis.document.pages !== null) parts.push(`${analysis.document.pages} pages`);
    return parts.join(" · ");
  }, [analysis]);

  const body = clause ? bodyText(clause) : "";

  return (
    <div className="ws" id="content">
      {/* ---------- outline ---------- */}
      <section className="ws-col ws-outline" aria-label="Document outline">
        <p className="ws-meta">{counted}</p>

        <nav className="stack" style={{ padding: "0 8px" }}>
          {clauses.map((item, index) => {
            const itemRisk = risks?.get(item.index);
            return (
              <button
                key={item.index}
                className={`cl-row${index === selected ? " active" : ""}`}
                onClick={() => {
                  setSelected(index);
                  setTab("doc");
                }}
                aria-current={index === selected ? "true" : undefined}
              >
                <span className="cl-no">{item.marker ?? item.index}</span>
                <span className="cl-title">
                  {item.heading ?? `Clause ${item.index}`}
                </span>
                {itemRisk ? (
                  <span
                    className={`dot dot-${TONE[itemRisk.severity]}`}
                    title={`${SEVERITY_LABELS[itemRisk.severity]} · ${itemRisk.score}`}
                  />
                ) : null}
              </button>
            );
          })}
        </nav>

        <hr style={{ margin: 14 }} />

        <div className="stack" style={{ padding: "0 8px" }}>
          <button className="cl-row" onClick={() => setTab("insights")}>
            <Icon name="risk" style={{ width: 15, height: 15 }} />
            <span className="cl-title">{t("Omission Radar")}</span>
            <span className="side-count">{analysis.omission.missingCount}</span>
          </button>
        </div>

        {/* The real multilingual layer: catalogue lookup for the UI, and a
            re-request so clause explanations come back in the new language. */}
        <div className="ws-lang">
          <span className="tiny row g6">
            <Icon name="translate" style={{ width: 14, height: 14 }} /> {t("Explain in")}
          </span>
          <select
            className="input"
            value={language}
            onChange={(event) => setLanguage(event.target.value as LanguageCode)}
            aria-label="Explanation language"
          >
            {LANGUAGES.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* ---------- document / insights ---------- */}
      <section className="ws-col ws-doc" aria-label="Document">
        <div className="ws-toolbar">
          <div className="seg" role="tablist">
            <button
              role="tab"
              aria-selected={tab === "doc"}
              className={tab === "doc" ? "on" : ""}
              onClick={() => setTab("doc")}
            >
              {t("Document")}
            </button>
            <button
              role="tab"
              aria-selected={tab === "insights"}
              className={tab === "insights" ? "on" : ""}
              onClick={() => setTab("insights")}
            >
              {t("Insights")}
            </button>
          </div>
          <span className="tiny">
            Clause {selected + 1} of {clauses.length}
          </span>
        </div>

        {tab === "doc" ? (
          <div className="ws-scroll">
            <article className="doc-sheet">
              <div
                className="row between"
                style={{
                  borderBottom: "1px solid var(--cw-border)",
                  paddingBottom: 10,
                  marginBottom: 22,
                }}
              >
                <span className="label">{analysis.documentType.label}</span>
                <span className="label">{analysis.document.filename}</span>
              </div>

              <p className="doc-clause-no">
                {clause?.marker ? `Clause ${clause.marker}` : `Clause ${clause?.index}`}
              </p>
              {clause?.heading ? <h2 className="h3 mt8">{clause.heading}</h2> : null}

              <div className="doc-body mt16">
                {body ? (
                  <p style={{ whiteSpace: "pre-wrap" }}>{body}</p>
                ) : (
                  <p className="small">This clause is a heading with no body text.</p>
                )}
              </div>

              <p className="tiny tac" style={{ marginTop: 34 }}>
                {clause?.wordCount} {clause?.wordCount === 1 ? "word" : "words"} · shown from the
                redacted text
              </p>
            </article>
          </div>
        ) : (
          <div className="ws-scroll">
            <div className="stack g16" style={{ maxWidth: 720, margin: "0 auto" }}>
              <DocumentInsights result={analysis.documentType} language={language} />
              <AffordabilityPanel
                documentType={analysis.documentType}
                figures={analysis.figures}
                language={language}
              />
              <OmissionPanel omission={analysis.omission} language={language} />
              <StatutePanel
                statutes={analysis.statutes ?? []}
                flags={analysis.statuteFlags ?? []}
                language={language}
              />
              <PrivacyPanel
                redaction={analysis.redaction}
                originalText={analysis.originalText}
                redactedText={analysis.redactedText}
                language={language}
              />

              {analysis.document.notes.length > 0 ? (
                <section className="card card-p">
                  <h3 className="h4">{t("Notes from the extractor")}</h3>
                  <ul className="stack g8 mt12">
                    {analysis.document.notes.map((note) => (
                      <li key={note} className="small row g8" style={{ alignItems: "flex-start" }}>
                        <span className="dot dot-important" style={{ marginTop: 7 }} />
                        {note}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          </div>
        )}
      </section>

      {/* ---------- ask ---------- */}
      <section className="ws-col ws-ask" aria-label="Ask ClauseWise">
        <div className="ask-head">
          <span className="row g8">
            <Icon name="spark" style={{ width: 17, height: 17 }} />
            <b>{t("Ask about this document")}</b>
          </span>
          <span className="tiny">
            {clause?.heading ?? `Clause ${clause?.index}`}
          </span>
        </div>

        <div className="ws-scroll ask-body">
          {/* Risk for the selected clause. The only per-clause prose this app
              produces is ClauseRisk.explanation — there is no separate plain
              rewrite, so one block is shown, not three. */}
          {riskPending && !risk ? (
            <>
              <span className="shimmer" style={{ width: "40%" }} />
              <span className="shimmer mt8" style={{ width: "92%" }} />
              <span className="shimmer mt8" style={{ width: "70%" }} />
            </>
          ) : null}

          {risk ? (
            <>
              <div className="row between">
                <span className="label">{t("Risk level")}</span>
                <span className={`badge badge-${TONE[risk.severity]}`}>
                  <span className={`dot dot-${TONE[risk.severity]}`} />
                  {SEVERITY_LABELS[risk.severity]} · {risk.score}
                </span>
              </div>

              <p className="label mt20" style={{ color: "var(--cw-accent-deep)" }}>
                {t("What this means for you")}
              </p>
              <p className="body mt8" style={{ color: "var(--cw-text)" }}>
                {risk.explanation}
              </p>

              {risk.source === "rules" ? (
                <p className="tiny mt12">
                  Scored by the deterministic rule engine, not a model.
                </p>
              ) : null}
            </>
          ) : null}

          {riskNotice ? (
            <p className="tiny mt12" style={{ borderTop: "1px solid var(--cw-border)", paddingTop: 12 }}>
              {riskNotice}
            </p>
          ) : null}

          {thread.map((turn, index) => (
            <div className="ask-turn" key={index}>
              <div className="ask-q">{turn.question}</div>
              <div className="ask-a">
                {turn.error ? (
                  <p className="small" style={{ color: "var(--cw-severe-text)" }}>
                    {turn.error}
                  </p>
                ) : turn.answer === null ? (
                  <>
                    <span className="shimmer" style={{ width: "92%" }} />
                    <span className="shimmer mt8" style={{ width: "74%" }} />
                    <span className="shimmer mt8" style={{ width: "58%" }} />
                  </>
                ) : (
                  <>
                    {turn.answer.notice ? (
                      <p className="tiny" style={{ marginBottom: 8 }}>
                        {turn.answer.notice}
                      </p>
                    ) : null}
                    <TypingAnimation
                      className="body"
                      style={{
                        color: "var(--cw-text)",
                        fontSize: "15px",
                        fontWeight: 400,
                        letterSpacing: "-.006em",
                      }}
                      duration={14}
                      as="p"
                    >
                      {turn.answer.answer}
                    </TypingAnimation>
                    <div className="row g6 wrap" style={{ marginTop: 10 }}>
                      {turn.answer.found ? (
                        turn.answer.citations.map((citation) => (
                          <span key={citation} className="badge badge-neutral">
                            Clause {citation}
                          </span>
                        ))
                      ) : (
                        <span className="badge badge-neutral">not in this document</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="ask-foot">
          <div className="row g6 wrap" style={{ marginBottom: 10 }}>
            {SUGGESTED.map((suggestion) => (
              <button
                className="chip"
                key={suggestion}
                disabled={asking}
                onClick={() => void ask(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
          <form
            className="row g8"
            onSubmit={(event) => {
              event.preventDefault();
              void ask(draft);
            }}
          >
            <input
              className="input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask anything about this document…"
              aria-label="Ask about this document"
              disabled={asking}
            />
            <button
              className="btn btn-primary btn-icon"
              type="submit"
              aria-label="Send"
              disabled={asking || !draft.trim()}
            >
              <Icon name="arrow" />
            </button>
          </form>
          <p className="disclaimer mt12">
            <Icon name="shield" />
            The model sees the redacted text only. Answers come from this document&rsquo;s clauses
            and cite the clause they used. Not legal advice.
          </p>
        </div>
      </section>
    </div>
  );
}
