"use client";

import { useEffect, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Icon } from "@/components/icon-sprite";
import { Workspace } from "@/components/analysis/workspace";
import type { AnalysisResponse } from "@/lib/documents";

/**
 * Loads one saved analysis through GET /api/documents/[id].
 *
 * Going through the real route rather than reading the repository here is
 * deliberate: that route is where ownership is checked (403 for another
 * account's document) and where the placeholder -> real value mapping is left
 * out of the response. Nothing about that contract is changed by this screen.
 */
export function AnalysisScreen({ documentId }: { documentId: string }) {
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/documents/${documentId}`)
      .then(async (response) => {
        const payload = await response.json().catch(() => null);
        if (cancelled) return;
        if (!response.ok) {
          setError(
            typeof payload?.error === "string"
              ? payload.error
              : `The server returned status ${response.status}.`,
          );
          return;
        }
        setAnalysis(payload as AnalysisResponse);
      })
      .catch(() => {
        if (!cancelled) setError("Could not reach the app server.");
      });
    return () => {
      cancelled = true;
    };
  }, [documentId]);

  const crumb = (
    <>
      <a href="/dashboard">Dashboard</a>
      <Icon name="chev" style={{ transform: "rotate(-90deg)" }} />
      <b>{analysis?.document.filename ?? "Analysis"}</b>
    </>
  );

  if (error) {
    return (
      <AppShell active="Dashboard" crumb={crumb}>
        <div className="page-narrow">
          <div className="card card-p tac">
            <span className="feat-icon" style={{ margin: "0 auto" }}>
              <Icon name="risk" />
            </span>
            <h1 className="h4 mt16">This analysis could not be opened</h1>
            <p className="small mt8">{error}</p>
            <div className="row center mt24">
              <a className="btn btn-secondary" href="/dashboard">
                Back to dashboard
              </a>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  if (!analysis) {
    return (
      <AppShell active="Dashboard" crumb={crumb}>
        <div className="page-narrow" aria-busy="true">
          <span className="shimmer" style={{ width: "30%", height: 16 }} />
          <span className="shimmer mt16" style={{ width: "80%" }} />
          <span className="shimmer mt8" style={{ width: "64%" }} />
          <span className="shimmer mt8" style={{ width: "72%" }} />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell active="Dashboard" crumb={crumb} flush>
      <Workspace analysis={analysis} />
    </AppShell>
  );
}
