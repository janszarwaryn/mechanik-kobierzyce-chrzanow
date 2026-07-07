# Audit - mechanik-kobierzyce-chrzanow

Date: 2026-07-06

## Summary

| Area | Before | After |
|---|---|---|
| Unit + component tests (Vitest) | 62 passing | 62 passing |
| E2E (Playwright) | 7 passing | 7 passing |
| `nuxi generate` (SSG) | 0 errors | 0 errors |
| `nuxi typecheck` | 4 TS errors | 0 errors |
| ESLint | no config (crash) | configured, 0 problems |
| Docker build | none | multi-stage, passes |

## Findings and fixes

### Tooling
- **ESLint had no flat config** (v9 crash). Added `@nuxt/eslint` module +
  `eslint.config.mjs`; installed missing `typescript` / `vue-tsc`.
- **4 TypeScript errors** fixed:
  - `useSiteMeta` used removed i18n option `addSeoAttributes`.
  - `LocaleSwitch` passed `string` where `'pl' | 'en'` expected.
  - `jsonld` `pad()` could receive `undefined`.
  - `nuxt.config` used unknown i18n bundle key `optimizeTranslationDirective`.
- Cosmetic: `vue-tsc` prints a `vue-router/volar` resolve warning (version
  skew); non-fatal, typecheck exits 0.

### SEO / GEO / AEO (addressed in follow-up commits)
- Added `FAQPage` JSON-LD (answer-engine optimization).
- Added `BreadcrumbList`, `Organization`, `WebSite` JSON-LD.
- Added `Service` / `OfferCatalog` to the LocalBusiness node.
- Added geo meta (`geo.region=PL-DS`, `geo.placename`, `geo.position`, `ICBM`).
- Added `keywords` meta per page (mechanik, serwis, wulkanizacja, naprawa aut,
  blokady parkingowe, stojaki rowerowe + locality terms).
- Fixed non-descriptive home nav link text flagged by the link checker.

### Security

- **SQL injection: not applicable.** The site is a static Nuxt SSG build served
  as flat files by nginx. There is no database, no SQL, no server-side query
  layer, and (after the contact form was removed) no user-submitted input that
  reaches a server. There is no SQLi attack surface.
- **XSS:** the only `innerHTML` usage is JSON-LD injection via
  `JSON.stringify()` of first-party data (no user input), so it cannot inject
  markup. All page copy is bound through Vue text interpolation (escaped).
- **Headers:** nginx sends `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy` and a `Content-Security-Policy`
  (self + inline for hydration, Google Maps frame only).
- **External links:** all `target="_blank"` links use `rel="noopener"`.

### Performance

Measured on the production SSG build served statically:

| Metric | Value |
|---|---|
| TTFB | ~10 ms |
| DOMContentLoaded | ~140 ms |
| Load | ~155 ms |
| LCP | ~285 ms |
| JS (gzip, main + secondary) | ~134 KB |

Production is fast. Perceived "slow loading" was **`yarn dev`**, not the site:
the repo is npm-locked, so yarn re-resolved the whole tree each start. Fix:
use `npm run dev` (~6-7s cold, ~80 ms warm navigations); `packageManager` is
pinned to npm and `yarn.lock` is gitignored. Dev is further sped up by
pre-bundling heavy deps (`optimizeDeps.include`) and Vite entry `warmup`.

### Delivery
- Added multi-stage **Dockerfile** (Node build -> nginx serving the static
  `.output/public`) and `.dockerignore`; `docker build` passes.

## How to reproduce

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run generate
npm run test:e2e
docker build -t mechanik-kobierzyce .
```
