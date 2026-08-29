"use client";

import { useState } from "react";

import { Icon } from "@/components/icon-sprite";
import {
  BAND_EMOJI,
  BAND_LABELS,
  computeAffordability,
  formatRupees,
  isAffordabilityError,
  FOIR_CAUTION_MAX,
  FOIR_SAFE_MAX,
} from "@/lib/affordability";
import type { AffordabilityBand } from "@/lib/affordability";
import type { DocumentTypeResult } from "@/lib/doc-type";
import { translate } from "@/lib/i18n";
import type { LanguageCode } from "@/lib/i18n/languages";
import type { ExtractedFigures } from "@/lib/figures";

/**
 * The FOIR calculation runs here in the browser because it needs the user's
 * income, which we deliberately never send anywhere. It is the same pure
 * function the server could call — arithmetic, no model, no network.
 *
 * The design system's .foir meter is drawn only once a real result exists.
 * There is no default 46% to show: without an income there is no ratio.
 */
const BAND_TONE: Record<AffordabilityBand, "clear" | "important" | "severe"> = {
  safe: "clear",
  caution: "important",
  risky: "severe",
};

export function AffordabilityPanel({
  documentType,
  figures,
  language,
}: {
  documentType: DocumentTypeResult;
  figures: ExtractedFigures;
  language: LanguageCode;
}) {
  const t = (text: string) => translate(text, language);
  const [income, setIncome] = useState("");
  const [existing, setExisting] = useState("");

  if (!documentType.financial) {
    return (
      <section className="card card-p">
        <h3 className="h4 row g8">
          <Icon name="loan" style={{ width: 17, height: 17 }} />
          {t("Affordability")}
        </h3>
        <p className="small mt8">
          Affordability is not applicable to this document type — it imposes no recurring payment.
        </p>
      </section>
    );
  }

  const obligation = figures.monthlyObligation;
  const proposed = obligation?.amount ?? 0;
  const incomeValue = Number.parseFloat(income.replace(/[,\s]/g, ""));
  const existingValue =
    existing.trim() === "" ? 0 : Number.parseFloat(existing.replace(/[,\s]/g, ""));

  const ready = income.trim() !== "" && Number.isFinite(incomeValue);
  const outcome = ready
    ? computeAffordability({
        netMonthlyIncome: incomeValue,
        existingObligations: Number.isFinite(existingValue) ? existingValue : Number.NaN,
        proposedObligation: proposed,
      })
    : null;

  const result = outcome && !isAffordabilityError(outcome) ? outcome : null;

  return (
    <section className="card card-p">
      <div className="row between wrap g12">
        <div>
          <h3 className="h4 row g8">
            <Icon name="loan" style={{ width: 17, height: 17 }} />
            {t("Affordability (FOIR)")}
          </h3>
          <p className="small mt8" style={{ maxWidth: "52ch" }}>
            Your fixed obligations against your income. Computed in this browser from the figures
            in your document — your income is never sent anywhere.
          </p>
        </div>
        {result ? (
          <span className={`badge badge-${BAND_TONE[result.band]} badge-lg`}>
            <span className={`dot dot-${BAND_TONE[result.band]}`} />
            {result.foir.toFixed(1)}% FOIR
          </span>
        ) : null}
      </div>

      <div className="small mt16">
        {obligation ? (
          <p>
            This document commits you to{" "}
            <span className="hl">{formatRupees(obligation.amount)}</span> a month (
            {obligation.kind === "emi" ? "EMI" : "rent"}, read as &ldquo;{obligation.matchedText}
            &rdquo;).
          </p>
        ) : (
          <p>
            No recurring monthly amount could be read from this document, so the new obligation is
            treated as zero.
          </p>
        )}
        <ul className="stack g4 mt8">
          {figures.deposit ? (
            <li className="tiny">Deposit: {formatRupees(figures.deposit.amount)}</li>
          ) : null}
          {figures.interestRate ? (
            <li className="tiny">Interest: {figures.interestRate.matchedText}</li>
          ) : null}
          {figures.penaltyRate ? (
            <li className="tiny">Penalty rate: {figures.penaltyRate.matchedText}</li>
          ) : null}
        </ul>
      </div>

      <div className="grid grid-2 mt20" style={{ gap: 12 }}>
        <div className="field">
          <label className="field-label" htmlFor="net-income">
            {t("Net monthly take-home")} (₹)
          </label>
          <input
            id="net-income"
            className="input"
            inputMode="numeric"
            placeholder="62000"
            value={income}
            onChange={(event) => setIncome(event.target.value)}
          />
          <span className="tiny">{t("After tax.")}</span>
        </div>
        <div className="field">
          <label className="field-label" htmlFor="existing-obligations">
            {t("Existing monthly obligations")} (₹)
          </label>
          <input
            id="existing-obligations"
            className="input"
            inputMode="numeric"
            placeholder="18000"
            value={existing}
            onChange={(event) => setExisting(event.target.value)}
          />
          <span className="tiny">{t("Current EMIs and rent.")}</span>
        </div>
      </div>

      {outcome && isAffordabilityError(outcome) ? (
        <p className="small mt16" style={{ color: "var(--cw-severe-text)" }}>
          {outcome.error}
        </p>
      ) : null}

      {result ? (
        <>
          {/* The meter is capped at 100% width; the ratio itself is never clamped. */}
          <div
            className="foir mt20"
            role="img"
            aria-label={`Fixed obligations are ${result.foir.toFixed(1)} percent of monthly income`}
          >
            <span
              className="foir-fill"
              style={{ width: `${Math.min(result.foir, 100)}%` }}
            />
            <span className="foir-cap" style={{ left: `${FOIR_CAUTION_MAX}%` }} />
          </div>
          <div className="row between mt8">
            <span className="tiny">
              {formatRupees(result.totalObligations)} of{" "}
              {formatRupees(result.input.netMonthlyIncome)} monthly income
            </span>
            <span className="tiny">Typical ceiling {FOIR_CAUTION_MAX}%</span>
          </div>

          <div className="grid grid-3 mt20" style={{ gap: 10 }}>
            <div className="mini">
              <span className="tiny">This document</span>
              <b>{formatRupees(result.input.proposedObligation)}</b>
            </div>
            <div className="mini">
              <span className="tiny">Existing obligations</span>
              <b>{formatRupees(result.input.existingObligations)}</b>
            </div>
            <div className="mini">
              <span className="tiny">Total each month</span>
              <b>{formatRupees(result.totalObligations)}</b>
            </div>
          </div>

          {/* Built from parts so the band word translates while the FOIR figure
              stays exactly as computed. */}
          <p className="h4 mt20">
            {BAND_EMOJI[result.band]} {t(BAND_LABELS[result.band])} — FOIR{" "}
            {result.foir.toFixed(1)}%
          </p>

          <div className="mono tiny stack g4 mt12">
            <span>
              ({formatRupees(result.input.existingObligations)} existing +{" "}
              {formatRupees(result.input.proposedObligation)} new) ={" "}
              {formatRupees(result.totalObligations)}
            </span>
            <span>
              {formatRupees(result.totalObligations)} ÷{" "}
              {formatRupees(result.input.netMonthlyIncome)} × 100 ={" "}
              <b>{result.foir.toFixed(1)}%</b>
            </span>
          </div>

          <p className="small mt16">
            {result.explanationParts.map((part) => t(part)).join(" ")}
          </p>

          <p className="tiny mt16">
            Bands: 🟢 safe up to {FOIR_SAFE_MAX}%, 🟡 caution up to {FOIR_CAUTION_MAX}%, 🔴 risky
            above {FOIR_CAUTION_MAX}%. Counted: existing EMIs and rent plus this document&rsquo;s
            obligation. Not counted: PF and professional tax (income is already net of them), nor
            lifestyle spending or SIPs, which can be stopped.
          </p>
        </>
      ) : null}

      <p className="disclaimer mt20">
        <Icon name="info" />
        {t("Informational only — not financial advice.")}
      </p>
    </section>
  );
}
