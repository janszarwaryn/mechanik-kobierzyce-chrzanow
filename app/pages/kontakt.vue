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
        <!-- info + prominent call CTA -->
        <div class="space-y-6">
          <div
            class="rounded-3xl bg-steel-900 p-8"
          >
            <h2 class="font-display text-2xl font-bold text-white">
              {{ t('cta.book') }}
            </h2>
            <p class="mt-2 text-steel-300">{{ t('home.contactCta.desc') }}</p>
            <BaseButton :href="`tel:${site.phones[0]}`" class="mt-5">
              <AppIcon name="PhPhone" :size="18" />
              {{ t('cta.call') }} {{ site.phones[0] }}
            </BaseButton>
            <p class="mt-3 text-sm text-steel-400">
              {{ site.phones[1] }}
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <a
              :href="`mailto:${site.email}`"
              class="flex items-start gap-3 rounded-2xl border border-steel-200 bg-steel-50 p-5 transition-colors hover:border-accent-500/60"
            >
              <AppIcon name="PhEnvelope" :size="22" class="text-accent-500" />
              <span>
                <span class="block text-sm text-steel-500">{{ t('contact.emailTitle') }}</span>
                <span class="font-medium text-steel-900">{{ site.email }}</span>
              </span>
            </a>
            <a
              :href="site.mapLink"
              target="_blank"
              rel="noopener"
              class="flex items-start gap-3 rounded-2xl border border-steel-200 bg-steel-50 p-5 transition-colors hover:border-accent-500/60"
            >
              <AppIcon name="PhMapPin" :size="22" class="text-accent-500" />
              <span>
                <span class="block text-sm text-steel-500">{{ t('contact.addressTitle') }}</span>
                <span class="font-medium text-steel-900">
                  {{ site.address.street }}, {{ site.address.postalCode }} {{ site.address.locality }}
                </span>
                <span class="mt-1 inline-flex items-center gap-1 text-sm text-accent-600">
                  {{ t('cta.route') }}
                  <AppIcon name="PhArrowRight" :size="14" />
                </span>
              </span>
            </a>
          </div>

          <ScheduleTable />
        </div>

        <!-- map -->
        <div>
          <iframe
            :src="site.mapEmbed"
            class="h-full min-h-96 w-full rounded-3xl border border-steel-200 bg-steel-100"
            style="border: 0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Mapa - Lipowa 24A, Chrzanów, gmina Kobierzyce"
          />
        </div>
      </div>
    </section>
  </div>
</template>
