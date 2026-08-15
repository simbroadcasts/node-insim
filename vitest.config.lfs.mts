import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: 'lfs-test',
    setupFiles: ['testSetup.ts'],
    fileParallelism: false,
    sequence: {
      concurrent: false,
    },
    coverage: {
      include: ['**/*.ts'],
      reporter: ['json-summary'],
    },
  },
});
