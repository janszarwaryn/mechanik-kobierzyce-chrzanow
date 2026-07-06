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
    // Pre-bundle so dev does not re-optimize mid-session (avoids full reloads).
    optimizeDeps: {
      include: ['@phosphor-icons/vue'],
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
    head: {
      htmlAttrs: { lang: 'pl' },
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      script: [
        {
          // No-flash theme init: set data-theme before first paint.
          innerHTML:
            "(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();",
          tagPosition: 'head',
        },
      ],
    },
  },
})
