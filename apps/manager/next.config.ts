import { withSentryConfig } from '@sentry/nextjs';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: {},

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.hufstreaming.site',
      },
      {
        protocol: 'https',
        hostname: 'images.hufscheer.com',
      },
      {
        protocol: 'https',
        hostname: 'hufstreaming.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'hufscheer-server.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'hufscheer-images.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/images/:path*',
        destination: `https://hufscheer-image.s3.ap-northeast-2.amazonaws.com/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `https://api.hufscheer.com/:path*`,
      },
    ];
  },
};

export default withSentryConfig(withVanillaExtract(nextConfig), {
  org: 'hufscheer',
  project: 'manager',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: { enabled: true },
  tunnelRoute: '/monitoring',
  disableLogger: true,
  automaticVercelMonitors: true,
  sourcemaps: { deleteSourcemapsAfterUpload: true },
});
