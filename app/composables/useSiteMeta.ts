import { useI18n, useLocaleHead } from '#imports'
import { useHead, useSeoMeta } from '#imports'

/**
 * Per-page SEO wiring: unique title + description (from `seo.<page>` i18n keys),
 * canonical, hreflang alternates, Open Graph / Twitter cards, and a locale-aware
 * `<html lang>`. Pass the page key that matches `seo.<page>` in the locale files.
 */
export function useSiteMeta(pageKey: string, ogImage = '/img/about.jpg') {
  const { t, locale } = useI18n()
  // useLocaleHead gives canonical + hreflang alternate links and html lang.
  const localeHead = useLocaleHead({ addSeoAttributes: true })

  const title = () => t(`seo.${pageKey}.title`)
  const description = () => t(`seo.${pageKey}.description`)

  useHead(() => ({
    htmlAttrs: localeHead.value.htmlAttrs,
    link: [...(localeHead.value.link || [])],
    meta: [...(localeHead.value.meta || [])],
  }))

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogImage,
    ogLocale: () => (locale.value === 'pl' ? 'pl_PL' : 'en_US'),
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
  })
}
