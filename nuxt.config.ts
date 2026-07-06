import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
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
    bundle: { optimizeTranslationDirective: false },
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

  app: {
    head: {
      htmlAttrs: { lang: 'pl' },
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },
})
