import { expect, test as baseTexst, Page } from "@playwright/test";
import { MainPage, SearchPage } from '../po';        

const test = baseTexst.extend<{ mainPage: MainPage; searchPage: SearchPage }>({
  mainPage: async ({ page }, use) => { await use(new MainPage(page)); },
  searchPage: async ({ page }, use) => { await use(new SearchPage(page)); },
})

export { test, expect };
