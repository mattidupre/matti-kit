/**
 * This is intended to only target JS config files.
 */

module.exports = {
  overrides: [
    {
      files: ['**/*.js'],
      extends: ['airbnb'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
