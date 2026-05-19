import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Setting the root to the current directory to avoid workspace inference warnings
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
