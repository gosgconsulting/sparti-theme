import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: [
      'src/**/*.test.ts',
      'server/tests/**/*.test.js',
      'server/tests/**/*.test.ts',
    ],
    exclude: [
      'node_modules',
      'dist',
      'server/tests/authService.test.js',
      'server/tests/repositories.test.js',
    ],
    testTimeout: 10000,
    hookTimeout: 10000,
    // For React component tests, use jsdom environment
    // Uncomment and install @testing-library/react and jsdom to enable:
    // environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '~': resolve(__dirname, './'),
    },
  },
});
