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

**SEO gap pass (research-backed: Apify SERP/forum scrape + Ref docs):**
- Added `AggregateRating` + `Review` nodes to LocalBusiness (star rich results
  in Google).
- Expanded FAQ with real forum-style questions (timing-belt duration, original
  vs replacement parts, fitting supplied parts, paid diagnostics, appointments)
  for AEO / "People Also Ask".
- Added trust/reassurance copy per the competitor set (original + trusted
  replacement parts, diagnosis included, upfront quote, supplied-part fitting).
- Expanded keyword coverage (wymiana rozrządu, sprzęgła, klocków, oleju,
  diagnostyka) reflecting real forum queries.
- Added `apple-touch-icon`, `site.webmanifest`, `theme-color`, absolute
  `og:image` + `og:image:alt`, `og:site_name`.
- **Known gap (future):** competitors also list *klimatyzacja* and *diagnostyka
  komputerowa*; add as services if the business offers them.

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

**Docker hardening pass (issues found and fixed):**
- **Healthcheck never went healthy**: `wget http://localhost/` resolved to IPv6
  `::1` while nginx listened IPv4-only -> exit 1 forever. Fixed: probe
  `127.0.0.1` and add `listen [::]:80`.
- **Security headers were dropped on `/_nuxt/` and `/_ipx/`**: nginx does not
  inherit `add_header` into a location that sets its own. Fixed by moving the
  headers into a shared snippet `include`d in the server block and both asset
  locations.
- **Duplicate `Cache-Control`** on `/_nuxt/` (`expires` + `add_header`).
  Consolidated to a single `public, max-age=31536000, immutable`.
- **`site.webmanifest` served as `application/octet-stream`**. Added the correct
  `application/manifest+json` type.
- Added `text/xml` + manifest to `gzip_types` (sitemaps now gzipped), `gzip_vary`,
  a BuildKit npm cache mount, and `--start-period`/`--retries` on the healthcheck.
- Verified: `nginx -t` OK, all routes 200, `/nope` -> 404, container reports
  `healthy`, image ~66 MB. Sitemap chain is correct (`robots.txt` ->
  `sitemap_index.xml` -> `__sitemap__/{pl-PL,en-US}.xml`, all valid XML).

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
