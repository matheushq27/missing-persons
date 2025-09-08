import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3dev.pjc.mt.gov.br',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;
