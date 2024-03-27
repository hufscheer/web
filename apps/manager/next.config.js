const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,

  experimental: {
    optimizePackageImports: [
      '@mantine/core',
      '@mantine/hooks',
      '@mantine/dates',
      '@mantine/dropzone',
      '@mantine/form',
    ],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hufscheer-server.s3.ap-northeast-2.amazonaws.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/games/',
        destination: `https://api.hufstreaming.site/games`,
      },
      {
        source: '/api/games/:path*/timeline/',
        destination: `https://api.hufstreaming.site/games/:path*/timeline`,
      },
      {
        source: '/api/:path*/',
        destination: `https://backoffice.hufstreaming.site/:path*/`,
      },
    ];
  },
};

module.exports = withVanillaExtract(nextConfig);
