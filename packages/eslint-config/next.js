const { resolve } = require('node:path');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    '@hcc/eslint-config/base.js',
    'plugin:jsx-a11y/recommended',
  ],
  env: {
    node: true,
    browser: true,
  },
  plugins: ['jsx-a11y'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // react
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.next/*',
    '**/.storybook/*',
  ],
};
