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
    const [h, m = '00'] = t.split(':')
    return `${h.padStart(2, '0')}:${m.padStart(2, '0')}`
  }
  return { opens: pad(open ?? ''), closes: pad(close ?? '') }
}

export function buildLocalBusiness(s: SiteInfo) {
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
