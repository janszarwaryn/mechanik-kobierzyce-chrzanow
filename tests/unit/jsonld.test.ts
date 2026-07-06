import { describe, it, expect } from 'vitest'
import { buildLocalBusiness, buildProduct } from '../../app/utils/jsonld'
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
