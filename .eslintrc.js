module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['jest'],
  root: true,
  rules: {},
  ignorePatterns: ['bin/www', 'public/**/*.js'],
};
