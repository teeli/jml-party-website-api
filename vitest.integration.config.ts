import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'integration',
    testTimeout: 30_000, // 30s as millis
    include: ['src/**/*.integration-test.ts'],
  },
})
