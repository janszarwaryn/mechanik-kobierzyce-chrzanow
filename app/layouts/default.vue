<script setup lang="ts">
import { services } from '~/data/services'

// Site-wide AutoRepair / LocalBusiness (+ service OfferCatalog), Organization
// and WebSite structured data on every page.
const { t } = useI18n()
const offers = services.map((s) => t(`${s.key}.title`))
useLocalBusinessSchema(offers, t('brand.name'))
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
