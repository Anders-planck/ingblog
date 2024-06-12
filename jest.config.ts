export default {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|ts|tsx)?$': [
      'ts-jest',
      {
        useESM: true,
        babelConfig: true,
      },
    ],
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test-utils': '<rootDir>/test-utils',
    '^.+\\.svg$': 'jest-svg-transformer',
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    '^uuid$': 'uuid',
  },
  transformIgnorePatterns: ['/node_modules//.+.(js|jsx|ts|tsx)$'],
  verbose: true,
  coverageProvider: 'v8',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 50,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
};
