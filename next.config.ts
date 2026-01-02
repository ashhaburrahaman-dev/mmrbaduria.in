import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate a fully static export for Wrangler asset deployment
  output: "export",
  images: {
    // Required for static export when using the built-in Image component
    unoptimized: true,
  },
};

export default nextConfig;
