<script setup lang="ts">
import { site } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()

const mainLinks = [
  { key: 'nav.home', path: '/' },
  { key: 'nav.services', path: '/uslugi' },
]
const productLinks = [
  { key: 'nav.blocks', path: '/blokady-parkingowe' },
  { key: 'nav.stands', path: '/stojaki-rowerowe' },
]
const tailLinks = [
  { key: 'nav.about', path: '/opis-blokady' },
  { key: 'nav.contact', path: '/kontakt' },
]
const desktopLinks = [...mainLinks, ...productLinks, ...tailLinks]

const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-steel-200/70 bg-steel-50/85 backdrop-blur-md"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
      <NuxtLink
        :to="localePath('/')"
        :aria-label="t('nav.homeAria')"
        class="flex flex-col justify-center leading-none"
      >
        <span class="font-display text-lg font-bold tracking-tight text-steel-900 sm:text-xl">
          {{ t('brand.name') }}
        </span>
        <span class="mt-0.5 text-[11px] font-medium tracking-wide text-steel-500">
          {{ t('brand.sub') }}
        </span>
      </NuxtLink>

      <!-- desktop nav: one line, hidden under lg -->
      <nav class="hidden items-center gap-1 lg:flex" aria-label="Główna nawigacja">
        <NuxtLink
          v-for="l in desktopLinks"
          :key="l.key"
          :to="localePath(l.path)"
          class="rounded-full px-3 py-2 text-sm font-medium text-steel-600 transition-colors hover:bg-steel-100 hover:text-steel-900"
          active-class="!text-accent-600"
        >
          {{ t(l.key) }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-1">
        <LocaleSwitch />
        <BaseButton :href="`tel:${site.phones[0]}`" class="ml-1 hidden md:inline-flex">
          {{ t('cta.book') }}
        </BaseButton>
        <button
          type="button"
          class="ml-1 inline-flex size-10 items-center justify-center rounded-full text-steel-700 hover:bg-steel-100 lg:hidden"
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
        class="border-t border-steel-200 bg-steel-50 px-4 py-3 lg:hidden"
        aria-label="Nawigacja mobilna"
      >
        <NuxtLink
          v-for="l in mainLinks"
          :key="l.key"
          :to="localePath(l.path)"
          class="block rounded-lg px-3 py-3 text-base font-medium text-steel-700 hover:bg-steel-100"
          active-class="!text-accent-600"
        >
          {{ t(l.key) }}
        </NuxtLink>

        <p class="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-steel-400">
          {{ t('nav.products') }}
        </p>
        <NuxtLink
          v-for="l in productLinks"
          :key="l.key"
          :to="localePath(l.path)"
          class="block rounded-lg px-3 py-3 text-base font-medium text-steel-700 hover:bg-steel-100"
          active-class="!text-accent-600"
        >
          {{ t(l.key) }}
        </NuxtLink>

        <NuxtLink
          v-for="l in tailLinks"
          :key="l.key"
          :to="localePath(l.path)"
          class="mt-1 block rounded-lg px-3 py-3 text-base font-medium text-steel-700 hover:bg-steel-100"
          active-class="!text-accent-600"
        >
          {{ t(l.key) }}
        </NuxtLink>

        <BaseButton :href="`tel:${site.phones[0]}`" block class="mt-3">
          <AppIcon name="PhPhone" :size="18" />
          {{ t('cta.book') }}
        </BaseButton>
      </nav>
    </Transition>
  </header>
</template>
