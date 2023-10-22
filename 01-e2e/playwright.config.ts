import { defineConfig, devices } from '@playwright/test';

// https://playwright.dev/docs/ci
// https://playwright.dev/docs/test-configuration
export default defineConfig({
  retries: process.env.CI ? 2 : 0,
  timeout: 30 * 1000, // Each test is given 30 seconds.
  use: {
    screenshot: 'only-on-failure',
    video: process.env.CI ? 'retain-on-failure' : 'on',
    trace: process.env.CI ? 'retain-on-failure' : 'on',
  },
  reporter: [['html', { open: 'always' }], ['line']],
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },  */
  ],
});
