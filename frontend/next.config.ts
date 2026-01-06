import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  /* Use if lazy 
  eslint: {
    ignoreDuringBuilds: true,
  },
  */
};

export default nextConfig;
