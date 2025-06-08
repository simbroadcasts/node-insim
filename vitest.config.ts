import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: 'src',
    coverage: {
      include: ['src/**/*.ts'],
      reporter: ['json-summary'],
    },
  },
});
