const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,

  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*/',
        destination: `https://backoffice.hufstreaming.site/:path*/`,
      },
    ];
  },
};

module.exports = withVanillaExtract(nextConfig);
