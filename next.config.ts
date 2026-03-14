import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'http', hostname: '**' },
      { protocol: 'https', hostname: '**' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: '/images/logo/logo.svg',
        permanent: false,
      },
    ]
  },
}

export default nextConfig