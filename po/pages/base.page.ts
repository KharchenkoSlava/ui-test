import { Page } from '@playwright/test';
import config from '../../playwright.config';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(query: string = '/') {
    await this.page.goto(`${config.use.baseURL}${query}`);
  }
}