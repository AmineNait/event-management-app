module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    // transform: {
    //   '^.+\\.tsx?$': 'ts-jest',
    // },
    // testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    // moduleNameMapper: {
    //   '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // },
  };
  