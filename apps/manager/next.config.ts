import type { NextConfig } from 'next';

const apiBaseUrl = process.env.API_BASE_URL ?? '';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
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
        hostname: 'images.hufscheer.com',
      },
      {
        protocol: 'https',
        hostname: 'hufstreaming.s3.ap-northeast-2.amazonaws.com',
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
        destination: 'https://hufscheer-image.s3.ap-northeast-2.amazonaws.com/:path*',
      },
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
