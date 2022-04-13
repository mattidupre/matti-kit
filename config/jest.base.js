module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '\\.[jt]sx?$': ['babel-jest', { configFile: './babel.config.js' }],
  },
  setupFilesAfterEnv: ['jest-extended/all'],
  snapshotSerializers: [],
};
