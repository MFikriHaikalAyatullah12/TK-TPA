/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },
  // Ensure API routes work correctly
  async rewrites() {
    return []
  },
  // Configure for Vercel deployment
  output: 'standalone',
}

module.exports = nextConfig