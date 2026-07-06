<script setup lang="ts">
import type { ProductItem } from '~/types/content'

const props = defineProps<{ product: ProductItem; specLabel: string }>()
const { t } = useI18n()
</script>

<template>
  <article
    class="group flex flex-col overflow-hidden rounded-3xl border border-steel-200 bg-steel-50 dark:border-steel-800 dark:bg-steel-900"
  >
    <div class="relative aspect-[4/3] overflow-hidden">
      <NuxtImg
        :src="product.image"
        :alt="product.imageAlt"
        class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        width="480"
        height="360"
        loading="lazy"
      />
      <span
        class="absolute left-3 top-3 rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-steel-950"
      >
        {{ specLabel }}: {{ t(`${product.key}.spec`) }}
      </span>
    </div>
    <div class="flex flex-1 flex-col p-5">
      <h3 class="font-display text-lg font-bold text-steel-900 dark:text-steel-50">
        {{ t(`${product.key}.title`) }}
      </h3>
      <p class="mt-2 text-sm leading-relaxed text-steel-600 dark:text-steel-400">
        {{ t(`${product.key}.desc`) }}
      </p>
    </div>
  </article>
</template>
