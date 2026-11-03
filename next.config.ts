import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'storage.owndays.com', pathname: '/storage/**' }],
    // AVIF first, WebP as fallback. The hero's baked-in film grain compresses badly as WebP:
    // AVIF at the same quality is ~50% smaller (desktop hero 204 KB → 100 KB) with the grain intact.
    formats: ['image/avif', 'image/webp'],
    // Product photos on storage.owndays.com rarely change; keep optimized copies for 31 days
    // instead of the 4-hour default so they aren't re-encoded (counts against Vercel's image quota).
    minimumCacheTTL: 2678400,
  },
  // `import Icon from './x.svg'` gives a React component (inline <svg>) instead of an image URL
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              svgProps: { 'aria-hidden': 'true' }, // all icons are decorative
              svgoConfig: {
                plugins: [
                  // keep viewBox so width/height props scale the icon; prefix ids so clipPaths can't clash
                  { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
                  'prefixIds',
                ],
              },
            },
          },
        ],
        as: '*.js',
      },
    },
  },
  // /public files are served with max-age=0 by default; font files never change, so cache them for a year
  async headers() {
    return [
      {
        source: '/fonts/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
