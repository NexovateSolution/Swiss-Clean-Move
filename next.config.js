const withNextIntl = require('next-intl/plugin')(
  './src/i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'public.blob.vercel-storage.com'
      }
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Performance optimizations
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Route rewrites for missing static assets
  async rewrites() {
    return [
      // Ensure legacy references to transportation.jpg resolve to the existing PNG
      { source: '/images/transportation.jpg', destination: '/images/transportation.png' },
      { source: '/images/transportation.jpeg', destination: '/images/transportation.png' },
    ];
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  },

  webpack: (config, { isServer }) => {
    // Workaround for intermittent missing `.next/server/vendor-chunks/*` modules on Windows
    // (e.g. `Cannot find module './vendor-chunks/@formatjs.js'`) by avoiding server vendor chunk splitting.
    if (isServer) {
      config.optimization = config.optimization || {}
      config.optimization.splitChunks = false
    }

    return config
  },
}

module.exports = withNextIntl(nextConfig);
