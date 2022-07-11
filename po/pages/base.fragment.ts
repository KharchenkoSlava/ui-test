import { Locator, Page } from '@playwright/test';

export class BaseFragment {
  readonly page: Page;
  readonly rootSelector: string;
  readonly rootLocator: Locator;

  constructor(page: Page, rootSelector = '') {
    this.page = page;
    this.rootSelector = rootSelector;
    this.rootLocator = this.page.locator(rootSelector);
  }
}
