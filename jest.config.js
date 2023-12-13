module.exports = {
    preset: 'jest-puppeteer',
    testMatch: ['**/tests/**/*.test.ts'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
  };

