const babelMerge = require('babel-merge');
const baseConfig = require('./babel.base');

module.exports = babelMerge(baseConfig, {
  presets: [
    [
      '@babel/preset-typescript',
      {
        isTSX: true,
        allExtensions: true,
        // onlyRemoveTypeImports: true, // TODO: Enable?
      },
    ],
    ['@babel/preset-react', {}],
    [
      '@babel/env',
      {
        targets: ['>0.25%', 'not ie 11', 'not op_mini all'],
        useBuiltIns: 'usage',
        corejs: '3',
      },
    ],
    ['@emotion/babel-preset-css-prop', {}],
  ],
  plugins: [
    '@babel/plugin-transform-react-display-name',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
  ],
});
