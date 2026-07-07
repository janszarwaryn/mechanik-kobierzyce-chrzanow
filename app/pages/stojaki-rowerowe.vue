<script setup lang="ts">
import { stands } from '~/data/products'
import { site } from '~/data/site'

const { t } = useI18n()
useSiteMeta('stands', '/img/stojak_1_1.jpg')
usePageBreadcrumb(t('stands.title'))

useProductSchema(
  stands.items.map((p) => ({
    name: t(`${p.key}.title`),
    description: t(`${p.key}.desc`),
    image: `${site.url}${p.image}`,
    brand: site.legalName,
  })),
)

const gallery = [
  '/img/stojak_1_2.jpg',
  '/img/stojak_2_2.jpg',
  '/img/stojak_3_2.jpg',
  '/img/stojak_3_3.jpg',
]
</script>

<template>
  <div>
    <PageHeader :title="t('stands.title')" :subtitle="t('stands.subtitle')" />

    <!-- SEO lead -->
    <section class="mx-auto max-w-3xl px-4 pt-12 md:px-6 lg:px-8">
      <Reveal>
        <p class="text-lg leading-relaxed text-steel-700">{{ t('stands.lead') }}</p>
      </Reveal>
    </section>

    <!-- product grid -->
    <section class="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
      <ProductGrid :items="stands.items" :spec-label="t('stands.specLabel')" />
    </section>

    <!-- who for + call CTA -->
    <section class="border-t border-steel-200 bg-steel-100">
      <div class="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20 lg:px-8">
        <Reveal>
          <div>
            <SectionHeading :title="t('stands.useTitle')" :desc="t('stands.useBody')" />
            <BaseButton :href="`tel:${site.phones[0]}`" class="mt-6">
              <AppIcon name="PhPhone" :size="18" />
              {{ t('cta.call') }} {{ site.phones[0] }}
            </BaseButton>
          </div>
        </Reveal>
        <Reveal :delay="100">
          <NuxtImg
            src="/img/stojak_1_1.jpg"
            :alt="t('stands.items.arc.title')"
            class="aspect-[4/3] w-full rounded-3xl bg-steel-200 object-cover ring-1 ring-steel-200/60"
            width="640"
            height="480"
            loading="lazy"
            :placeholder="[40, 30, 50, 4]"
          />
        </Reveal>
      </div>
    </section>

    <!-- gallery -->
    <section class="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
      <Reveal>
        <SectionHeading :title="t('stands.galleryTitle')" />
      </Reveal>
      <div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Reveal v-for="(img, i) in gallery" :key="img" :delay="i * 60">
          <NuxtImg
            :src="img"
            :alt="`${t('stands.galleryTitle')} ${i + 1}`"
            class="aspect-square w-full rounded-2xl bg-steel-100 object-cover ring-1 ring-steel-200/60"
            width="360"
            height="360"
            loading="lazy"
            :placeholder="[30, 30, 50, 4]"
          />
        </Reveal>
      </div>
    </section>
  </div>
</template>
