const createVanillaExtractPlugin =
  require('@vanilla-extract/next-plugin').createVanillaExtractPlugin;

const withVanillaExtract = createVanillaExtractPlugin();

const transpilePackages = ['@hcc/ui'];

const nextConfig = {};
module.exports = withVanillaExtract(nextConfig);
