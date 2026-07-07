<script setup lang="ts">
import type { Review } from '~/types/content'

const props = defineProps<{ review: Review }>()
const { t, locale } = useI18n()

const text = computed(() =>
  locale.value === 'en' ? props.review.text.en : props.review.text.pl,
)

// Render 5 slots: full / half / empty based on the rating.
const stars = computed(() =>
  Array.from({ length: 5 }, (_, i) => {
    const n = i + 1
    if (props.review.rating >= n) return 'full'
    if (props.review.rating >= n - 0.5) return 'half'
    return 'empty'
  }),
)

const ratingLabel = computed(() =>
  Number.isInteger(props.review.rating)
    ? String(props.review.rating)
    : props.review.rating.toString().replace('.', locale.value === 'en' ? '.' : ','),
)
</script>

<template>
  <figure
    class="flex h-full w-72 shrink-0 flex-col rounded-3xl border border-steel-200 bg-steel-50 p-6 sm:w-80"
  >
    <div class="flex items-center gap-2">
      <div class="flex gap-0.5 text-accent-500" :aria-label="`${ratingLabel}/5`">
        <AppIcon
          v-for="(s, i) in stars"
          :key="i"
          :name="s === 'half' ? 'PhStarHalf' : 'PhStar'"
          :size="16"
          :weight="s === 'empty' ? 'regular' : 'fill'"
          :class="s === 'empty' ? 'text-steel-300' : ''"
        />
      </div>
      <span class="text-xs font-medium text-steel-500">{{ ratingLabel }}</span>
    </div>
    <blockquote class="mt-4 flex-1 text-steel-700">
      {{ text }}
    </blockquote>
    <figcaption class="mt-5">
      <p class="font-display font-semibold text-steel-900">{{ review.author }}</p>
      <p class="flex items-center gap-1 text-sm text-steel-500">
        <AppIcon name="PhGoogleLogo" :size="14" />
        {{ t('home.reviews.source') }}
      </p>
    </figcaption>
  </figure>
</template>
