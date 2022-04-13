module.exports = {
  extends: ['airbnb-typescript', 'prettier', 'prettier/@typescript-eslint'],
  env: {},
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      extends: ['plugin:jest/recommended'],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {},
  plugins: ['prettier', '@typescript-eslint', 'jest', 'filenames'],
  rules: {
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'prefer-destructuring': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: ['**/*.test.ts', '**/*.test.tsx'],
        optionalDependencies: false,
        peerDependencies: true,
      },
    ],
    'filenames/match-exported': [2, null, null, true],
  },
  settings: {
    'import/resolver': {},
  },
  ignorePatterns: ['**/*.js'],
};
