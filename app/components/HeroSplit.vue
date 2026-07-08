<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="relative overflow-hidden">
    <!-- soft steel gradient wash, single theme-safe accent glow -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-steel-100 to-steel-50 dark:from-steel-900 dark:to-steel-950"
    />
    <div
      class="mx-auto grid max-w-7xl items-center gap-8 px-4 pt-10 pb-12 sm:gap-10 sm:pt-16 sm:pb-16 md:px-6 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pt-24"
    >
      <div>
        <p
          class="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-500/40 bg-accent-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent-700 dark:text-accent-300"
        >
          <AppIcon name="PhMapPin" :size="14" />
          {{ t('home.hero.eyebrow') }}
        </p>
        <h1
          class="font-display text-2xl font-bold leading-[1.1] tracking-tight text-balance text-steel-900 sm:text-3xl md:text-5xl lg:text-6xl dark:text-steel-50"
        >
          {{ t('home.hero.title') }}
        </h1>
        <p
          class="mt-4 max-w-xl text-sm leading-relaxed text-steel-600 sm:mt-5 sm:text-base md:text-lg dark:text-steel-300"
        >
          {{ t('home.hero.subtitle') }}
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <BaseButton :to="localePath('/kontakt')">
            {{ t('cta.book') }}
            <AppIcon name="PhArrowRight" :size="18" />
          </BaseButton>
          <BaseButton :to="localePath('/uslugi')" variant="secondary">
            {{ t('cta.offer') }}
          </BaseButton>
        </div>
      </div>

      <div class="relative">
        <div
          class="absolute -inset-4 -z-10 rounded-[2rem] bg-accent-500/15 blur-2xl dark:bg-accent-500/10"
        />
        <NuxtImg
          src="/img/about.jpg"
          :alt="t('home.hero.imageAlt')"
          class="aspect-[4/3] w-full rounded-3xl bg-steel-100 object-cover shadow-xl shadow-steel-900/10 ring-1 ring-steel-200/60 dark:ring-steel-800"
          width="720"
          height="540"
          loading="eager"
          :placeholder="[40, 30, 50, 4]"
        />
      </div>
    </div>
  </section>
</template>
