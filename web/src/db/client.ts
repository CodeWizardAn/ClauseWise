import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { databaseUrl } from "@/lib/env";
import * as schema from "@/db/schema";

let cached: ReturnType<typeof drizzle> | null = null;

/** The Drizzle client. Built lazily so a missing URL fails at use, loudly. */
export function db() {
  if (!cached) cached = drizzle(neon(databaseUrl()), { schema });
  return cached;
}
