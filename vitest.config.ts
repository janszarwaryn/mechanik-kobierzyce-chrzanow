import { defineVitestConfig } from '@nuxt/test-utils/config'

// Default env is happy-dom for fast pure-unit tests (data, i18n parity,
// composable validation). Tests needing the Nuxt runtime opt in per file with
// a `// @vitest-environment nuxt` docblock.
export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['tests/**/*.{test,spec}.ts'],
    exclude: ['tests/e2e/**', 'node_modules/**'],
  },
})
