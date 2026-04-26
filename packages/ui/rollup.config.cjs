const { createUIRollupConfig } = require('@hcc/rollup-config/ui');
const { vanillaExtractPlugin } = require('@vanilla-extract/rollup-plugin');

module.exports = createUIRollupConfig({
  plugins: [vanillaExtractPlugin()],
});
