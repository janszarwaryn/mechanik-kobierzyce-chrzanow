<script setup lang="ts">
// Eyebrow is optional and rationed (taste: max 1 per 3 sections). Stack title
// over description vertically (no split-header pattern).
withDefaults(
  defineProps<{ title: string; eyebrow?: string; desc?: string; center?: boolean }>(),
  { center: false },
)
</script>

<template>
  <div :class="['max-w-2xl', center ? 'mx-auto text-center' : '']">
    <p
      v-if="eyebrow"
      class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent-600 dark:text-accent-400"
    >
      {{ eyebrow }}
    </p>
    <h2
      class="font-display text-3xl font-bold tracking-tight text-steel-900 md:text-4xl dark:text-steel-50"
    >
      {{ title }}
    </h2>
    <p v-if="desc" class="mt-4 text-base leading-relaxed text-steel-600 dark:text-steel-400">
      {{ desc }}
    </p>
  </div>
</template>
