/**
 * Auth helpers. Clerk resolves the user; we never hand-roll session logic.
 *
 * All three audited reference projects hand-rolled auth and all three got it
 * wrong, so the only thing this module does is ask Clerk who the caller is and
 * turn "nobody" into a 401.
 */

import "server-only";

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export interface AuthedUser {
  userId: string;
}

/**
 * The current user, or a 401 response to return.
 *
 * Callers must handle the response branch; there is no variant that returns a
 * user without Clerk having verified the session.
 */
export async function requireUser(): Promise<
  { ok: true; user: AuthedUser } | { ok: false; response: NextResponse }
> {
  const { userId } = await auth();
  if (!userId) {
    return {
      ok: false,
      response: NextResponse.json({ error: "You must be signed in." }, { status: 401 }),
    };
  }
  return { ok: true, user: { userId } };
}
