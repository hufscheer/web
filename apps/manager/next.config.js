const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
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
        destination: `https://api.hufstreaming.site/:path*`,
      },
    ];
  },
};

module.exports = withVanillaExtract(nextConfig);
