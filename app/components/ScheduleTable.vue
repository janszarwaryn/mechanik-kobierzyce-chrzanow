<script setup lang="ts">
import { site } from '~/data/site'

const { t } = useI18n()
</script>

<template>
  <div class="rounded-2xl border border-steel-200 bg-steel-50 p-5 dark:border-steel-800 dark:bg-steel-900">
    <h3 class="flex items-center gap-2 font-display font-bold text-steel-900 dark:text-steel-50">
      <AppIcon name="PhClock" :size="20" class="text-accent-500" />
      {{ t('contact.hoursTitle') }}
    </h3>
    <dl class="mt-4 divide-y divide-steel-200 dark:divide-steel-800">
      <div v-for="h in site.hours" :key="h.dayKey" class="flex justify-between py-2 text-sm">
        <dt class="text-steel-600 dark:text-steel-400">{{ t(`hours.${h.dayKey}`) }}</dt>
        <dd class="font-medium text-steel-900 dark:text-steel-100">
          {{ h.value ?? t('hours.closed') }}
        </dd>
      </div>
    </dl>
  </div>
</template>
