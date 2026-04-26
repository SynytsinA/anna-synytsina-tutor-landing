import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS
    ? process.env.ALLOWED_DEV_ORIGINS.split(',').map(s => s.trim())
    : [],
};

export default nextConfig;
