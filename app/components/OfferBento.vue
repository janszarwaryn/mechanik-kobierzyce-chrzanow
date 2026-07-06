<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const cells = [
  {
    key: 'home.offer.blocks',
    path: '/blokady-parkingowe',
    image: '/img/blokada_1_1.jpg',
    large: true,
  },
  { key: 'home.offer.stands', path: '/stojaki-rowerowe', image: '/img/stojak_1_1.jpg', large: false },
  { key: 'home.offer.service', path: '/uslugi', image: '/img/work-1.jpg', large: false },
]
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
    <Reveal>
      <SectionHeading eyebrow="Oferta" :title="t('home.offer.title')" />
    </Reveal>

    <div class="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
      <Reveal
        v-for="(c, i) in cells"
        :key="c.key"
        :delay="i * 80"
        :class="c.large ? 'md:col-span-2 lg:row-span-2' : ''"
        class="h-full"
      >
        <NuxtLink
          :to="localePath(c.path)"
          :class="[
            'group relative flex h-full min-h-56 flex-col justify-end overflow-hidden rounded-3xl ring-1 ring-steel-200/60 dark:ring-steel-800',
            c.large ? 'lg:min-h-full' : '',
          ]"
        >
          <NuxtImg
            :src="c.image"
            :alt="t(`${c.key}.title`)"
            class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
            width="640"
            height="480"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-steel-950/85 via-steel-950/30 to-transparent" />
          <div class="relative p-6">
            <h3 class="font-display text-xl font-bold text-white md:text-2xl">
              {{ t(`${c.key}.title`) }}
            </h3>
            <p class="mt-2 max-w-md text-sm text-steel-200">
              {{ t(`${c.key}.desc`) }}
            </p>
            <span class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-400">
              {{ t('cta.more') }}
              <AppIcon
                name="PhArrowRight"
                :size="16"
                class="transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>
        </NuxtLink>
      </Reveal>
    </div>
  </section>
</template>
