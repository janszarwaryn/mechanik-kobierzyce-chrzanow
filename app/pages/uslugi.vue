<script setup lang="ts">
import { services } from '~/data/services'

const { t } = useI18n()
useSiteMeta('services')
usePageBreadcrumb(t('services.title'))
</script>

<template>
  <div>
    <PageHeader :title="t('services.title')" :subtitle="t('services.subtitle')" />

    <section class="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
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

    <FaqSection />
  </div>
</template>
