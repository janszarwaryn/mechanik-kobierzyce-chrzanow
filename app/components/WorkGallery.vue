<script setup lang="ts">
const { t } = useI18n()

const images = [
  '/img/work-1.jpg',
  '/img/work-2.jpg',
  '/img/work-3.jpg',
  '/img/work-4.jpg',
  '/img/work-5.jpg',
  '/img/work-6.jpg',
]
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
    <Reveal>
      <SectionHeading :title="t('home.gallery.title')" />
    </Reveal>
    <div class="mt-10 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
      <Reveal v-for="(img, i) in images" :key="img" :delay="i * 60" class="break-inside-avoid">
        <NuxtImg
          :src="img"
          :alt="`${t('home.gallery.title')} ${i + 1}`"
          class="w-full rounded-2xl bg-steel-100 object-cover ring-1 ring-steel-200/60 dark:ring-steel-800"
          width="480"
          height="360"
          loading="lazy"
          :placeholder="[40, 30, 50, 4]"
        />
      </Reveal>
    </div>
  </section>
</template>
