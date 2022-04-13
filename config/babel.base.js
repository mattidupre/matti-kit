const path = require('path');
const { WORKSPACES, ROOT } = require('./paths');

// TODO: Convert to an array so this will work in Windows.

const workspacesJoined = Object.keys(WORKSPACES)
  .map((w) => `${w}/`)
  .join('|');
const ignoreRegex = [new RegExp(`/node_modules/(?!${workspacesJoined})`)];

module.exports = {
  babelrc: false,
  ignore: ignoreRegex,
  // exclude: ignoreRegex,
  plugins: ['babel-plugin-const-enum'],
  env: {
    production: {
      sourceMaps: false,
    },
    development: {
      sourceMaps: true,
    },
  },
  overrides: Object.values(WORKSPACES).map((w) => ({
    test: path.join(ROOT, w, '**/*'),
    // test: new RegExp(`/${w}/`),
    plugins: [
      [
        'module-resolver',
        {
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json',
            '.mjs',
            '.es6',
            '.es',
          ],
          alias: {
            '~': ([, name]) => path.join(ROOT, w, 'src', name),
          },
        },
      ],
    ],
  })),
};
