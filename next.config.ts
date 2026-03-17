import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    qualities: [75, 100],
    remotePatterns: [
      { protocol: 'http', hostname: '**' },
      { protocol: 'https', hostname: '**' },
    ],
  },
  generateEtags: false,
  async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: '/images/logo/layatalklogo.webp',
        permanent: false,
      },
    ]
  },
}

export default nextConfig