<script setup lang="ts">
import { site } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()

const links = [
  { key: 'nav.services', path: '/uslugi' },
  { key: 'nav.blocks', path: '/blokady-parkingowe' },
  { key: 'nav.stands', path: '/stojaki-rowerowe' },
  { key: 'nav.about', path: '/opis-blokady' },
  { key: 'nav.contact', path: '/kontakt' },
]

const year = 2026
</script>

<template>
  <footer class="border-t border-steel-200 bg-steel-100 dark:border-steel-800 dark:bg-steel-900">
    <div class="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6 lg:px-8">
      <div>
        <p class="font-display text-lg font-bold text-steel-900 dark:text-steel-50">
          {{ t('brand.name') }}
        </p>
        <p class="text-sm font-medium text-steel-500">{{ t('brand.sub') }}</p>
        <p class="mt-3 max-w-xs text-sm text-steel-600 dark:text-steel-400">
          {{ t('footer.about') }}
        </p>
      </div>

      <div>
        <h2 class="font-display text-sm font-semibold uppercase tracking-wide text-steel-500">
          {{ t('footer.nav') }}
        </h2>
        <ul class="mt-3 space-y-2">
          <li v-for="l in links" :key="l.key">
            <NuxtLink
              :to="localePath(l.path)"
              class="text-sm text-steel-600 transition-colors hover:text-accent-600 dark:text-steel-400 dark:hover:text-accent-400"
            >
              {{ t(l.key) }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="font-display text-sm font-semibold uppercase tracking-wide text-steel-500">
          {{ t('footer.contact') }}
        </h2>
        <ul class="mt-3 space-y-2 text-sm text-steel-600 dark:text-steel-400">
          <li class="flex items-center gap-2">
            <AppIcon name="PhMapPin" :size="16" />
            {{ site.address.street }}, {{ site.address.postalCode }} {{ site.address.locality }}
          </li>
          <li>
            <a
              :href="`tel:${site.phones[0]}`"
              class="flex items-center gap-2 transition-colors hover:text-accent-600 dark:hover:text-accent-400"
            >
              <AppIcon name="PhPhone" :size="16" />
              {{ site.phones[0] }}
            </a>
          </li>
          <li>
            <a
              :href="`mailto:${site.email}`"
              class="flex items-center gap-2 transition-colors hover:text-accent-600 dark:hover:text-accent-400"
            >
              <AppIcon name="PhEnvelope" :size="16" />
              {{ site.email }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="border-t border-steel-200 dark:border-steel-800"
    >
      <div
        class="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-steel-500 sm:flex-row sm:items-center sm:justify-between md:px-6 lg:px-8"
      >
        <p>&copy; {{ year }} {{ t('brand.name') }}. {{ t('footer.rights') }}</p>
        <p>
          {{ t('footer.createdBy') }}
          <a
            href="https://jspace.pl"
            rel="noopener"
            target="_blank"
            class="font-medium text-steel-700 underline-offset-2 transition-colors hover:text-accent-600 hover:underline dark:text-steel-300 dark:hover:text-accent-400"
          >jspace.pl</a>
        </p>
      </div>
    </div>
  </footer>
</template>
