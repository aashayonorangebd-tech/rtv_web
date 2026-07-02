import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_BASE_URL || "https://api.rtvonline.com"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
