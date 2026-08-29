"use client";

import { useUser } from "@clerk/nextjs";

import { Icon } from "@/components/icon-sprite";
import { SavedList } from "@/components/dashboard/saved-list";
import { UploadPanel } from "@/components/dashboard/upload-panel";

/**
 * The design's dashboard opened with three stat tiles — documents analysed,
 * clauses simplified, things worth your attention. Only the first has a real
 * source, and GET /api/documents deliberately does not decrypt rows to count
 * clauses, so the tiles are omitted rather than filled with invented totals.
 */
function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function DashboardView() {
  const { user } = useUser();
  const first = user?.firstName?.trim();

  return (
    <div className="page-narrow">
      <h1 className="h2">
        {greeting()}
        {first ? `, ${first}` : ""}
      </h1>
      <p className="lead mt8">What would you like to understand today?</p>

      <UploadPanel />
      <SavedList />

      <p className="disclaimer mt32">
        <Icon name="shield" />
        ClauseWise provides information about documents you upload. It is not legal or financial
        advice. Always consult a qualified professional before signing.
      </p>
    </div>
  );
}
