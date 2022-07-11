import { chromium, FullConfig, expect } from '@playwright/test';
import { email } from 'data';
import { LoginPage, NotConfirmedAlarmsPage } from 'po';

async function globalSetup(config: FullConfig) {
  const { storageState } = config.projects[0].use;
  // Can be done via API
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.signIn(email.viacheslavKharchenko);
  const notConfirmedAlarmsPage = new NotConfirmedAlarmsPage(page);
  await expect(notConfirmedAlarmsPage.title).toBeVisible();
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;
