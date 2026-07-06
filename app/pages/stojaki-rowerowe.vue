<script setup lang="ts">
import { stands } from '~/data/products'
import { site } from '~/data/site'

const { t } = useI18n()
useSiteMeta('stands', '/img/stojak_1_1.jpg')

useProductSchema(
  stands.items.map((p) => ({
    name: t(`${p.key}.title`),
    description: t(`${p.key}.desc`),
    image: `${site.url}${p.image}`,
    brand: site.legalName,
  })),
)
</script>

<template>
  <div>
    <PageHeader :title="t('stands.title')" :subtitle="t('stands.subtitle')" />
    <section class="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
      <ProductGrid :items="stands.items" :spec-label="t('stands.specLabel')" />
    </section>
  </div>
</template>
