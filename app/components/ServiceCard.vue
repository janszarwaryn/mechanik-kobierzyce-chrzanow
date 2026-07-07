<script setup lang="ts">
import type { ServiceItem } from '~/types/content'

const props = defineProps<{ service: ServiceItem }>()
const { t } = useI18n()
</script>

<template>
  <a
    :href="`#${props.service.slug}`"
    class="flex h-full gap-4 rounded-2xl border border-steel-200 bg-steel-50 p-5 transition-colors hover:border-accent-500/60"
  >
    <span
      class="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-500/15 text-accent-600"
    >
      <AppIcon :name="service.icon" :size="24" />
    </span>
    <div>
      <h3 class="font-display font-bold text-steel-900">
        {{ t(`${props.service.key}.title`) }}
      </h3>
      <p class="mt-1 text-sm leading-relaxed text-steel-600">
        {{ t(`${props.service.key}.desc`) }}
      </p>
    </div>
  </a>
</template>
