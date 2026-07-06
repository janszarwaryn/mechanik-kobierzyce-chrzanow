<script setup lang="ts">
const { theme, init, toggle } = useTheme()
onMounted(init)
</script>

<template>
  <button
    type="button"
    class="inline-flex size-10 items-center justify-center rounded-full text-steel-600 transition-colors hover:bg-steel-100 hover:text-steel-900 dark:text-steel-300 dark:hover:bg-steel-800 dark:hover:text-steel-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
    :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <AppIcon :name="theme === 'dark' ? 'PhSun' : 'PhMoon'" :size="20" />
  </button>
</template>
