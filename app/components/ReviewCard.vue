<script setup lang="ts">
import type { Review } from '~/types/content'

const props = defineProps<{ review: Review }>()
const { locale } = useI18n()

const text = computed(() =>
  locale.value === 'en' ? props.review.text.en : props.review.text.pl,
)
</script>

<template>
  <figure
    class="flex h-full w-72 shrink-0 flex-col rounded-3xl border border-steel-200 bg-steel-50 p-6 sm:w-80 dark:border-steel-800 dark:bg-steel-900"
  >
    <div class="flex gap-0.5 text-accent-500" :aria-label="`${review.rating}/5`">
      <AppIcon v-for="n in review.rating" :key="n" name="PhStar" :size="16" weight="fill" />
    </div>
    <blockquote class="mt-4 flex-1 text-steel-700 dark:text-steel-200">
      {{ text }}
    </blockquote>
    <figcaption class="mt-5">
      <p class="font-display font-semibold text-steel-900 dark:text-steel-50">
        {{ review.author }}
      </p>
      <p class="text-sm text-steel-500">{{ review.role }}</p>
    </figcaption>
  </figure>
</template>
