import { useI18n, useLocaleHead, useHead, useSeoMeta } from '#imports'
import { site } from '~/data/site'

/**
 * Per-page SEO wiring: unique title + description (from `seo.<page>` i18n keys),
 * canonical, hreflang alternates, Open Graph / Twitter cards, keywords, local
 * geo meta (GEO), and a locale-aware `<html lang>`.
 *
 * Title is set directly with `titleTemplate: null` so the descriptive, already
 * brand-scoped `seo.<page>.title` is used verbatim (no template duplication).
 */
export function useSiteMeta(pageKey: string, ogImage = '/img/about.jpg') {
  const { t, locale } = useI18n()
  const localeHead = useLocaleHead()

  const title = () => t(`seo.${pageKey}.title`)
  const description = () => t(`seo.${pageKey}.description`)
  const keywords = () => t(`seo.${pageKey}.keywords`)
  // Absolute OG image URL for crawlers.
  const absImage = ogImage.startsWith('http') ? ogImage : `${site.url}${ogImage}`

  useHead(() => ({
    title: title(),
    titleTemplate: null,
    htmlAttrs: localeHead.value.htmlAttrs,
    link: [...(localeHead.value.link || [])],
    meta: [
      ...(localeHead.value.meta || []),
      { name: 'keywords', content: keywords() },
      // GEO meta: region dolnośląskie (PL-DS), Chrzanów in gmina Kobierzyce.
      { name: 'geo.region', content: 'PL-DS' },
      { name: 'geo.placename', content: `${site.address.locality}, ${site.address.municipality}` },
      { name: 'geo.position', content: `${site.geo.lat};${site.geo.lng}` },
      { name: 'ICBM', content: `${site.geo.lat}, ${site.geo.lng}` },
    ],
  }))

  useSeoMeta({
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogImage: absImage,
    ogImageAlt: title,
    ogLocale: () => (locale.value === 'pl' ? 'pl_PL' : 'en_US'),
    ogLocaleAlternate: () => (locale.value === 'pl' ? 'en_US' : 'pl_PL'),
    ogSiteName: 'Mechanik Kobierzyce',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: absImage,
  })
}
