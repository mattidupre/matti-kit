const path = require('path');

module.exports = {
  extends: require.resolve('@matti-kit/config/eslint.frontend'),
  root: true,
  parserOptions: {
    project: path.join(__dirname, 'tsconfig.json'),
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: { project: path.join(__dirname, 'tsconfig.json') },
    },
  },
  plugins: ['@emotion/eslint-plugin'],
  rules: {
    '@emotion/syntax-preference': [2, 'string'],
  },
};
