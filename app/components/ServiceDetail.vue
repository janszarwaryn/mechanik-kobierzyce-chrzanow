<script setup lang="ts">
import type { ServiceItem } from '~/types/content'

const props = defineProps<{ service: ServiceItem }>()
const { t } = useI18n()

const points = ['p1', 'p2', 'p3']
</script>

<template>
  <section
    :id="props.service.slug"
    class="scroll-mt-24 border-t border-steel-200 py-10 first:border-t-0 md:py-12"
  >
    <div class="grid gap-6 md:grid-cols-[auto_1fr] md:gap-8">
      <span
        class="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent-500/15 text-accent-600"
      >
        <AppIcon :name="service.icon" :size="28" />
      </span>
      <div>
        <h2 class="font-display text-2xl font-bold tracking-tight text-steel-900">
          {{ t(`${props.service.key}.h2`) }}
        </h2>
        <p class="mt-3 max-w-3xl leading-relaxed text-steel-600">
          {{ t(`${props.service.key}.long`) }}
        </p>
        <ul class="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="p in points"
            :key="p"
            class="flex items-start gap-2 text-sm text-steel-700"
          >
            <AppIcon name="PhCheckCircle" :size="18" class="mt-0.5 shrink-0 text-accent-500" />
            {{ t(`${props.service.key}.${p}`) }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
