import { defineConfig, devices } from '@playwright/test'

// E2E against a locally-served preview build. Covers nav, language switch,
// and contact-form validation on both mobile and desktop viewports.
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  // E2E runs against the production SSG output (stable, no HMR reloads).
  webServer: {
    command: 'npm run generate && npx serve .output/public -l 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
})
