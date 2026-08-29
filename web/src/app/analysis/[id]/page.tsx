import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { AnalysisScreen } from "@/components/analysis/analysis-screen";

export const metadata = { title: "Analysis — ClauseWise" };

/**
 * One saved analysis.
 *
 * The gate here only keeps a signed-out visitor out of the shell. Ownership of
 * this particular document is enforced by GET /api/documents/[id], which the
 * screen calls — another account's id returns 403 and never its contents.
 */
export default async function AnalysisPage({ params }: PageProps<"/analysis/[id]">) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const { id } = await params;
  return <AnalysisScreen documentId={id} />;
}
