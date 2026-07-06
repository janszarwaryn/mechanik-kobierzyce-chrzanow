<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const links = [
  { key: 'nav.home', path: '/' },
  { key: 'nav.services', path: '/uslugi' },
  { key: 'nav.blocks', path: '/blokady-parkingowe' },
  { key: 'nav.stands', path: '/stojaki-rowerowe' },
  { key: 'nav.about', path: '/opis-blokady' },
  { key: 'nav.contact', path: '/kontakt' },
]

const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-steel-200/70 bg-steel-50/85 backdrop-blur-md dark:border-steel-800/70 dark:bg-steel-950/85"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
      <NuxtLink
        :to="localePath('/')"
        class="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-steel-900 dark:text-steel-50"
      >
        <span class="grid size-8 place-items-center rounded-lg bg-accent-500 text-steel-950">
          <AppIcon name="PhWrench" :size="18" weight="bold" />
        </span>
        {{ t('brand.name') }}
      </NuxtLink>

      <!-- desktop nav: one line, hidden under lg -->
      <nav class="hidden items-center gap-1 lg:flex" aria-label="Główna nawigacja">
        <NuxtLink
          v-for="l in links"
          :key="l.key"
          :to="localePath(l.path)"
          :aria-label="l.path === '/' ? t('nav.homeAria') : undefined"
          class="rounded-full px-3 py-2 text-sm font-medium text-steel-600 transition-colors hover:bg-steel-100 hover:text-steel-900 dark:text-steel-300 dark:hover:bg-steel-800 dark:hover:text-steel-50"
          active-class="!text-accent-600 dark:!text-accent-400"
        >
          {{ t(l.key) }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-1">
        <LocaleSwitch />
        <ThemeToggle />
        <BaseButton :to="localePath('/kontakt')" class="ml-1 hidden md:inline-flex">
          {{ t('cta.book') }}
        </BaseButton>
        <button
          type="button"
          class="ml-1 inline-flex size-10 items-center justify-center rounded-full text-steel-700 hover:bg-steel-100 lg:hidden dark:text-steel-200 dark:hover:bg-steel-800"
          :aria-label="open ? 'Zamknij menu' : 'Otwórz menu'"
          :aria-expanded="open"
          @click="open = !open"
        >
          <AppIcon :name="open ? 'PhX' : 'PhList'" :size="22" />
        </button>
      </div>
    </div>

    <!-- mobile drawer -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="open"
        class="border-t border-steel-200 bg-steel-50 px-4 py-3 lg:hidden dark:border-steel-800 dark:bg-steel-950"
        aria-label="Nawigacja mobilna"
      >
        <NuxtLink
          v-for="l in links"
          :key="l.key"
          :to="localePath(l.path)"
          :aria-label="l.path === '/' ? t('nav.homeAria') : undefined"
          class="block rounded-lg px-3 py-3 text-base font-medium text-steel-700 hover:bg-steel-100 dark:text-steel-200 dark:hover:bg-steel-800"
          active-class="!text-accent-600 dark:!text-accent-400"
        >
          {{ t(l.key) }}
        </NuxtLink>
        <BaseButton :to="localePath('/kontakt')" block class="mt-2">
          {{ t('cta.book') }}
        </BaseButton>
      </nav>
    </Transition>
  </header>
</template>
