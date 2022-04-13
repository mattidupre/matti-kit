const baseConfig = require('./jest.base');

baseConfig.testEnvironment = 'jsdom';

baseConfig.snapshotSerializers = [
  ...baseConfig.snapshotSerializers,
  '@emotion/jest/serializer',
];

module.exports = baseConfig;
