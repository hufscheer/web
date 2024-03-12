/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@hcc/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['next.config.js', 'postcss.config.js', '_redirects'],
  parserOptions: {
    project: true,
  },
};
