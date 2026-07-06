<script setup lang="ts">
import type { ProductItem } from '~/types/content'

defineProps<{ items: ProductItem[]; specLabel: string }>()
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <Reveal v-for="(p, i) in items" :key="p.id" :delay="i * 70" class="h-full">
      <ProductCard :product="p" :spec-label="specLabel" class="h-full" />
    </Reveal>
  </div>
</template>
