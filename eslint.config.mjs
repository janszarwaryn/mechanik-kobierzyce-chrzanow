// Flat config generated/extended via @nuxt/eslint.
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/multi-word-component-names': 'off',
    // Optional props intentionally have no default (undefined is meaningful).
    'vue/require-default-prop': 'off',
  },
}).append({
  ignores: [
    'CarService/**',
    'boilerplate-next-i18n/**',
    '.output/**',
    '.nuxt/**',
    'dist/**',
    'test-results/**',
    'playwright-report/**',
  ],
})
