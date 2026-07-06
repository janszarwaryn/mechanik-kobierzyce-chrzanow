// Shared content types. Data items carry i18n *keys* (resolved via t()) plus
// factual, non-translated fields (image refs, phone numbers, coordinates).

export interface ServiceItem {
  id: string
  /** i18n key prefix under `services.items.<id>` (.title/.desc) */
  key: string
  icon: string
}

export interface ProductItem {
  id: string
  /** i18n key prefix under `<group>.items.<id>` (.title/.desc/.spec) */
  key: string
  image: string
  imageAlt: string
}

export interface ProductGroup {
  id: 'blocks' | 'stands'
  items: ProductItem[]
}

export interface Review {
  id: string
  author: string
  /** short role/context, e.g. "Wspólnota mieszkaniowa" */
  role: string
  rating: number
  text: { pl: string; en: string }
}

export interface OpeningHours {
  /** i18n key under `hours.` for the day label */
  dayKey: string
  /** display value, e.g. "9:00 - 20:00"; null = closed */
  value: string | null
}

export interface SiteInfo {
  legalName: string
  domain: string
  url: string
  phones: string[]
  email: string
  address: {
    street: string
    locality: string
    municipality: string
    region: string
    postalCode: string
    country: string
  }
  geo: { lat: number; lng: number }
  mapEmbed: string
  mapLink: string
  areaServed: string[]
  hours: OpeningHours[]
}
