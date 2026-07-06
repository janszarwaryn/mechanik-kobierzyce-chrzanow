import { useI18n, useLocaleHead, useHead, useSeoMeta } from '#imports'

/**
 * Per-page SEO wiring: unique title + description (from `seo.<page>` i18n keys),
 * canonical, hreflang alternates, Open Graph / Twitter cards, and a locale-aware
 * `<html lang>`. Pass the page key that matches `seo.<page>` in the locale files.
 *
 * Title is set directly with `titleTemplate: null` so the descriptive, already
 * brand-scoped `seo.<page>.title` is used verbatim (no template duplication).
 */
export function useSiteMeta(pageKey: string, ogImage = '/img/about.jpg') {
  const { t, locale } = useI18n()
  const localeHead = useLocaleHead()

  const title = () => t(`seo.${pageKey}.title`)
  const description = () => t(`seo.${pageKey}.description`)

  useHead(() => ({
    title: title(),
    titleTemplate: null,
    htmlAttrs: localeHead.value.htmlAttrs,
    link: [...(localeHead.value.link || [])],
    meta: [...(localeHead.value.meta || [])],
  }))

  useSeoMeta({
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
