/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable TypeScript type checking and ESLint during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['fakestoreapi.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '**',
      },
    ],
  },
  serverExternalPackages: [],
  // Disable strict mode for faster development
  reactStrictMode: false,
};

module.exports = nextConfig;
