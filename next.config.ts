import type { NextConfig } from "next";

/**
 * GitHub Pages serves this repo from /Harsh-Sanwal-Portfolio/, so the CI build
 * sets GITHUB_PAGES=true and everything picks up the sub-path. Local `next dev`
 * keeps running at the root.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/Harsh-Sanwal-Portfolio" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  // raw <a href> and <audio src> don't get the basePath for free — see lib/data
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
