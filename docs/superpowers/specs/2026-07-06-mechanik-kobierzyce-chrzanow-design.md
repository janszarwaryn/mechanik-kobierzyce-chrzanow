# Design: mechanik-kobierzyce-chrzanow

Date: 2026-07-06

## Goal

Reproduce the content of the static `CarService` site (business: car repair +
parking blocks + bike stands) on a modern Nuxt engine, as a bilingual (PL/EN)
marketing site with a fresh, anti-slop design, **RWD (mobile + desktop)**, and
**strong local SEO**. Ship as a new GitHub repo
`janszarwaryn/mechanik-kobierzyce-chrzanow`. Built test-first (TDD).

Production domain: **mechanik-kobierzyce.pl** (used for canonical, sitemap, OG,
hreflang).

### Location (SEO-critical, do not confuse)

The business sits in **Chrzanów - a village in gmina Kobierzyce, powiat
wrocławski, województwo dolnośląskie** (near Wrocław). This is NOT Chrzanów in
Małopolska. Map coordinates from source: `50.993063, 16.931976`. Local SEO
targets: **Kobierzyce, Chrzanów, Wrocław, dolnośląskie** (gmina Kobierzyce
first, exact locality Chrzanów).

## Source material

- `CarService/` (cloned reference, plain HTML/CSS/JS). Pages: index,
  uslugi, blokady-parkingowe, stojaki-rowerowe, opis-blokady, kontakt
  (+ detail variants bp-1, sr-1).
- `boilerplate-next-i18n/` (cloned reference, Next.js). Reference ONLY for
  i18n structure and design-token ideas. NOT the engine (user chose Nuxt).
- Both reference clones are excluded from the project repo via `.gitignore`.

### Extracted content facts

- Business: car mechanic + parking blocks (blokady parkingowe) + bike stands
  (stojaki rowerowe). Location: Kobierzyce / Chrzanów / Wrocław area, PL.
- Contact: phone `+48 601 996 692`, `+48 515 720 761`;
  email `mechanik.chrzanow@gmail.com`; Chrzanów 55-040.
- Services: opony (naprawa/wymiana), zawieszenie, mechanika samochodowa,
  uszczelki pod głowicą, montaż zakupionych części, ogólna naprawa.
