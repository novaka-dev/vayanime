import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.noitatnemucod.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
