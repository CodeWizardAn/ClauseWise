import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle so the Docker image does not need to
  // ship node_modules or a build toolchain.
  output: "standalone",
  turbopack: {
    // Pin the workspace root to this app. Without it Turbopack walks up the
    // directory tree looking for a lockfile and can land outside the project.
    root: __dirname,
  },
  // This app owns its own docs; do not generate agent instruction files.
  agentRules: false,
};

export default nextConfig;
