const babel = require('@rollup/plugin-babel');
const babelPresetReact = require('@babel/preset-react');
const babelPresetTypescript = require('@babel/preset-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const dts = require('rollup-plugin-dts').default;
const path = require('path');

function createRollupConfig(options = {}) {
  const { input = 'src/index.ts', outputDir = 'dist', plugins = [] } = options;

  const packageJSON = require(path.join(process.cwd(), 'package.json'));
  const extensions = ['.js', '.jsx', '.ts', '.tsx'];

  function external(pkg) {
    const externals = Object.keys({ ...packageJSON.dependencies, ...packageJSON.peerDependencies });
    return externals.some(externalPkg => {
      return pkg.startsWith(externalPkg);
    });
  }

  function buildJS(format, input, output, additionalPlugins = []) {
    const isESM = format === 'esm';
    return {
      input,
      external,
      output: [
        {
          format,
          dir: output,
          entryFileNames: `[name].${isESM ? 'mjs' : 'js'}`,
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
      ],
      plugins: [
        ...additionalPlugins,
        resolve({ extensions }),
        isESM && commonjs(),
        babel({
          extensions,
          babelHelpers: 'bundled',
          presets: [[babelPresetReact, { runtime: 'automatic' }], babelPresetTypescript],
        }),
        ...plugins,
      ].filter(Boolean),
    };
  }

  function buildDTS(format, input, output) {
    const isESM = format === 'esm';
    return {
      input: input,
      output: [
        {
          format,
          dir: output,
          entryFileNames: `[name].${isESM ? 'd.mts' : 'd.ts'}`,
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
      ],
      plugins: [dts()],
    };
  }

  return [
    buildJS('cjs', input, `${outputDir}/cjs`),
    buildJS('esm', input, `${outputDir}/esm`),
    buildDTS('cjs', input, `${outputDir}/cjs`),
    buildDTS('esm', input, `${outputDir}/esm`),
  ];
}

module.exports = { createRollupConfig };
