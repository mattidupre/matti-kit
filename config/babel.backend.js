const babelMerge = require('babel-merge');
const babelBaseConfig = require('./babel.base');

module.exports = (api, ...args) => {
  const config = babelMerge(babelBaseConfig, {
    plugins: ['@babel/plugin-transform-modules-commonjs'],
    presets: [
      [
        '@babel/preset-typescript',
        {
          // onlyRemoveTypeImports: true, // TODO: Enable?
        },
      ],
      [
        '@babel/env',
        {
          targets: { node: 'current' },
          useBuiltIns: 'usage',
          corejs: '3',
        },
      ],
    ],
  });
  return config;
};
