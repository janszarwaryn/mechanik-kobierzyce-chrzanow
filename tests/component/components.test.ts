// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppFooter from '../../app/components/AppFooter.vue'
import AppHeader from '../../app/components/AppHeader.vue'
import ProductCard from '../../app/components/ProductCard.vue'
import ServiceCard from '../../app/components/ServiceCard.vue'
import { blocks } from '../../app/data/products'
import { services } from '../../app/data/services'

describe('AppFooter', () => {
  it('renders the "Created by jspace.pl" credit linking jspace.pl', async () => {
    const wrapper = await mountSuspended(AppFooter)
    const link = wrapper.findAll('a').find((a) => a.text().includes('jspace.pl'))
    expect(link).toBeTruthy()
    expect(link!.attributes('href')).toBe('https://jspace.pl')
    expect(wrapper.text()).toContain('Created by')
  })
})

describe('AppHeader', () => {
  it('renders all six navigation destinations', async () => {
    const wrapper = await mountSuspended(AppHeader)
    const hrefs = wrapper.findAll('a').map((a) => a.attributes('href') ?? '')
    for (const path of [
      '/',
      '/uslugi',
      '/blokady-parkingowe',
      '/stojaki-rowerowe',
      '/opis-blokady',
      '/kontakt',
    ]) {
      expect(hrefs.some((h) => h === path || h.endsWith(path)), path).toBe(true)
    }
  })
})

describe('ProductCard', () => {
  it('renders a title, the spec-label chip and the image alt', async () => {
    const product = blocks.items[0]!
    const wrapper = await mountSuspended(ProductCard, {
      props: { product, specLabel: 'Typ' },
    })
    // localized title is non-empty; spec chip carries the passed label
    expect(wrapper.find('h3').text().length).toBeGreaterThan(3)
    expect(wrapper.text()).toContain('Typ')
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('alt')).toBe(product.imageAlt)
  })
})

describe('ServiceCard', () => {
  it('renders a localized service title and an icon', async () => {
    const service = services[0]!
    const wrapper = await mountSuspended(ServiceCard, { props: { service } })
    expect(wrapper.find('h3').text().length).toBeGreaterThan(3)
    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
