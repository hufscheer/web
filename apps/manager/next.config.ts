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
        destination: `https://hufscheer-images.s3.ap-northeast-2.amazonaws.com/:path*`,
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

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,

  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
});