- Parking blocks: typ U, typ M, typ MOTYL.
- Bike stands: łuk ocynkowany (#1), #2, #3, #4.
- Social proof: reviews section, "ponad 20 lat doświadczenia".
- Images: `CarService/images/*.jpg` (work-1..9, about, man, bg_*),
  `CarService/imagesx/*.jpg` (blokada_*, stojak_*).

## Design read & dials

Reading this as: a local automotive-service + industrial-products marketing
site for Kobierzyce/Chrzanów customers and businesses, trust-first with a
product-showcase, leaning toward a clean modern automotive language (steel/zinc
neutrals + one warm safety accent) on Tailwind v4 + sans-display type.

Dials (taste-skill Section 1):

- `DESIGN_VARIANCE: 6` - modern, asymmetric, but not chaotic (trust matters).
- `MOTION_INTENSITY: 4` - subtle scroll-reveal + hover; honor reduced-motion.
- `VISUAL_DENSITY: 4` - daily-app spacing.

## Visual system

- **Accent:** safety-amber (`amber-500` family, `#f59e0b`), locked page-wide.
  Fits parking-block / industrial world. NOT AI-purple. One accent only.
- **Neutrals:** zinc/steel scale. Off-black `zinc-950`, off-white (never pure
  `#000`/`#fff`).
- **Theme:** auto (`prefers-color-scheme`) with manual toggle; ONE theme per
  page (no mid-page inversion). Both modes designed and tested.
- **Type:** Space Grotesk (display) + Inter Tight (body), self-hosted via
  `@fontsource`. No serif. No Inter-as-default-display.
- **Corner radius:** one scale - cards `rounded-2xl` (16px), inputs
  `rounded-lg`, buttons `rounded-full` (pill). Consistent everywhere.
- **Icons:** `@phosphor-icons/vue`, single family, `weight="regular"`.
  No hand-rolled SVG icons.

## Information architecture (6 routes)

| Route | Purpose | Key blocks |
|---|---|---|
| `/` | Home | Asymmetric split hero, offer bento (3 cells), 20+yr experience band, work gallery (masonry), reviews carousel, contact CTA |
| `/uslugi` | Car services | Intro, service list as card grid, schedule |
| `/blokady-parkingowe` | Parking blocks | Product grid: typ U / M / Motyl, each photo + name + spec chips |
| `/stojaki-rowerowe` | Bike stands | Product grid: łuk ocynkowany / #2 / #3 / #4 |
| `/opis-blokady` | SEO description | Editorial article, keywords, internal links |
| `/kontakt` | Contact | Form (full states), map embed, harmonogram (hours table) |

i18n route strategy: `prefix_except_default` - PL default (no prefix),
English under `/en/*`. All copy keyed in `i18n/locales/{pl,en}.json`.

Layout-family discipline (taste Section 4.7): at least 4 distinct section
layout families across the home page; no family repeats; max 1 eyebrow per 3
sections; no 3-equal-cards; heroes use `min-h-[100dvh]`, `pt-24` cap, ≤2-line
headline, ≤20-word subtext, one primary + one secondary CTA.

## Component & data architecture

Components (`components/`): `AppHeader` (nav one-line, ≤80px, lang toggle,
theme toggle), `AppFooter`, `HeroSplit`, `OfferBento`, `OfferCard`,
`ExperienceBand`, `WorkGallery`, `ReviewCarousel`, `ReviewCard`, `ProductGrid`,
`ProductCard`, `ServiceCard`, `ContactForm`, `ScheduleTable`, `LocaleSwitch`,
`ThemeToggle`.

Data (`~/data/`, typed TS): `services.ts`, `products.ts` (blokady + stojaki
with image refs + spec chips), `reviews.ts`, `site.ts` (contact, hours). Each
item carries i18n keys, not raw strings; components resolve via `t()`.

Composables (`composables/`): `useContactForm` (validation + submit state
machine: idle | submitting | error | success), `useSiteMeta` (SEO/OG per page).

Images: port `CarService/images` + `imagesx` into `assets/img/`, serve via
`@nuxt/image`. `priority` on hero image for LCP.

## Stack

- Nuxt 4, Vue 3, TypeScript.
- `@nuxtjs/i18n` (pl default, en; `prefix_except_default`).
- Tailwind v4 (Vite plugin, not the postcss `tailwindcss` plugin).
- `@nuxt/image` (image optimization).
- `@nuxtjs/seo` (meta, sitemap.xml, robots.txt, canonical, OG, JSON-LD,
  hreflang - originals had sitemap/robots).
- `@vueuse/motion` (scroll-reveal + hover; Vue equivalent of Motion).
- `@phosphor-icons/vue` (icons).
- `@fontsource/space-grotesk`, `@fontsource/inter-tight`.
- Render mode: SSG (`nuxi generate`) - fits a static business site and
  GitHub Pages / static hosting.

## SEO strategy (primary focus)

Domain `mechanik-kobierzyce.pl`. Bilingual PL (default) + EN with full hreflang.
Every page gets, via `useSiteMeta` + `@nuxtjs/seo`:

- **Unique title + meta description** per page and per locale, keyworded for
  gmina Kobierzyce + Chrzanów + Wrocław (PL) and their EN equivalents.
- **Canonical** URL (absolute, `https://mechanik-kobierzyce.pl/...`).
- **hreflang** alternates: `pl`, `en`, `x-default` per page.
- **Open Graph + Twitter** cards (title, description, image, locale,
  `og:locale:alternate`).
- **`lang` attribute** set correctly per locale on `<html>`.

Structured data (JSON-LD), site-wide + per page:

- **`AutoRepair` / `LocalBusiness`** with `name`, `address`
  (Chrzanów, gmina Kobierzyce, dolnośląskie, `55-040`), `geo`
  (`50.993063, 16.931976`), `telephone`, `openingHoursSpecification`
  (from harmonogram), `areaServed` (Kobierzyce, Chrzanów, Wrocław),
  `sameAs`, `priceRange`.
- **`Product`** JSON-LD for parking-block and bike-stand items.
- **`BreadcrumbList`** on sub-pages.
- **`WebSite`** + `Organization`.

Technical SEO: `sitemap.xml` (all routes x both locales, via `@nuxtjs/seo`),
`robots.txt` (allow all + sitemap ref), semantic HTML (one `h1`/page, heading
order, `<nav>`/`<main>`/`<footer>` landmarks, descriptive `alt` on every image),
fast SSG output for Core Web Vitals (LCP hero `priority`, no CLS, lazy
below-fold images).

## Responsive design (RWD - mobile + desktop)

- Breakpoints: `sm 640 / md 768 / lg 1024 / xl 1280`. Mobile-first.
- Every multi-column layout declares its `< 768px` single-column collapse
  explicitly in the component (no "Tailwind handles it" assumptions).
- Page container `max-w-7xl mx-auto`, `px-4 md:px-6 lg:px-8`.
- Nav: single line on desktop (≤80px); hamburger drawer below `lg`.
- Hero: `min-h-[100dvh]`, split on desktop, stacked on mobile; font scale
  planned with the asset.
- Tap targets ≥44px on mobile; forms full-width on mobile.
- Verified in dev at mobile (375px) and desktop (≥1280px) widths in both
  light and dark mode before ship.

## Footer

Minimalist. Contact essentials + nav + at the very bottom a single line:
`Created by jspace.pl` where `jspace.pl` is a link to `https://jspace.pl`
(external, `rel="noopener"`). Subtle, low-emphasis styling.

## Testing strategy (TDD - mandatory)

Tooling: Vitest + `@nuxt/test-utils` + `@vue/test-utils` for unit/component;
Playwright for E2E. Every unit is written test-first (red -> green -> refactor).

Unit / component tests:

1. **i18n key-parity** - every key present in `pl.json` also exists in
   `en.json` and vice versa (no missing translations). Fails on drift.
2. **Data schema** - `services`, `products`, `reviews` conform to typed shape
   (required fields, valid image refs, referenced i18n keys exist).
3. **`useContactForm`** - validation rules (required name, valid email/phone,
   message min length) and the state machine transitions.
4. **Component render** - each component renders its expected content/props
   (e.g. `ProductCard` shows name + image + chips; `HeroSplit` renders one
   primary CTA; nav renders all 6 routes).
5. **Route smoke** - each of the 6 pages mounts without error in both locales.
6. **SEO meta** - each page exposes a unique non-empty title + meta
   description; canonical is absolute under `mechanik-kobierzyce.pl`; hreflang
   `pl`/`en`/`x-default` present.
7. **JSON-LD** - `LocalBusiness` schema is valid and contains the correct
   address (Chrzanów, gmina Kobierzyce, dolnośląskie), geo coords, phone, and
   opening hours; `Product` schema present on product pages.
8. **Footer** - renders `Created by jspace.pl` with an anchor to
   `https://jspace.pl`.

E2E (Playwright):

- Navigation between all pages works.
- Language switch PL <-> EN changes URL prefix and visible copy.
- Contact form: empty submit shows inline errors; valid submit reaches success
  state.

## Repo & delivery

- Build Nuxt app at repo root. Reference clones (`CarService/`,
  `boilerplate-next-i18n/`) stay local, `.gitignore`d.
- `git init` (done), commits along the way.
- Create `janszarwaryn/mechanik-kobierzyce-chrzanow` on GitHub (public), push.
- README documents dev/test/build/generate commands.

## Out of scope

- Backend / real form delivery (form validates + shows success; wiring an email
  provider is a later task; document the seam).
- CMS. Content lives in typed data + i18n JSON.
- New photography. Reuse ported CarService images.

## Open seams (documented, not blocking)

- Contact-form submission endpoint: composable exposes a `submit()` seam;
  default implementation is a stub returning success. Swap for a real endpoint
  (Formspree / Nuxt server route + email) later.
- English copy: initial EN is a faithful translation of the PL source; a native
  review pass can refine later.
