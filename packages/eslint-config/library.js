const { resolve } = require('node:path');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@hcc/eslint-config/base.js'],
  env: {
    node: true,
  },
  ignorePatterns: ['dist/'],
};
