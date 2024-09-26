import { defineConfig } from 'rollup';
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import { visualizer } from 'rollup-plugin-visualizer';
import { readdirSync } from 'fs';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default defineConfig({
  input: 'src/games.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
  },
  external: 'react',
  plugins: [
    PeerDepsExternalPlugin(),
    resolve({ extensions }),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      presets: [
        '@babel/env',
        ['@babel/react', { runtime: 'automatic' }],
        '@babel/typescript',
      ],
      plugins: ['@babel/plugin-transform-runtime'],
      extensions,
    }),
    url(),
    svgr({ icon: true }),
    visualizer({
      filename: 'dist/stats.html',
      brotliSize: true,
      open: true,
    }),
  ],
});
