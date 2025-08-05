import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import pkg from './package.json' with { type: 'json' };

function generateIndexFiles() {
  const componentsDir = './src/components';
  const subdirs = ['brand', 'semantic'];

  subdirs.forEach(subdir => {
    const subdirPath = path.join(componentsDir, subdir);
    const indexPath = path.join(subdirPath, 'index.ts');

    if (!fs.existsSync(subdirPath)) {
      console.log(`Directory ${subdirPath} does not exist, skipping...`);
      return;
    }

    const files = fs
      .readdirSync(subdirPath)
      .filter(file => file.endsWith('.tsx'))
      .map(file => file.replace('.tsx', ''));

    if (files.length === 0) {
      console.log(`No .tsx files found in ${subdirPath}`);
      return;
    }

    const exportStatements = files.map(file => `export * from './${file}';`).join('\n');
    fs.writeFileSync(indexPath, exportStatements);

    console.log(`Generated ${indexPath} with ${files.length} exports:`, files);
  });
}

generateIndexFiles();

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
    outfile: './dist/index.js',
    format: 'esm',
    platform: 'neutral',
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    ...sharedConfig,
    outfile: './dist/index.cjs',
    format: 'cjs',
    platform: 'neutral',
  })
  .catch(() => process.exit(1));
