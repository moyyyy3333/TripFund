import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/TripFund',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
