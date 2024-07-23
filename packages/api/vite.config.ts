import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [
      react(),
      dts({
        tsconfigPath: './tsconfig.json',
        outDir: 'dist',
        entryRoot: 'src',
        exclude: ['vite.config.ts'],
      }),
    ],
    build: {
      lib: {
        entry: 'src/index.ts',
        name: '@hcc/api',
        formats: ['es'],
        fileName: () => 'index.js',
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
  };
});
