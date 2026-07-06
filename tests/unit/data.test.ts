import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { services } from '../../app/data/services'
import { productGroups, blocks, stands } from '../../app/data/products'
import { reviews } from '../../app/data/reviews'
import { faq } from '../../app/data/faq'
import { site } from '../../app/data/site'

const root = resolve(__dirname, '../..')
const pl = JSON.parse(readFileSync(resolve(root, 'i18n/locales/pl.json'), 'utf8'))

function hasKey(path: string): boolean {
  return (
    path
      .split('.')
      .reduce<unknown>(
        (o, p) => (o as Record<string, unknown>)?.[p],
        pl as Record<string, unknown>,
      ) !== undefined
  )
}

describe('services data', () => {
  it('has unique ids and resolvable i18n title/desc keys', () => {
    const ids = services.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const s of services) {
      expect(hasKey(`${s.key}.title`), `${s.key}.title`).toBe(true)
      expect(hasKey(`${s.key}.desc`), `${s.key}.desc`).toBe(true)
      expect(s.icon).toMatch(/^Ph/)
    }
  })
})

describe('product data', () => {
  it('covers both groups with items', () => {
    expect(productGroups.map((g) => g.id)).toEqual(['blocks', 'stands'])
    expect(blocks.items.length).toBeGreaterThanOrEqual(3)
    expect(stands.items.length).toBeGreaterThanOrEqual(4)
  })

  it('every product references an existing image and valid i18n keys', () => {
    for (const g of productGroups) {
      for (const p of g.items) {
        expect(existsSync(resolve(root, 'public', p.image.replace(/^\//, ''))), p.image).toBe(true)
        expect(hasKey(`${p.key}.title`), `${p.key}.title`).toBe(true)
        expect(hasKey(`${p.key}.desc`), `${p.key}.desc`).toBe(true)
        expect(hasKey(`${p.key}.spec`), `${p.key}.spec`).toBe(true)
        expect(p.imageAlt.length).toBeGreaterThan(3)
      }
    }
  })
})

describe('reviews data', () => {
  it('has bilingual, attributed, short reviews', () => {
    expect(reviews.length).toBeGreaterThanOrEqual(3)
    for (const r of reviews) {
      expect(r.author.trim().length).toBeGreaterThan(0)
      expect(r.role.trim().length).toBeGreaterThan(0)
      expect(r.text.pl.trim().length).toBeGreaterThan(0)
      expect(r.text.en.trim().length).toBeGreaterThan(0)
      expect(r.rating).toBeGreaterThanOrEqual(1)
      expect(r.rating).toBeLessThanOrEqual(5)
    }
  })
})

describe('faq data', () => {
  it('has unique ids and bilingual, non-empty Q&A', () => {
    const ids = faq.map((f) => f.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(faq.length).toBeGreaterThanOrEqual(3)
    for (const f of faq) {
      for (const l of ['pl', 'en'] as const) {
        expect(f.q[l].trim().length, `${f.id}.q.${l}`).toBeGreaterThan(5)
        expect(f.a[l].trim().length, `${f.id}.a.${l}`).toBeGreaterThan(10)
      }
    }
  })
})

describe('site info', () => {
  it('points at the production domain and correct location', () => {
    expect(site.domain).toBe('mechanik-kobierzyce.pl')
    expect(site.url).toBe('https://mechanik-kobierzyce.pl')
    expect(site.address.locality).toBe('Chrzanów')
    expect(site.address.municipality).toBe('Kobierzyce')
    expect(site.address.region).toBe('dolnośląskie')
    expect(site.geo.lat).toBeCloseTo(50.993, 2)
    expect(site.geo.lng).toBeCloseTo(16.932, 2)
    expect(site.phones.length).toBeGreaterThanOrEqual(1)
    expect(site.email).toContain('@')
    expect(site.hours.length).toBe(3)
  })
})
