const path = require('path');

module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'prettier',
  ],
  plugins: [
    'import',
    'simple-import-sort',
    'prettier',
    'jsx-a11y',
    '@tanstack/query',
  ],
  rules: {
    // react
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    // import
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling'],
          'index',
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
      },
    ],
    // prettier
    'prettier/prettier': 'warn',
    // rules
    'no-console': [
      'error',
      {
        allow: ['error', 'warn'],
      },
    ],
  },
  ignorePatterns: ['.next/*'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      version: 'detect',
    },
    // .yarn 경로 외부 의존성으로 인식시키는 옵션 (https://github.com/import-js/eslint-plugin-import#importexternal-module-folders)
    // 'import/external-module-folders': ['.yarn'],
  },
  overrides: [
    {
      files: '**/*.+(ts|tsx)',
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parserOptions: {
        project: [
          './tsconfig.base.json',
          './packages/**/tsconfig.json',
          './apps/**/tsconfig.json',
        ],
      },
    },
    {
      files: 'apps/spectator/**/*.+(js|jsx|ts|tsx)',
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/apps/spectator/tsconfig.json`),
          },
        },
      },
    },
    {
      files: ['apps/manager/**/*.+(js|jsx|ts|tsx)'],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/apps/manager/tsconfig.json`),
          },
        },
      },
    },
    {
      files: 'packages/components/**/*.+(js|jsx|ts|tsx)',
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(
              `${__dirname}/packages/components/tsconfig.json`,
            ),
          },
        },
      },
    },
    {
      files: 'packages/hooks/**/*.+(js|jsx|ts|tsx)',
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/packages/hooks/tsconfig.json`),
          },
        },
      },
    },
    {
      files: 'packages/utils/**/*.+(js|jsx|ts|tsx)',
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/packages/utils/tsconfig.json`),
          },
        },
      },
    },
  ],
};
