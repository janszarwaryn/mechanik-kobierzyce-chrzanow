import type { SiteInfo } from '~/types/content'

const DAY_MAP: Record<string, string[]> = {
  monFri: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  sat: ['Saturday'],
  sun: ['Sunday'],
}

interface OpeningHoursSpec {
  '@type': 'OpeningHoursSpecification'
  dayOfWeek: string[]
  opens: string
  closes: string
}

/** "9:00 - 20:00" -> { opens: "09:00", closes: "20:00" } */
function parseHours(value: string): { opens: string; closes: string } {
  const [open, close] = value.split('-').map((s) => s.trim())
  const pad = (t: string) => {
    const [h = '0', m = '00'] = t.split(':')
    return `${h.padStart(2, '0')}:${m.padStart(2, '0')}`
  }
  return { opens: pad(open ?? ''), closes: pad(close ?? '') }
}

export interface ReviewInput {
  author: string
  rating: number
  body: string
}

export function buildLocalBusiness(
  s: SiteInfo,
  offers: string[] = [],
  reviews: ReviewInput[] = [],
) {
  const openingHoursSpecification: OpeningHoursSpec[] = s.hours
    .filter((h) => h.value !== null)
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAY_MAP[h.dayKey] ?? [],
      ...parseHours(h.value as string),
    }))

  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${s.url}/#business`,
    name: s.legalName,
    url: s.url,
    image: `${s.url}/img/about.jpg`,
    telephone: s.phones[0],
    email: s.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.address.street,
      addressLocality: s.address.locality,
      postalCode: s.address.postalCode,
      addressRegion: s.address.region,
      addressCountry: s.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: s.geo.lat,
      longitude: s.geo.lng,
    },
    areaServed: s.areaServed,
    openingHoursSpecification,
    hasMap: s.mapLink,
    knowsLanguage: ['pl', 'en'],
    paymentAccepted: 'Cash, Card',
    currenciesAccepted: 'PLN',
    ...(offers.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Usługi',
            itemListElement: offers.map((name) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name },
            })),
          },
        }
      : {}),
    ...(reviews.length
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: Number(
              (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
            ),
            reviewCount: reviews.length,
            bestRating: 5,
            worstRating: 1,
          },
          review: reviews.map((r) => ({
            '@type': 'Review',
            author: { '@type': 'Person', name: r.author },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: r.rating,
              bestRating: 5,
            },
            reviewBody: r.body,
          })),
        }
      : {}),
  }
}

export function buildOrganization(s: SiteInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${s.url}/#org`,
    name: s.legalName,
    url: s.url,
    logo: `${s.url}/favicon.png`,
    email: s.email,
    telephone: s.phones[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.address.street,
      addressLocality: s.address.locality,
      postalCode: s.address.postalCode,
      addressRegion: s.address.region,
      addressCountry: s.address.country,
    },
    areaServed: s.areaServed,
  }
}

export function buildWebSite(s: SiteInfo, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${s.url}/#website`,
    url: s.url,
    name,
    inLanguage: ['pl-PL', 'en-US'],
    publisher: { '@id': `${s.url}/#org` },
  }
}

export interface Crumb {
  name: string
  url: string
}

export function buildBreadcrumb(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  }
}

export interface QA {
  q: string
  a: string
}

export function buildFAQ(items: QA[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export interface ProductInput {
  name: string
  description: string
  image: string
  brand: string
}

export function buildProduct(p: ProductInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: p.image,
    brand: { '@type': 'Brand', name: p.brand },
  }
}
