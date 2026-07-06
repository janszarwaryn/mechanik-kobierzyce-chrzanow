<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'primary' | 'secondary'
    type?: 'button' | 'submit'
    block?: boolean
  }>(),
  { variant: 'primary', type: 'button', block: false },
)

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium font-display tracking-tight whitespace-nowrap transition-transform duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500'

// primary: amber fill + near-black text (WCAG AA on both themes).
// secondary: steel outline that reads in light and dark.
const variants = {
  primary: 'bg-accent-500 text-steel-950 hover:bg-accent-400',
  secondary:
    'border border-steel-300 text-steel-900 hover:border-steel-500 dark:border-steel-700 dark:text-steel-100 dark:hover:border-steel-500',
}

const classes = computed(() => [
  base,
  variants[props.variant],
  props.block ? 'w-full' : '',
])
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="classes">
    <slot />
  </NuxtLink>
  <a v-else-if="href" :href="href" :class="classes" rel="noopener">
    <slot />
  </a>
  <button v-else :type="type" :class="classes">
    <slot />
  </button>
</template>
