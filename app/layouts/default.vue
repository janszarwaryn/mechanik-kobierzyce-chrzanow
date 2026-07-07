<script setup lang="ts">
import { services } from '~/data/services'
import { reviews } from '~/data/reviews'

// Site-wide AutoRepair / LocalBusiness (+ service OfferCatalog, aggregateRating
// and reviews), Organization and WebSite structured data on every page.
const { t, locale } = useI18n()
const offers = services.map((s) => t(`${s.key}.title`))
const reviewLd = reviews.map((r) => ({
  author: r.author,
  rating: r.rating,
  body: locale.value === 'en' ? r.text.en : r.text.pl,
}))
useLocalBusinessSchema(offers, t('brand.name'), reviewLd)
</script>

<template>
  <div class="flex min-h-[100dvh] flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
