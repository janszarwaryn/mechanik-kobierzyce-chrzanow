import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Read raw JSON (not `import`) so the i18n bundler transform does not turn the
// locale files into precompiled message ASTs.
const load = (l: string) =>
  JSON.parse(readFileSync(resolve(__dirname, `../../i18n/locales/${l}.json`), 'utf8'))
const pl = load('pl')
const en = load('en')

function keyPaths(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) => {
    const path = prefix ? `${prefix}.${k}` : k
    return v && typeof v === 'object' && !Array.isArray(v)
      ? keyPaths(v as Record<string, unknown>, path)
      : [path]
  })
}

describe('i18n key parity', () => {
  const plKeys = keyPaths(pl).sort()
  const enKeys = keyPaths(en).sort()

  it('has no keys present in PL but missing in EN', () => {
    const missing = plKeys.filter((k) => !enKeys.includes(k))
    expect(missing, `missing in en.json: ${missing.join(', ')}`).toEqual([])
  })

  it('has no keys present in EN but missing in PL', () => {
    const missing = enKeys.filter((k) => !plKeys.includes(k))
    expect(missing, `missing in pl.json: ${missing.join(', ')}`).toEqual([])
  })

  it('has non-empty string values for every leaf in both locales', () => {
    for (const [label, dict] of [
      ['pl', pl],
      ['en', en],
    ] as const) {
      const empties = keyPaths(dict).filter((path) => {
        const val = path
          .split('.')
          .reduce<unknown>((o, p) => (o as Record<string, unknown>)?.[p], dict)
        return typeof val !== 'string' || val.trim() === ''
      })
      expect(empties, `empty values in ${label}.json`).toEqual([])
    }
  })
})
