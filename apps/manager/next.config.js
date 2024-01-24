import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {};

export const transpilePackages = ['@hcc/ui'];
export default withVanillaExtract(nextConfig);
