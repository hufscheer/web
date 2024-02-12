const { readdirSync, writeFileSync } = require('fs');
const { resolve } = require('path');

function toPascalCase(str) {
  return str
    .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, (_, c) => c.toUpperCase());
}

const svgDir = resolve(__dirname, '../svg');
const iconFileNames = readdirSync(svgDir);
const iconNames = iconFileNames.map(iconFileName => {
  const iconName = iconFileName.replace('.svg', '');
  const iconModuleName = `${toPascalCase(iconName)}Icon`;

  return `export { ReactComponent as ${iconModuleName} } from './svg/${iconFileName}';`;
});

writeFileSync(resolve(__dirname, '../../src/index.ts'), iconNames.join('\n'));
