<script setup lang="ts">
import { site } from '~/data/site'
import { services } from '~/data/services'

const { t } = useI18n()
const localePath = useLocalePath()

const productLinks = [
  { key: 'nav.blocks', path: '/blokady-parkingowe', icon: 'PhShieldCheck' },
  { key: 'nav.about', path: '/opis-blokady', icon: 'PhInfo' },
  { key: 'nav.stands', path: '/stojaki-rowerowe', icon: 'PhBicycle' },
]
const tailLinks = [{ key: 'nav.contact', path: '/kontakt' }]

const serviceHref = (slug: string) => `${localePath('/uslugi')}#${slug}`

const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))

// Harden mobile menu: Esc closes, body scroll locks while open.
onKeyStroke('Escape', () => (open.value = false))
watch(open, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? 'hidden' : ''
})
onUnmounted(() => {
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-steel-200/70 bg-steel-50/85 backdrop-blur-md">
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

      <!-- desktop nav -->
      <nav class="hidden items-center gap-1 lg:flex" aria-label="Główna nawigacja">
        <NuxtLink
          :to="localePath('/')"
          class="rounded-full px-3 py-2 text-sm font-medium text-steel-600 transition-colors hover:bg-steel-100 hover:text-steel-900"
          active-class="!text-accent-600"
        >
          {{ t('nav.home') }}
        </NuxtLink>

        <!-- Usługi dropdown -->
        <div class="group relative">
          <NuxtLink
            :to="localePath('/uslugi')"
            class="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-steel-600 transition-colors hover:bg-steel-100 hover:text-steel-900 group-focus-within:bg-steel-100"
            active-class="!text-accent-600"
            aria-haspopup="true"
          >
            {{ t('nav.services') }}
            <AppIcon name="PhCaretDown" :size="14" class="transition-transform group-hover:rotate-180" />
          </NuxtLink>
          <div
            class="invisible absolute left-0 top-full z-50 w-72 translate-y-1 rounded-2xl border border-steel-200 bg-steel-50 p-2 opacity-0 shadow-xl shadow-steel-900/10 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
          >
            <NuxtLink
              v-for="s in services"
              :key="s.id"
              :to="serviceHref(s.slug)"
              class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-steel-700 transition-colors hover:bg-steel-100"
            >
              <AppIcon :name="s.icon" :size="18" class="text-accent-500" />
              {{ t(`${s.key}.title`) }}
            </NuxtLink>
          </div>
        </div>

        <!-- Produkty dropdown -->
        <div class="group relative">
          <button
            type="button"
            class="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-steel-600 transition-colors hover:bg-steel-100 hover:text-steel-900 group-focus-within:bg-steel-100"
            aria-haspopup="true"
          >
            {{ t('nav.products') }}
            <AppIcon name="PhCaretDown" :size="14" class="transition-transform group-hover:rotate-180" />
          </button>
          <div
            class="invisible absolute left-0 top-full z-50 w-64 translate-y-1 rounded-2xl border border-steel-200 bg-steel-50 p-2 opacity-0 shadow-xl shadow-steel-900/10 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
          >
            <NuxtLink
              v-for="l in productLinks"
              :key="l.key"
              :to="localePath(l.path)"
              class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-steel-700 transition-colors hover:bg-steel-100"
            >
              <AppIcon :name="l.icon" :size="18" class="text-accent-500" />
              {{ t(l.key) }}
            </NuxtLink>
          </div>
        </div>

        <NuxtLink
          v-for="l in tailLinks"
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

    <!-- mobile backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-x-0 bottom-0 top-16 z-40 bg-steel-950/40 lg:hidden"
        @click="open = false"
      />
    </Transition>

    <!-- mobile drawer -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="open"
        class="relative z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-steel-200 bg-steel-50 px-4 py-3 lg:hidden"
        aria-label="Nawigacja mobilna"
      >
        <NuxtLink
          :to="localePath('/')"
          class="block rounded-lg px-3 py-3 text-base font-medium text-steel-700 hover:bg-steel-100"
          active-class="!text-accent-600"
        >
          {{ t('nav.home') }}
        </NuxtLink>

        <p class="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-steel-400">
          {{ t('nav.services') }}
        </p>
        <NuxtLink
          :to="localePath('/uslugi')"
          class="block rounded-lg px-3 py-2.5 text-base font-medium text-steel-700 hover:bg-steel-100"
          active-class="!text-accent-600"
        >
          {{ t('services.title') }}
        </NuxtLink>
        <NuxtLink
          v-for="s in services"
          :key="s.id"
          :to="serviceHref(s.slug)"
          class="block rounded-lg px-3 py-2 pl-6 text-sm text-steel-600 hover:bg-steel-100"
        >
          {{ t(`${s.key}.title`) }}
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
