<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const other = computed(() =>
  (locales.value as { code: 'pl' | 'en' }[]).find((l) => l.code !== locale.value),
)
</script>

<template>
  <NuxtLink
    v-if="other"
    :to="switchLocalePath(other.code)"
    class="inline-flex items-center rounded-full px-3 py-2 text-sm font-medium uppercase tracking-wide text-steel-600 transition-colors hover:bg-steel-100 hover:text-steel-900 dark:text-steel-300 dark:hover:bg-steel-800 dark:hover:text-steel-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
    :aria-label="`Switch language to ${other.code.toUpperCase()}`"
  >
    {{ other.code }}
  </NuxtLink>
</template>
