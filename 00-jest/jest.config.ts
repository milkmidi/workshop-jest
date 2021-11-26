// https://jestjs.io/docs/en/configuration.html
import type { Config } from '@jest/types';

const baseJestConfig: Config.InitialOptions = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['assets/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  // setupFiles: ['react-app-polyfill/jsdom'],
  // setupFilesAfterEnv: [],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internal/__mocks__/cssTransform.js',
    '\\.(css|less|scss)$': '<rootDir>/internal/__mocks__/cssTransform.js',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jest-environment-jsdom-global',
  watchPlugins: [
    // 'jest-watch-typeahead/filename',
    // 'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
};

export default baseJestConfig;
