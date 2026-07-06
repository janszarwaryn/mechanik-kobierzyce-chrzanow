<script setup lang="ts">
import { faq } from '~/data/faq'

const { t, locale } = useI18n()

const items = computed(() =>
  faq.map((f) => ({
    id: f.id,
    q: locale.value === 'en' ? f.q.en : f.q.pl,
    a: locale.value === 'en' ? f.a.en : f.a.pl,
  })),
)

// Emit FAQPage JSON-LD (answer-engine optimization).
useFaqSchema(items.value.map((i) => ({ q: i.q, a: i.a })))
</script>

<template>
  <section class="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
    <Reveal>
      <SectionHeading :title="t('faq.title')" :desc="t('faq.subtitle')" />
    </Reveal>
    <div class="mt-8 divide-y divide-steel-200 dark:divide-steel-800">
      <Reveal v-for="(item, i) in items" :key="item.id" :delay="i * 50">
        <details class="group py-4">
          <summary
            class="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-steel-900 dark:text-steel-50"
          >
            {{ item.q }}
            <AppIcon
              name="PhArrowRight"
              :size="18"
              class="shrink-0 text-accent-500 transition-transform group-open:rotate-90"
            />
          </summary>
          <p class="mt-3 leading-relaxed text-steel-600 dark:text-steel-300">
            {{ item.a }}
          </p>
        </details>
      </Reveal>
    </div>
  </section>
</template>
