import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,  // highlights potential problems
  // swcMinify: true,        // use SWC compiler for minification (faster builds)
};

export default nextConfig;
