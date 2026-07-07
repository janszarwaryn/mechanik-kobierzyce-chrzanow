<script setup lang="ts">
import {
  PhTire,
  PhCarProfile,
  PhWrench,
  PhEngine,
  PhGear,
  PhToolbox,
  PhGauge,
  PhList,
  PhX,
  PhSun,
  PhMoon,
  PhPhone,
  PhEnvelope,
  PhMapPin,
  PhClock,
  PhArrowRight,
  PhCheckCircle,
  PhStar,
  PhWarningCircle,
  PhCaretDown,
  PhShieldCheck,
  PhBicycle,
} from '@phosphor-icons/vue'

const registry: Record<string, unknown> = {
  PhTire,
  PhCarProfile,
  PhWrench,
  PhEngine,
  PhGear,
  PhToolbox,
  PhGauge,
  PhList,
  PhX,
  PhSun,
  PhMoon,
  PhPhone,
  PhEnvelope,
  PhMapPin,
  PhClock,
  PhArrowRight,
  PhCheckCircle,
  PhStar,
  PhWarningCircle,
  PhCaretDown,
  PhShieldCheck,
  PhBicycle,
}

const props = withDefaults(
  defineProps<{ name: string; size?: number | string; weight?: string }>(),
  { size: 24, weight: 'regular' },
)

const component = computed(() => registry[props.name] ?? PhWrench)
</script>

<template>
  <component :is="component" :size="size" :weight="weight" aria-hidden="true" />
</template>
