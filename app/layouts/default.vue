<script setup lang="ts">
// Site-wide AutoRepair / LocalBusiness structured data on every page.
useLocalBusinessSchema()
</script>

<template>
  <div class="flex min-h-[100dvh] flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
