import { test, expect } from '@playwright/test'

test.describe('navigation', () => {
  test('navigates from home to the services page', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Mechanik Kobierzyce/)
    await page.getByRole('link', { name: 'Usługi', exact: true }).first().click()
    await expect(page).toHaveURL(/\/uslugi$/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('has exactly one h1 on the home page', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toHaveCount(1)
  })
})

test.describe('i18n', () => {
  test('switches language from PL to EN', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'en' }).first().click()
    await expect(page).toHaveURL(/\/en$/)
    await expect(page).toHaveTitle(/Garage|parking blocks/i)
    await expect(page.locator('html')).toHaveAttribute('lang', /en/)
  })
})

test.describe('SEO', () => {
  test('home exposes canonical, hreflang and LocalBusiness JSON-LD', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://mechanik-kobierzyce.pl',
    )
    expect(await page.locator('link[hreflang]').count()).toBeGreaterThanOrEqual(3)
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents()
    const joined = ld.join('')
    expect(joined).toContain('AutoRepair')
    expect(joined).toContain('Chrzanów')
    expect(joined).toContain('50.993063')
    // GEO + AEO signals
    expect(joined).toContain('FAQPage')
    expect(joined).toContain('Organization')
    await expect(page.locator('meta[name="keywords"]')).toHaveAttribute(
      'content',
      /mechanik Kobierzyce/,
    )
    await expect(page.locator('meta[name="geo.region"]')).toHaveAttribute('content', 'PL-DS')
  })

  test('a sub-page emits a BreadcrumbList', async ({ page }) => {
    await page.goto('/uslugi')
    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join('')
    expect(ld).toContain('BreadcrumbList')
  })

  test('renders visible FAQ questions on a sub-page', async ({ page }) => {
    await page.goto('/uslugi')
    await expect(page.getByText('Jakie usługi samochodowe oferujecie?')).toBeVisible()
  })

  test('footer credits jspace.pl with a link', async ({ page }) => {
    await page.goto('/')
    const link = page.getByRole('link', { name: 'jspace.pl' })
    await expect(link).toHaveAttribute('href', 'https://jspace.pl')
  })
})

test.describe('contact form', () => {
  test('shows validation errors then reaches success', async ({ page }) => {
    await page.goto('/kontakt')
    await page.getByRole('button', { name: /Wyślij wiadomość/ }).click()
    await expect(page.locator('[role="alert"]')).toBeVisible()

    await page.locator('#cf-name').fill('Jan Kowalski')
    await page.locator('#cf-email').fill('jan@example.com')
    await page.locator('#cf-message').fill('Proszę o wycenę blokady parkingowej typu U.')
    await page.getByRole('button', { name: /Wyślij wiadomość/ }).click()
    await expect(page.locator('[role="status"]')).toBeVisible()
  })
})

test.describe('responsive', () => {
  test('mobile shows the hamburger, desktop shows inline nav', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 })
    await page.goto('/')
    await expect(page.getByRole('button', { name: /menu/i })).toBeVisible()

    await page.setViewportSize({ width: 1280, height: 900 })
    await expect(
      page.getByRole('navigation', { name: 'Główna nawigacja' }),
    ).toBeVisible()
  })
})
