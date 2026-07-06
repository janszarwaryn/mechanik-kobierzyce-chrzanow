<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>()
</script>

<template>
  <section
    class="border-b border-steel-200 bg-gradient-to-b from-steel-100 to-steel-50 dark:border-steel-800 dark:from-steel-900 dark:to-steel-950"
  >
    <div class="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20 lg:px-8">
      <Reveal>
        <h1
          class="font-display text-3xl font-bold tracking-tight text-steel-900 md:text-5xl dark:text-steel-50"
        >
          {{ title }}
        </h1>
        <p v-if="subtitle" class="mt-4 max-w-2xl text-lg text-steel-600 dark:text-steel-300">
          {{ subtitle }}
        </p>
      </Reveal>
    </div>
  </section>
</template>
