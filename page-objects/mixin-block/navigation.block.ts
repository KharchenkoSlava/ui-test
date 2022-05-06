import { Locator, Page } from '@playwright/test';

export default class NavigationBlock {
  readonly page: Page 
    projectsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.projectsLink = page.locator('nav[aria-label="Primary"] a[href="/projects"]');
  }

  async gotoProjects() {
    await this.projectsLink.click();
    await this.page.waitForNavigation({ url: /\/projects/ });
  }
}
