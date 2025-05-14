import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'unit',
    testTimeout: 30_000, // 30s as millis
    include: ['src/**/*.test.ts'],
  },
})
