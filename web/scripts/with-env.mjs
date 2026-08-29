/**
 * Run Next with the repository-root .env loaded.
 *
 * The app's .env lives at the project root (docker-compose reads it from there),
 * but Next only auto-loads env files from the web/ directory. Node's
 * --env-file-if-exists cannot be used because Next re-spawns itself through
 * NODE_OPTIONS, which rejects that flag.
 *
 * The real environment always wins over the file, so running with a variable
 * explicitly set to empty genuinely disables it — which is what makes the
 * "kill the AI and watch it degrade" test meaningful rather than cosmetic.
 * A missing .env is normal and silent: the app must run without one.
 */

import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(here, "../../.env");
const env = { ...process.env };

if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const match = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
    if (!match || line.trim().startsWith("#")) continue;
    const [, key, rawValue] = match;
    if (key in env) continue; // never override the real environment
    env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}

// Also used to run drizzle-kit, which needs the same DATABASE_URL.
const args = process.argv.slice(2);
const useDrizzle = args[0] === "--drizzle";
const bin = useDrizzle
  ? path.resolve(here, "../node_modules/drizzle-kit/bin.cjs")
  : path.resolve(here, "../node_modules/next/dist/bin/next");
const child = spawn(process.execPath, [bin, ...(useDrizzle ? args.slice(1) : args)], {
  stdio: "inherit",
  env,
});
child.on("exit", (code) => process.exit(code ?? 0));
