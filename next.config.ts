import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.rtvonline.com",
      },
      {
        protocol: "https",
        hostname: "imrs.rtvonline.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/get-area-serach",
        destination: "https://rtvonline.com/api/get-area-serach",
      },
      {
        source: "/api/get-district-value",
        destination: "https://rtvonline.com/api/get-district-value",
      },
      {
        source: "/api/get-subdistrict-value",
        destination: "https://rtvonline.com/api/get-subdistrict-value",
      },
      {
        source: "/api/:path*",
        destination: `${process.env.API_BASE_URL || "https://api.rtvonline.com"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
