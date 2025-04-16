import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['fakestoreapi.com', 'i.pravatar.com'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
};

export default nextConfig;
