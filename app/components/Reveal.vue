<script setup lang="ts">
// Scroll-reveal wrapper. Honors prefers-reduced-motion (MOTION_INTENSITY 4):
// when reduced motion is requested, render content statically with no transform.
const props = withDefaults(defineProps<{ delay?: number; y?: number }>(), {
  delay: 0,
  y: 24,
})
const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
</script>

<template>
  <div v-if="reduce">
    <slot />
  </div>
  <div
    v-else
    v-motion
    :initial="{ opacity: 0, y: props.y }"
    :visible-once="{
      opacity: 1,
      y: 0,
      transition: { duration: 600, delay: props.delay, ease: [0.16, 1, 0.3, 1] },
    }"
  >
    <slot />
  </div>
</template>
