import { expect, test as baseTest } from '@playwright/test';
import { LoginPage, NotConfirmedAlarmsPage } from 'po';

const test = baseTest.extend<{ logInPage: LoginPage; notConfirmedAlarmsPage: NotConfirmedAlarmsPage }>({
  logInPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  notConfirmedAlarmsPage: async ({ page }, use) => {
    await use(new NotConfirmedAlarmsPage(page));
  },
});

export { test, expect };
