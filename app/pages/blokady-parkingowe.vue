<script setup lang="ts">
import { blocks } from '~/data/products'
import { site } from '~/data/site'

const { t } = useI18n()
useSiteMeta('blocks', '/img/blokada_1_1.jpg')

useProductSchema(
  blocks.items.map((p) => ({
    name: t(`${p.key}.title`),
    description: t(`${p.key}.desc`),
    image: `${site.url}${p.image}`,
    brand: site.legalName,
  })),
)
</script>

<template>
  <div>
    <PageHeader :title="t('blocks.title')" :subtitle="t('blocks.subtitle')" />
    <section class="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
      <ProductGrid :items="blocks.items" :spec-label="t('blocks.specLabel')" />
    </section>
  </div>
</template>
