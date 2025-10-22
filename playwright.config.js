// @ts-check
import { defineConfig } from '@playwright/test'

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  // Retry failed tests in CI
  retries: process.env.CI ? 2 : 0,
  // Limit parallel workers in CI
  workers: process.env.CI ? 1 : undefined,
  // Enable full parallel execution for local development
  fullyParallel: !process.env.CI,
  use: {
    // Configure browsers for headless mode in CI
    headless: process.env.CI ? true : false,
    // Set viewport size
    viewport: { width: 1920, height: 1080 },
    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,
    // Add navigation timeout
    navigationTimeout: 30000,
    // Add action timeout
    actionTimeout: 15000,
    // Enable screenshots and videos always
    screenshot: 'on',
    video: 'on',
  },
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180000,
    stderr: 'pipe',
    stdout: 'pipe',
  },
  projects: [
    {
      name: 'Chrome',
      use: {
        ...require('@playwright/test').devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },

        launchOptions: {
          args: process.env.CI
            ? [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
              ]
            : [],
        },
      },
    },
    {
      name: 'Firefox',
      use: {
        ...require('@playwright/test').devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
  // Configure reporters
  reporter: process.env.CI
    ? [['github'], ['html']]
    : [['list'], ['html', { open: 'never' }]],
})
