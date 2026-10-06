import type { NextConfig } from "next";

import { alternateHosts, canonicalHost } from "./src/lib/site";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return alternateHosts.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `https://${canonicalHost}/:path*`,
      permanent: true,
    }));
  },
};

export default nextConfig;
