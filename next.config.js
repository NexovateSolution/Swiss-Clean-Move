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
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
  },
  async rewrites() {
    return [
      // Ensure legacy references to transportation.jpg resolve to the existing PNG
      { source: '/images/transportation.jpg', destination: '/images/transportation.png' },
      { source: '/images/transportation.jpeg', destination: '/images/transportation.png' },
    ];
  },
  async redirects() {
    const legacyBielMappings = [
      { from: 'reinigung-biel', to: 'reinigung-biel-bienne' },
      { from: 'endreinigung-biel', to: 'umzugsreinigung-biel-bienne' },
      { from: 'umzugsreinigung-biel', to: 'umzugsreinigung-biel-bienne' },
      { from: 'umzug-biel', to: 'umzug-biel-bienne' },
      { from: 'reinigungsfirma-biel', to: 'reinigungsfirma-biel-bienne' },
      { from: 'umzugsfirma-biel', to: 'umzugsfirma-biel-bienne' },
      { from: 'unterhaltsreinigung-biel', to: 'unterhaltsreinigung-biel-bienne' },
      { from: 'baureinigung-biel', to: 'baureinigung-biel-bienne' },
      { from: 'bueroreinigung-biel', to: 'bueroreinigung-biel-bienne' },
      { from: 'entsorgung-biel', to: 'entsorgung-biel-bienne' },
      { from: 'facility-service-biel', to: 'facility-service-biel-bienne' },
      { from: 'fensterreinigung-biel', to: 'fensterreinigung-biel-bienne' },
      { from: 'gastronomie-reinigung-biel', to: 'gastronomie-reinigung-biel-bienne' },
      { from: 'haushaltshilfe-biel', to: 'haushaltshilfe-biel-bienne' },
      { from: 'hauswartung-biel', to: 'hauswartung-biel-bienne' },
      { from: 'transportfirma-biel', to: 'transportfirma-biel-bienne' },
    ];

    const redirectsList = [];

    for (const item of legacyBielMappings) {
      redirectsList.push({
        source: `/:locale/${item.from}`,
        destination: `/:locale/${item.to}`,
        permanent: true,
      });
      redirectsList.push({
        source: `/${item.from}`,
        destination: `/de/${item.to}`,
        permanent: true,
      });
    }

    return redirectsList;
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
