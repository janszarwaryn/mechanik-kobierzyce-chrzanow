<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="bg-steel-900 dark:bg-steel-900">
    <div
      class="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-[auto_1fr] md:gap-12 md:px-6 md:py-20 lg:px-8"
    >
      <Reveal>
        <div class="flex items-baseline gap-2">
          <span class="font-display text-6xl font-bold text-accent-500 md:text-7xl">
            {{ t('home.experience.value') }}
          </span>
          <span class="max-w-24 text-sm font-medium uppercase tracking-wide text-steel-400">
            {{ t('home.experience.label') }}
          </span>
        </div>
      </Reveal>
      <Reveal :delay="120">
        <div>
          <h2 class="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
            {{ t('home.experience.title') }}
          </h2>
          <p class="mt-3 max-w-2xl text-steel-300">
            {{ t('home.experience.desc') }}
          </p>
        </div>
      </Reveal>
    </div>
  </section>
</template>
