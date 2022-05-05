import { test, expect } from '@playwright/test';

test.describe.only('Lokalise', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
  });

  test('add first project', async ({ page }) => {
    await expect(page.locator('button[aria-label="Profile menu"]')).toBeVisible();
  });

  test('add nth project', async ({ page }) => {
    await expect(page.locator('button[aria-label="Profile menu"]')).toBeVisible();
  });
});
