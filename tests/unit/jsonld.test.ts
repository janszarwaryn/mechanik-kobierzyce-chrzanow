import { describe, it, expect } from 'vitest'
import {
  buildLocalBusiness,
  buildProduct,
  buildOrganization,
  buildWebSite,
  buildBreadcrumb,
  buildFAQ,
} from '../../app/utils/jsonld'
import { site } from '../../app/data/site'

describe('buildLocalBusiness', () => {
  const ld = buildLocalBusiness(site)

  it('is a valid schema.org AutoRepair node', () => {
    expect(ld['@context']).toBe('https://schema.org')
    expect(ld['@type']).toBe('AutoRepair')
    expect(ld.name).toBe('Mechanik Kobierzyce')
    expect(ld.url).toBe('https://mechanik-kobierzyce.pl')
    expect(ld.telephone).toBe('+48601996692')
    expect(ld.email).toContain('@')
  })

  it('carries the correct Chrzanów / gmina Kobierzyce address', () => {
    expect(ld.address['@type']).toBe('PostalAddress')
    expect(ld.address.streetAddress).toBe('Lipowa 24A')
    expect(ld.address.addressLocality).toBe('Chrzanów')
    expect(ld.address.postalCode).toBe('55-040')
    expect(ld.address.addressRegion).toBe('dolnośląskie')
    expect(ld.address.addressCountry).toBe('PL')
  })

  it('carries geo coordinates and area served', () => {
    expect(ld.geo.latitude).toBeCloseTo(50.993, 2)
    expect(ld.geo.longitude).toBeCloseTo(16.932, 2)
    expect(ld.areaServed).toContain('Kobierzyce')
    expect(ld.areaServed).toContain('Wrocław')
  })

  it('builds opening-hours specs (Mon-Fri + Sat, no Sunday)', () => {
    const specs = ld.openingHoursSpecification
    expect(specs.length).toBe(2)
    const monFri = specs.find((s) => s.dayOfWeek.includes('Monday'))!
    expect(monFri.opens).toBe('09:00')
    expect(monFri.closes).toBe('20:00')
    expect(monFri.dayOfWeek).toContain('Friday')
    const sat = specs.find((s) => s.dayOfWeek.includes('Saturday'))!
    expect(sat.closes).toBe('17:00')
    expect(specs.some((s) => s.dayOfWeek.includes('Sunday'))).toBe(false)
  })
})

describe('buildLocalBusiness offers', () => {
  it('adds an OfferCatalog when service names are supplied', () => {
    const ld = buildLocalBusiness(site, ['Wymiana opon', 'Naprawa zawieszenia'])
    expect(ld.hasOfferCatalog['@type']).toBe('OfferCatalog')
    expect(ld.hasOfferCatalog.itemListElement.length).toBe(2)
    expect(ld.hasOfferCatalog.itemListElement[0].itemOffered.name).toBe('Wymiana opon')
    expect(ld.hasMap).toContain('google.com/maps')
    expect(ld.knowsLanguage).toContain('pl')
  })
})

describe('buildOrganization / buildWebSite', () => {
  it('builds an Organization with logo and address', () => {
    const org = buildOrganization(site)
    expect(org['@type']).toBe('Organization')
    expect(org.logo).toContain('https://')
    expect(org.address.addressLocality).toBe('Chrzanów')
  })
  it('builds a WebSite that points at the Organization publisher', () => {
    const web = buildWebSite(site, 'Mechanik Kobierzyce')
    expect(web['@type']).toBe('WebSite')
    expect(web.publisher['@id']).toBe(org_id())
  })
  function org_id() {
    return `${site.url}/#org`
  }
})

describe('buildBreadcrumb', () => {
  it('numbers list items from 1', () => {
    const bc = buildBreadcrumb([
      { name: 'Start', url: 'https://mechanik-kobierzyce.pl' },
      { name: 'Usługi', url: 'https://mechanik-kobierzyce.pl/uslugi' },
    ])
    expect(bc['@type']).toBe('BreadcrumbList')
    expect(bc.itemListElement[0].position).toBe(1)
    expect(bc.itemListElement[1].position).toBe(2)
    expect(bc.itemListElement[1].item).toContain('/uslugi')
  })
})

describe('buildFAQ', () => {
  it('builds a FAQPage with Question/Answer pairs', () => {
    const faq = buildFAQ([{ q: 'Gdzie jesteście?', a: 'W Chrzanowie, gmina Kobierzyce.' }])
    expect(faq['@type']).toBe('FAQPage')
    expect(faq.mainEntity[0]['@type']).toBe('Question')
    expect(faq.mainEntity[0].name).toBe('Gdzie jesteście?')
    expect(faq.mainEntity[0].acceptedAnswer.text).toContain('Chrzanowie')
  })
})

describe('buildProduct', () => {
  it('produces a schema.org Product node', () => {
    const p = buildProduct({
      name: 'Blokada parkingowa typu U',
      description: 'Trwała blokada typu U.',
      image: 'https://mechanik-kobierzyce.pl/img/blokada_1_1.jpg',
      brand: 'Mechanik Kobierzyce',
    })
    expect(p['@type']).toBe('Product')
    expect(p.name).toBe('Blokada parkingowa typu U')
    expect(p.image).toContain('https://')
    expect(p.brand['@type']).toBe('Brand')
  })
})
