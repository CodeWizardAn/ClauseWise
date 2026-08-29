/**
 * Attach Indian Kanoon links to statutes already chosen by the local table.
 *
 * The contract with the rest of the app: this function never throws and never
 * changes an Act's name. It returns the same statutes, some of them carrying a
 * `reference`. If everything about IK is broken, it returns them unchanged.
 */

import "server-only";

import { lookupAct } from "@/lib/ik/cache";
import type { Statute } from "@/lib/statutes";

export async function enrichStatutes(statutes: Statute[]): Promise<Statute[]> {
  const results = await Promise.allSettled(
    statutes.map(async (statute) => {
      if (!statute.ikQuery) return statute;
      const reference = await lookupAct(statute.name, statute.ikQuery);
      return reference ? { ...statute, reference } : statute;
    }),
  );

  // A rejected lookup yields the original statute. The analysis is never
  // degraded by the enhancement failing.
  return results.map((result, index) =>
    result.status === "fulfilled" ? result.value : statutes[index],
  );
}

/** True when at least one statute carries a live IK link. Gates attribution. */
export function hasIkReferences(statutes: Statute[]): boolean {
  return statutes.some((statute) => Boolean(statute.reference));
}
