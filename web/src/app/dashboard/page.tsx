import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export const metadata = { title: "Dashboard — ClauseWise" };

/**
 * Signed-in dashboard.
 *
 * The gate here keeps a signed-out visitor from seeing an empty app shell; it
 * is not the security boundary. Every API route this page calls re-checks the
 * session server-side, and ownership is enforced again at the data layer.
 */
export default async function DashboardPage() {
  const { userId } = await auth.protect();

  return (
    <AppShell active="Dashboard" crumb={<b>Dashboard</b>}>
      <DashboardView />
    </AppShell>
  );
}
