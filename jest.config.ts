module.exports = {
  clearMocks: true,
  restoreMocks: true,
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'node'],
  testEnvironment: 'node',
  testMatch: [
    '**/test/**/__tests__/**/*.[jt]s?(x)',
    '**/test/**/?(*.)+(spec|test).[tj]s?(x)',
  ],
  transform: {
    '\\.(ts)$': ['ts-jest', { tsconfig: './tsconfig.json' }],
  },
};

export {};
