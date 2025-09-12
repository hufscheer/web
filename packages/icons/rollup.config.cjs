const babel = require("@rollup/plugin-babel");
const babelPresetReact = require("@babel/preset-react");
const babelPresetTypescript = require("@babel/preset-typescript");
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const dts = require("rollup-plugin-dts").default;
const path = require("path");

const packageJSON = require(path.join(process.cwd(), "package.json"));

const extensions = [".js", ".jsx", ".ts", ".tsx"];

function external(pkg) {
  const externals = Object.keys({ ...packageJSON.dependencies, ...packageJSON.peerDependencies });
  return externals.some((externalPkg) => {
    return pkg.startsWith(externalPkg);
  });
}

function buildJS(format, input, output) {
  const isESM = format === "esm";
  return {
    input,
    external,
    output: [
      {
        format,
        dir: output,
        entryFileNames: `[name].${isESM ? "mjs": "js"}`,
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    ],
    plugins: [
      resolve({ extensions }),
      isESM && commonjs(),
      babel({
        extensions,
        babelHelpers: "bundled",
        presets: [
          [babelPresetReact, { runtime: "automatic" }],
          babelPresetTypescript
        ],
      }),
    ].filter(Boolean),
  };
}

function buildDTS(format, input, output) {
  const isESM = format === "esm";
  return {
    input: input,
    output: [
      {
        format,
        dir: output,
        entryFileNames: `[name].${isESM ? "d.mts" : "d.ts"}`,
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
    plugins: [dts()],
  };
}

module.exports = [
  buildJS("cjs", "src/index.ts", "dist/cjs"),
  buildJS("esm", "src/index.ts", "dist/esm"),
  buildDTS("cjs", "src/index.ts", "dist/cjs"),
  buildDTS("esm", "src/index.ts", "dist/esm"),
];
