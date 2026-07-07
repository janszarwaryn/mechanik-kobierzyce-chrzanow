# mechanik-kobierzyce-chrzanow

Bilingual (PL/EN) marketing site for a car garage + parking blocks + bike
stands business in **Chrzanów, gmina Kobierzyce** (powiat wrocławski, woj.
dolnośląskie, near Wrocław). Rebuilt from the legacy static `CarService` site
onto a modern **Nuxt 4** engine with a fresh, responsive design and strong
local SEO.

Production domain: **mechanik-kobierzyce.pl**

## Stack

- **Nuxt 4** (Vue 3, TypeScript), SSG output (`nuxi generate`)
- **@nuxtjs/i18n** - PL (default, no prefix) + EN (`/en/*`), full hreflang
- **Tailwind v4** - steel/zinc neutrals + safety-amber accent, light/dark
- **@nuxt/image** - image optimisation
- **@nuxtjs/seo** - canonical, sitemap, robots, Open Graph
- **schema.org JSON-LD** - `AutoRepair` LocalBusiness + `Product`
- **@vueuse/motion** - scroll reveal (honors `prefers-reduced-motion`)
- **@phosphor-icons/vue** - icons
- **Vitest + @nuxt/test-utils** (unit/component) and **Playwright** (e2e)

## Scripts

> Use **npm** (the repo is locked with `package-lock.json`). Running `yarn`
> creates a second lockfile, re-resolves the dependency tree on every start
> (slow `yarn dev`) and can drift transitive versions - which breaks the Nuxt
> test environment. `npm run dev` cold-starts in ~6-7s; warm navigations ~80ms.

```bash
npm run dev        # dev server (http://localhost:3000)
npm run generate   # static SSG build -> .output/public
npm run preview    # preview a build
npm test           # unit + component tests (Vitest)
npm run test:e2e   # end-to-end tests (Playwright, builds + serves SSG)
npm run typecheck  # nuxt typecheck
```

## Structure

```
app/
  components/   UI (header, footer, hero, product/service cards, form, ...)
  composables/  useContactForm, useSiteMeta, useStructuredData, useTheme
  data/         typed content (site NAP/geo/hours, services, products, reviews)
  pages/        6 routes (index, uslugi, blokady-parkingowe,
                stojaki-rowerowe, opis-blokady, kontakt)
  utils/        validation, jsonld builders
  assets/css/   Tailwind theme tokens
i18n/locales/   pl.json, en.json (key-parity enforced by a test)
public/img/     ported photography
tests/          unit, component, e2e
docs/superpowers/specs/  design spec
```

## SEO

Every page carries a unique title + meta description (PL and EN), an absolute
canonical, hreflang alternates (`pl` / `en` / `x-default`), Open Graph cards,
and one `h1`. Site-wide `AutoRepair` LocalBusiness JSON-LD includes the address
(Lipowa 24A, Chrzanów, gmina Kobierzyce), geo coordinates, phone and opening
hours; product pages add `Product` JSON-LD. Local keywords target gmina
Kobierzyce, Chrzanów and Wrocław.

## Contact form

Client-side validation with a documented delivery seam (`deliverContact` in
`useContactForm`) - swap the stub for Formspree or a Nuxt server route to wire
real e-mail delivery.

## Deploy

Static output (`npm run generate` -> `.output/public`) deploys to any static
host (GitHub Pages, Netlify, Cloudflare Pages, ...). Set the production URL in
`nuxt.config.ts` (`site.url`).

---

Created by [jspace.pl](https://jspace.pl)
