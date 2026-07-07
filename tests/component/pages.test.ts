// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Index from '../../app/pages/index.vue'
import Uslugi from '../../app/pages/uslugi.vue'
import Blokady from '../../app/pages/blokady-parkingowe.vue'
import Stojaki from '../../app/pages/stojaki-rowerowe.vue'
import Opis from '../../app/pages/opis-blokady.vue'
import Kontakt from '../../app/pages/kontakt.vue'

const pages = [
  ['index', Index],
  ['uslugi', Uslugi],
  ['blokady-parkingowe', Blokady],
  ['stojaki-rowerowe', Stojaki],
  ['opis-blokady', Opis],
  ['kontakt', Kontakt],
] as const

describe('page smoke', () => {
  for (const [name, comp] of pages) {
    it(`${name} mounts and renders exactly one h1`, async () => {
      const wrapper = await mountSuspended(comp)
      const h1 = wrapper.findAll('h1')
      expect(h1.length, `${name} h1 count`).toBe(1)
      expect(h1[0]!.text().length).toBeGreaterThan(2)
    })
  }

  it('kontakt shows contact info with a tel: call button and no form', async () => {
    const wrapper = await mountSuspended(Kontakt)
    expect(wrapper.find('form').exists()).toBe(false)
    const tel = wrapper.findAll('a').find((a) => a.attributes('href')?.startsWith('tel:'))
    expect(tel).toBeTruthy()
    const mailto = wrapper.findAll('a').find((a) => a.attributes('href')?.startsWith('mailto:'))
    expect(mailto).toBeTruthy()
  })

  it('product pages render one card per catalogue item', async () => {
    const blocks = await mountSuspended(Blokady)
    expect(blocks.findAll('article').length).toBe(3)
    const stands = await mountSuspended(Stojaki)
    expect(stands.findAll('article').length).toBe(4)
  })
})
