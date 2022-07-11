import { expect, test as baseTest } from '@playwright/test';
import { MainPage, SearchPage } from 'po';

const test = baseTest.extend<{ mainPage: MainPage; searchPage: SearchPage }>({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
});

export { test, expect };
