<script setup lang="ts">
import { site } from '~/data/site'

const { t } = useI18n()
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
    <Reveal>
      <div
        class="flex flex-col items-start gap-6 rounded-3xl bg-steel-900 p-8 md:flex-row md:items-center md:justify-between md:p-12"
      >
        <div>
          <h2 class="font-display text-2xl font-bold text-white md:text-3xl">
            {{ t('home.contactCta.title') }}
          </h2>
          <p class="mt-2 max-w-xl text-steel-300">{{ t('home.contactCta.desc') }}</p>
        </div>
        <div class="shrink-0">
          <BaseButton :href="`tel:${site.phones[0]}`">
            <AppIcon name="PhPhone" :size="18" />
            {{ t('cta.call') }} {{ site.phones[0] }}
          </BaseButton>
        </div>
      </div>
    </Reveal>
  </section>
</template>
