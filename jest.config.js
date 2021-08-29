module.exports = {
  verbose: true,
  roots: ["<rootDir>/src"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.js"],
  testMatch: ["<rootDir>/src/**/__tests__/**/*.{js,jsx}", "<rootDir>/src/**/*.{spec,test}.{js,jsx}"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest"
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$"],
  moduleFileExtensions: ["web.js", "js", "web.ts", "ts", "web.tsx", "tsx", "json", "web.jsx", "jsx", "node"],
  resetMocks: true
};
