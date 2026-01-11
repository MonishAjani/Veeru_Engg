/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ],
    unoptimized: true,
    domains: [
      'veeruengineering.com',
      'api.veeruengineering.com',
      'localhost'
    ]
  },
  // Add asset prefix for production
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://veeruengineering.com' : undefined,
  // Ensure trailing slashes for consistent path handling
  trailingSlash: true,
  // Output standalone build for easier deployment
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined
};

module.exports = nextConfig;
