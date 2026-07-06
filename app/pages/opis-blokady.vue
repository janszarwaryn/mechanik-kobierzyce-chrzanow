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
            class="aspect-[4/3] w-full rounded-3xl object-cover ring-1 ring-steel-200/60 dark:ring-steel-800"
            width="520"
            height="390"
            loading="lazy"
          />
          <div class="rounded-2xl border border-steel-200 bg-steel-50 p-5 dark:border-steel-800 dark:bg-steel-900">
            <h2 class="font-display text-sm font-semibold uppercase tracking-wide text-steel-500">
              {{ t('about.keywordsTitle') }}
            </h2>
            <p class="mt-2 text-sm text-steel-600 dark:text-steel-400">{{ t('about.keywords') }}</p>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
