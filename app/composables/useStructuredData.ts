import { useHead, useI18n, useRoute, useLocalePath } from '#imports'
import { site } from '~/data/site'
import {
  buildLocalBusiness,
  buildProduct,
  buildOrganization,
  buildWebSite,
  buildBreadcrumb,
  buildFAQ,
} from '~/utils/jsonld'
import type { ProductInput, Crumb, QA, ReviewInput } from '~/utils/jsonld'

function inject(node: object) {
  useHead({
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(node) }],
  })
}

/** Site-wide AutoRepair LocalBusiness (+ optional service OfferCatalog),
 *  Organization and WebSite nodes. */
export function useLocalBusinessSchema(
  offers: string[] = [],
  siteName = 'Mechanik Kobierzyce',
  reviews: ReviewInput[] = [],
) {
  inject(buildLocalBusiness(site, offers, reviews))
  inject(buildOrganization(site))
  inject(buildWebSite(site, siteName))
}

/** Product nodes for a product page. */
export function useProductSchema(products: ProductInput[]) {
  for (const p of products) inject(buildProduct(p))
}

/** FAQPage node (answer-engine optimization). */
export function useFaqSchema(items: QA[]) {
  inject(buildFAQ(items))
}

/** BreadcrumbList node for a sub-page. */
export function useBreadcrumbSchema(items: Crumb[]) {
  inject(buildBreadcrumb(items))
}

/** Breadcrumb for a sub-page: Home -> current page. */
export function usePageBreadcrumb(currentName: string) {
  const { t } = useI18n()
  const route = useRoute()
  const localePath = useLocalePath()
  useBreadcrumbSchema([
    { name: t('nav.home'), url: `${site.url}${localePath('/')}` },
    { name: currentName, url: `${site.url}${route.path}` },
  ])
}
