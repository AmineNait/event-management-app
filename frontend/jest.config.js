// jest.config.js
module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "jest-transform-stub",
  },
  transformIgnorePatterns: ["node_modules/(?!react-big-calendar)"],
};
