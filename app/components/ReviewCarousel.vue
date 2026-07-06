<script setup lang="ts">
import { reviews } from '~/data/reviews'

const { t } = useI18n()
</script>

<template>
  <section class="bg-steel-100 py-16 md:py-24 dark:bg-steel-900/40">
    <div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
      <Reveal>
        <SectionHeading :title="t('home.reviews.title')" />
      </Reveal>
    </div>
    <div
      class="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden"
    >
      <div v-for="r in reviews" :key="r.id" class="snap-start first:pl-0">
        <ReviewCard :review="r" />
      </div>
    </div>
  </section>
</template>
