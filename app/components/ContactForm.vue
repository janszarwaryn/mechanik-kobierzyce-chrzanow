<script setup lang="ts">
const { t } = useI18n()
const { fields, errors, status, submit } = useContactForm()

const fieldClass =
  'w-full rounded-lg border bg-steel-50 px-4 py-3 text-steel-900 placeholder:text-steel-400 focus:outline-2 focus:outline-offset-2 focus:outline-accent-500 dark:bg-steel-900 dark:text-steel-50'
</script>

<template>
  <form class="space-y-5" novalidate @submit.prevent="submit">
    <div
      v-if="status === 'success'"
      class="flex items-center gap-2 rounded-lg border border-green-600/30 bg-green-600/10 px-4 py-3 text-sm text-green-800 dark:text-green-300"
      role="status"
    >
      <AppIcon name="PhCheckCircle" :size="18" />
      {{ t('contact.form.success') }}
    </div>
    <div
      v-else-if="status === 'error'"
      class="flex items-center gap-2 rounded-lg border border-red-600/30 bg-red-600/10 px-4 py-3 text-sm text-red-800 dark:text-red-300"
      role="alert"
    >
      <AppIcon name="PhWarningCircle" :size="18" />
      {{ t('contact.form.error') }}
    </div>

    <div class="grid gap-5 sm:grid-cols-2">
      <div class="flex flex-col gap-2">
        <label for="cf-name" class="text-sm font-medium text-steel-700 dark:text-steel-300">
          {{ t('contact.form.name') }}
        </label>
        <input
          id="cf-name"
          v-model="fields.name"
          type="text"
          :class="[fieldClass, errors.name ? 'border-red-500' : 'border-steel-300 dark:border-steel-700']"
          :aria-invalid="!!errors.name"
        >
        <p v-if="errors.name" class="text-xs text-red-600">{{ t(`contact.form.${errors.name}`) }}</p>
      </div>

      <div class="flex flex-col gap-2">
        <label for="cf-phone" class="text-sm font-medium text-steel-700 dark:text-steel-300">
          {{ t('contact.form.phone') }}
        </label>
        <input
          id="cf-phone"
          v-model="fields.phone"
          type="tel"
          :class="[fieldClass, errors.phone ? 'border-red-500' : 'border-steel-300 dark:border-steel-700']"
          :aria-invalid="!!errors.phone"
        >
        <p v-if="errors.phone" class="text-xs text-red-600">{{ t(`contact.form.${errors.phone}`) }}</p>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <label for="cf-email" class="text-sm font-medium text-steel-700 dark:text-steel-300">
        {{ t('contact.form.email') }}
      </label>
      <input
        id="cf-email"
        v-model="fields.email"
        type="email"
        :class="[fieldClass, errors.email ? 'border-red-500' : 'border-steel-300 dark:border-steel-700']"
        :aria-invalid="!!errors.email"
      >
      <p v-if="errors.email" class="text-xs text-red-600">{{ t(`contact.form.${errors.email}`) }}</p>
    </div>

    <div class="flex flex-col gap-2">
      <label for="cf-message" class="text-sm font-medium text-steel-700 dark:text-steel-300">
        {{ t('contact.form.message') }}
      </label>
      <textarea
        id="cf-message"
        v-model="fields.message"
        rows="5"
        :class="[fieldClass, errors.message ? 'border-red-500' : 'border-steel-300 dark:border-steel-700']"
        :aria-invalid="!!errors.message"
      />
      <p v-if="errors.message" class="text-xs text-red-600">
        {{ t(`contact.form.${errors.message}`) }}
      </p>
    </div>

    <BaseButton type="submit" :block="true">
      <template v-if="status === 'submitting'">{{ t('contact.form.sending') }}</template>
      <template v-else>{{ t('contact.form.submit') }}</template>
    </BaseButton>
  </form>
</template>
