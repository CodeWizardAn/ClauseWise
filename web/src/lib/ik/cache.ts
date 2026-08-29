/**
 * Cache for Indian Kanoon lookups.
 *
 * The balance is prepaid, and the same handful of Acts recur across every
 * document — the Registration Act appears in every rental agreement we see. One
 * lookup per Act, reused thereafter, is the difference between a few calls and
 * a few per upload.
 *
 * Misses are cached as well, for the same reason: an Act IK has no page for
 * would otherwise be re-queried forever.
 *
 * Process memory with a TTL. It is per-instance and vanishes on restart, which
 * is acceptable — the cost of a cold cache is one call per Act, and a stale
 * link is worse than a re-fetch.
 */

import "server-only";

import { searchAct, type IkReference } from "@/lib/ik/client";

const TTL_MS = 24 * 60 * 60 * 1000;
const MAX_ENTRIES = 200;

interface Entry {
  value: IkReference | null;
  storedAt: number;
}

const cache = new Map<string, Entry>();
/** In-flight lookups, so concurrent uploads do not each spend a call. */
const inflight = new Map<string, Promise<IkReference | null>>();

let hits = 0;
let misses = 0;
let liveCalls = 0;

export function cacheStats() {
  return { hits, misses, liveCalls, entries: cache.size };
}

export async function lookupAct(
  actName: string,
  query: string,
): Promise<IkReference | null> {
  const key = actName.toLowerCase();
  const cached = cache.get(key);
  if (cached && Date.now() - cached.storedAt < TTL_MS) {
    hits += 1;
    return cached.value;
  }

  const pending = inflight.get(key);
  if (pending) return pending;

  misses += 1;
  const request = (async () => {
    liveCalls += 1;
    const value = await searchAct(actName, query);
    // Store null too — a negative result is worth remembering.
    cache.set(key, { value, storedAt: Date.now() });
    while (cache.size > MAX_ENTRIES) {
      const oldest = cache.keys().next().value;
      if (oldest === undefined) break;
      cache.delete(oldest);
    }
    inflight.delete(key);
    return value;
  })();

  inflight.set(key, request);
  return request;
}
