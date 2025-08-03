import esbuild from 'esbuild';
import pkg from './package.json' with { type: 'json' };

const sharedConfig = {
  entryPoints: ['./src/index.ts'],
  bundle: true,
  write: true,
  treeShaking: true,
  minify: true,
  sourcemap: false,
  target: ['es2020'],
  external: [
    'react',
    'react-dom',
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  jsx: 'automatic',
  jsxImportSource: 'react',
};

esbuild
  .build({
    ...sharedConfig,
    outfile: './lib/index.js',
    format: 'esm',
    platform: 'neutral',
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    ...sharedConfig,
    outfile: './lib/index.cjs',
    format: 'cjs',
    platform: 'neutral',
  })
  .catch(() => process.exit(1));
