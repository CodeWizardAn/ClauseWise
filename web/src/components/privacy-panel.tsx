"use client";

import { useState } from "react";

import { Icon } from "@/components/icon-sprite";
import { describeCounts, type RedactionSummary } from "@/lib/documents";
import { translate } from "@/lib/i18n";
import type { LanguageCode } from "@/lib/i18n/languages";

/** Matches the [TYPE_N] placeholders the sidecar writes. */
const PLACEHOLDER_SPLIT = /(\[[A-Z]+_\d+\])/g;
// Deliberately not global: `test` on a /g regex is stateful via lastIndex and
// would return alternating results across a map.
const IS_PLACEHOLDER = /^\[[A-Z]+_\d+\]$/;

/** Render text with the placeholders visually marked. */
function withPlaceholders(text: string) {
  return text.split(PLACEHOLDER_SPLIT).map((part, index) =>
    IS_PLACEHOLDER.test(part) ? (
      <mark key={index} className="hl">
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

export function PrivacyPanel({
  redaction,
  originalText,
  redactedText,
  language,
}: {
  redaction: RedactionSummary;
  originalText: string;
  redactedText: string;
  language: LanguageCode;
}) {
  const [open, setOpen] = useState(false);
  const t = (text: string) => translate(text, language);
  const summary = describeCounts(redaction.counts);

  return (
    <section className="card card-p">
      <div className="row between wrap g12">
        <div>
          <h3 className="h4 row g8">
            <Icon name="shield" style={{ width: 17, height: 17 }} />
            {t("Privacy")}
          </h3>
          <p className="small mt8" style={{ maxWidth: "52ch" }}>
            Redaction runs on this server, before the document is split into clauses. The values
            behind each placeholder never leave the server.
          </p>
        </div>
        <span className="badge badge-clear badge-lg">
          <span className="dot dot-clear" />
          {redaction.total} redacted
        </span>
      </div>

      <p className="small mt16">
        <b>
          {redaction.total} sensitive {redaction.total === 1 ? "item" : "items"} detected and
          redacted before processing
        </b>
        {summary ? <>: {summary}</> : null} — <b>0 sent to external servers</b>.
      </p>

      <button className="btn btn-secondary btn-sm mt16" onClick={() => setOpen((v) => !v)}>
        <Icon name={open ? "close" : "search"} />
        {open ? "Hide" : "Show"} original vs redacted
      </button>

      {open ? (
        <div className="grid grid-2 mt16" style={{ gap: 12 }}>
          <div>
            <p className="label">{t("Original — stays on this server")}</p>
            <pre
              className="mono mt8"
              style={{
                maxHeight: 384,
                overflow: "auto",
                background: "var(--cw-surface-warm)",
                border: "1px solid var(--cw-border)",
                borderRadius: "var(--cw-r)",
                padding: 12,
                fontSize: 12,
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
              }}
            >
              {originalText}
            </pre>
          </div>

          <div>
            <p className="label">{t("Redacted — what would leave the server")}</p>
            <pre
              className="mono mt8"
              style={{
                maxHeight: 384,
                overflow: "auto",
                background: "var(--cw-surface-warm)",
                border: "1px solid var(--cw-border)",
                borderRadius: "var(--cw-r)",
                padding: 12,
                fontSize: 12,
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
              }}
            >
              {withPlaceholders(redactedText)}
            </pre>
          </div>
        </div>
      ) : null}
    </section>
  );
}
