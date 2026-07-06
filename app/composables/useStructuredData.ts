import { useHead } from '#imports'
import { site } from '~/data/site'
import { buildLocalBusiness, buildProduct } from '~/utils/jsonld'
import type { ProductInput } from '~/utils/jsonld'

function inject(node: object) {
  useHead({
    script: [
      { type: 'application/ld+json', innerHTML: JSON.stringify(node) },
    ],
  })
}

/** Site-wide AutoRepair / LocalBusiness node. */
export function useLocalBusinessSchema() {
  inject(buildLocalBusiness(site))
}

/** Product nodes for a product page. */
export function useProductSchema(products: ProductInput[]) {
  for (const p of products) inject(buildProduct(p))
}
