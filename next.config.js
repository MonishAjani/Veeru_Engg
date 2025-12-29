/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ],
    unoptimized: true,
    domains: ['veeruengineering.com']
  },
  // Add asset prefix for production
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://veeruengineering.com' : undefined,
  // Ensure trailing slashes for consistent path handling
  trailingSlash: true
};

module.exports = nextConfig;
