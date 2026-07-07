<script setup lang="ts">
import { services } from '~/data/services'
import { site } from '~/data/site'

const { t } = useI18n()
useSiteMeta('services')
usePageBreadcrumb(t('services.title'))

const why = [
  { icon: 'PhGauge', key: 'why1' },
  { icon: 'PhCheckCircle', key: 'why2' },
  { icon: 'PhMapPin', key: 'why3' },
]
</script>

<template>
  <div>
    <PageHeader :title="t('services.title')" :subtitle="t('services.subtitle')" />

    <!-- keyword-rich lead intro -->
    <section class="mx-auto max-w-3xl px-4 pt-12 md:px-6 lg:px-8">
      <Reveal>
        <p class="text-lg leading-relaxed text-steel-700">
          {{ t('services.lead') }}
        </p>
      </Reveal>
    </section>

    <!-- service grid + schedule -->
    <section class="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div class="grid gap-5 sm:grid-cols-2">
          <Reveal v-for="(s, i) in services" :key="s.id" :delay="i * 60" class="h-full">
            <ServiceCard :service="s" class="h-full" />
          </Reveal>
        </div>
        <div class="lg:sticky lg:top-24 lg:self-start">
          <ScheduleTable />
        </div>
      </div>
    </section>

    <!-- why-us band (distinct layout family) -->
    <section class="bg-steel-900">
      <div class="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <Reveal>
          <h2 class="font-display text-2xl font-bold text-white md:text-3xl">
            {{ t('services.whyTitle') }}
          </h2>
        </Reveal>
        <div class="mt-8 grid gap-8 md:grid-cols-3">
          <Reveal v-for="(w, i) in why" :key="w.key" :delay="i * 80">
            <div class="flex gap-4">
              <span class="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-500/15 text-accent-400">
                <AppIcon :name="w.icon" :size="22" />
              </span>
              <div>
                <h3 class="font-display font-bold text-white">{{ t(`services.${w.key}Title`) }}</h3>
                <p class="mt-1 text-sm leading-relaxed text-steel-300">
                  {{ t(`services.${w.key}Body`) }}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- local coverage split (GEO) -->
    <section class="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
      <div class="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <NuxtImg
            src="/img/work-2.jpg"
            :alt="t('services.localTitle')"
            class="aspect-[4/3] w-full rounded-3xl object-cover ring-1 ring-steel-200/60"
            width="640"
            height="480"
            loading="lazy"
          />
        </Reveal>
        <Reveal :delay="100">
          <div>
            <SectionHeading :title="t('services.localTitle')" :desc="t('services.localBody')" />
            <BaseButton :href="`tel:${site.phones[0]}`" class="mt-6">
              <AppIcon name="PhPhone" :size="18" />
              {{ t('cta.call') }} {{ site.phones[0] }}
            </BaseButton>
          </div>
        </Reveal>
      </div>
    </section>

    <FaqSection />
  </div>
</template>
