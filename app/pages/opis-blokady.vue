<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
useSiteMeta('about', '/img/blokada_2_1.jpg')
usePageBreadcrumb(t('about.title'))
</script>

<template>
  <div>
    <PageHeader :title="t('about.title')" :subtitle="t('about.subtitle')" />

    <section class="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <article class="prose-steel max-w-none space-y-5 text-lg leading-relaxed text-steel-700 dark:text-steel-300">
          <p>{{ t('about.body1') }}</p>
          <p>{{ t('about.body2') }}</p>
          <p>{{ t('about.body3') }}</p>
          <p>{{ t('about.body4') }}</p>
          <div class="flex flex-wrap gap-3 pt-2">
            <BaseButton :to="localePath('/blokady-parkingowe')">
              {{ t('nav.blocks') }}
              <AppIcon name="PhArrowRight" :size="18" />
            </BaseButton>
            <BaseButton :to="localePath('/kontakt')" variant="secondary">
              {{ t('cta.contact') }}
            </BaseButton>
          </div>
        </article>

        <aside class="space-y-6">
          <NuxtImg
            src="/img/blokada_2_1.jpg"
            :alt="t('blocks.items.m.title')"
            class="aspect-[4/3] w-full rounded-3xl bg-steel-100 object-cover ring-1 ring-steel-200/60 dark:ring-steel-800"
            width="520"
            height="390"
            loading="lazy"
            :placeholder="[40, 30, 50, 4]"
          />
          <div class="rounded-2xl border border-steel-200 bg-steel-50 p-5 dark:border-steel-800 dark:bg-steel-900">
            <h2 class="font-display text-sm font-semibold uppercase tracking-wide text-steel-500">
              {{ t('about.keywordsTitle') }}
            </h2>
            <p class="mt-2 text-sm text-steel-600 dark:text-steel-400">{{ t('about.keywords') }}</p>
          </div>
        </aside>
      </div>

      <!-- blocks gallery -->
      <div class="mt-16">
        <Reveal>
          <SectionHeading :title="t('about.galleryTitle')" />
        </Reveal>
        <div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Reveal
            v-for="(img, i) in ['/img/blokada_1_2.jpg', '/img/blokada_1_3.jpg', '/img/blokada_2_2.jpg', '/img/blokada_3_2.jpg']"
            :key="img"
            :delay="i * 60"
          >
            <NuxtImg
              :src="img"
              :alt="`${t('about.galleryTitle')} ${i + 1}`"
              class="aspect-square w-full rounded-2xl bg-steel-100 object-cover ring-1 ring-steel-200/60"
              width="360"
              height="360"
              loading="lazy"
              :placeholder="[30, 30, 50, 4]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  </div>
</template>
