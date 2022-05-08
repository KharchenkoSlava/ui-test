import { chromium, FullConfig, expect } from '@playwright/test';
import { USER } from './data/common.data';
import lokaliseHelper from './helpers/lokalise.helper';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;

  // Can be done via API 
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(baseURL);
  await page.locator('input[placeholder="user@company.com"]').fill(USER.email);
  await page.locator('input[placeholder="password"]').fill(USER.password);
  await page.locator('button', { hasText: 'Log in' }).click(); 
  await expect(page.locator('button[aria-label="Profile menu"]')).toBeVisible();
  await page.context().storageState({ path: storageState as string });
  await browser.close();

  // Clean test data
  await lokaliseHelper.deleteAllProjects();
}

export default globalSetup;