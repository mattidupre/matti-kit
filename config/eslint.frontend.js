module.exports = {
  extends: ['./eslint.base', 'prettier/react'],
  env: { browser: true },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
      },
    },
  ],
  plugins: ['react-hooks'],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: 'useDispatch',
      },
    ],
  },
};
