import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@vueuse/motion/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
  ],

  css: [
    '@fontsource/space-grotesk/400.css',
    '@fontsource/space-grotesk/500.css',
    '@fontsource/space-grotesk/700.css',
    '@fontsource/inter-tight/400.css',
    '@fontsource/inter-tight/500.css',
    '@fontsource/inter-tight/600.css',
    '~/assets/css/main.css',
  ],

  vite: {
    plugins: [tailwindcss()],
    // Pre-bundle heavy deps once at dev startup so Vite does not re-optimize
    // mid-session (which triggers slow full page reloads).
    optimizeDeps: {
      include: [
        '@phosphor-icons/vue',
        '@vueuse/core',
        '@vueuse/motion',
        'vue-i18n',
      ],
    },
    // Warm up the most-used entry modules so the first navigation compiles fast.
    server: {
      warmup: {
        clientFiles: ['./app/app.vue', './app/layouts/default.vue', './app/pages/index.vue'],
      },
    },
  },

  // Local business site. Domain used for canonical/sitemap/OG/hreflang.
  site: {
    url: 'https://mechanik-kobierzyce.pl',
    name: 'Mechanik Kobierzyce',
    defaultLocale: 'pl',
  },

  i18n: {
    locales: [
      { code: 'pl', language: 'pl-PL', name: 'Polski', file: 'pl.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'pl',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    baseUrl: 'https://mechanik-kobierzyce.pl',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
    },
  },

  image: {
    quality: 78,
    format: ['webp', 'jpg'],
  },

  // We supply our own og:image per page; skip the runtime OG image generator
  // (satori/chromium) which needs a browser and adds no value here.
  ogImage: { enabled: false },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'pl' },
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/favicon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      meta: [
        { name: 'theme-color', content: '#f59e0b' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
  },
})
