const babelMerge = require('babel-merge');

module.exports = babelMerge(require('@matti-kit/config/babel.frontend'), {
  presets: ['@emotion/babel-preset-css-prop'],
});
