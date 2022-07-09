import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve('./global-setup'),
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 15000,
  },
  forbidOnly: false,
  retries: 0,
  workers: 4,
  reporter: [['html', { open: 'never' }]],
  use: {
    actionTimeout: 5000,
    baseURL: 'https://www.google.com',
    screenshot: 'only-on-failure',
    ignoreHTTPSErrors: true,
    headless: false,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
  outputDir: 'test-results/',
};

export default config;
