import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import pkg from './package.json' with { type: 'json' };

function generateIndexFiles() {
  const componentsDir = './src/components';

  if (!fs.existsSync(componentsDir)) {
    console.log(`Directory ${componentsDir} does not exist, skipping...`);
    return;
  }

  const subdirs = fs
    .readdirSync(componentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  if (subdirs.length === 0) {
    console.log(`No subdirectories found in ${componentsDir}`);
    return;
  }

  subdirs.forEach(subdir => {
    const subdirPath = path.join(componentsDir, subdir);
    const indexPath = path.join(subdirPath, 'index.ts');

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

  const srcIndexPath = './src/index.ts';
  const srcIndexExports = subdirs
    .map(subdir => `export * from './components/${subdir}';`)
    .join('\n');
  fs.writeFileSync(srcIndexPath, srcIndexExports);

  console.log(`Generated ${srcIndexPath} with exports from:`, subdirs);
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
