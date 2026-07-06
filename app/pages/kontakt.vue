<script setup lang="ts">
import { site } from '~/data/site'

const { t } = useI18n()
useSiteMeta('contact')
usePageBreadcrumb(t('contact.title'))
</script>

<template>
  <div>
    <PageHeader :title="t('contact.title')" :subtitle="t('contact.subtitle')" />

    <section class="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-2">
        <!-- form -->
        <div>
          <ContactForm />
        </div>

        <!-- info + schedule -->
        <div class="space-y-6">
          <div class="grid gap-4 sm:grid-cols-2">
            <a
              :href="`tel:${site.phones[0]}`"
              class="flex items-start gap-3 rounded-2xl border border-steel-200 bg-steel-50 p-5 transition-colors hover:border-accent-500/60 dark:border-steel-800 dark:bg-steel-900"
            >
              <AppIcon name="PhPhone" :size="22" class="text-accent-500" />
              <span>
                <span class="block text-sm text-steel-500">{{ t('contact.phoneTitle') }}</span>
                <span class="font-medium text-steel-900 dark:text-steel-50">{{ site.phones[0] }}</span>
                <span class="mt-0.5 block text-sm text-steel-600 dark:text-steel-400">{{ site.phones[1] }}</span>
              </span>
            </a>
            <a
              :href="`mailto:${site.email}`"
              class="flex items-start gap-3 rounded-2xl border border-steel-200 bg-steel-50 p-5 transition-colors hover:border-accent-500/60 dark:border-steel-800 dark:bg-steel-900"
            >
              <AppIcon name="PhEnvelope" :size="22" class="text-accent-500" />
              <span>
                <span class="block text-sm text-steel-500">{{ t('contact.emailTitle') }}</span>
                <span class="font-medium text-steel-900 dark:text-steel-50">{{ site.email }}</span>
              </span>
            </a>
            <div
              class="flex items-start gap-3 rounded-2xl border border-steel-200 bg-steel-50 p-5 sm:col-span-2 dark:border-steel-800 dark:bg-steel-900"
            >
              <AppIcon name="PhMapPin" :size="22" class="text-accent-500" />
              <span>
                <span class="block text-sm text-steel-500">{{ t('contact.addressTitle') }}</span>
                <span class="font-medium text-steel-900 dark:text-steel-50">
                  {{ site.address.street }}, {{ site.address.postalCode }} {{ site.address.locality }}
                </span>
                <a
                  :href="site.mapLink"
                  target="_blank"
                  rel="noopener"
                  class="mt-1 inline-flex items-center gap-1 text-sm text-accent-600 hover:underline dark:text-accent-400"
                >
                  {{ t('cta.route') }}
                  <AppIcon name="PhArrowRight" :size="14" />
                </a>
              </span>
            </div>
          </div>

          <ScheduleTable />

          <iframe
            :src="site.mapEmbed"
            class="h-72 w-full rounded-2xl border border-steel-200 dark:border-steel-800"
            style="border: 0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Mapa - Lipowa 24A, Chrzanów"
          />
        </div>
      </div>
    </section>
  </div>
</template>
