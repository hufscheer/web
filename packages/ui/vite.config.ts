import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import pkg from './package.json' with { type: 'json' };

const external = Object.keys({
  ...pkg.dependencies,
  ...pkg.peerDependencies,
});

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin(), dts({ tsconfigPath: './tsconfig.json' })],
  build: {
    target: 'es2022',
    lib: {
      entry: [resolve(__dirname, 'src/index.ts'), resolve(__dirname, 'src/primitives.ts')],
      formats: ['es'],
    },
    rollupOptions: {
      external: (id) => external.some((dep) => id === dep || id.startsWith(`${dep}/`)),
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].mjs',
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.[0]?.endsWith('.css')) {
            return 'styles.css';
          }
          return '[name][extname]';
        },
      },
    },
  },
});
