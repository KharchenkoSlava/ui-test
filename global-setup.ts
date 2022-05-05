import { chromium, FullConfig, expect } from '@playwright/test';
import { USER } from './data/common.data';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(baseURL);
  await page.locator('input[placeholder="user@company.com"]').fill(USER.email);
  await page.locator('input[placeholder="password"]').fill(USER.password);
  await page.locator('button', { hasText: 'Log in' }).click(); 
  await expect(page.locator('button[aria-label="Profile menu"]')).toBeVisible();
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;