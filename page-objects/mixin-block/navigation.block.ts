import { Locator, Page } from '@playwright/test';

export default class NavigationBlock {
  private readonly page: Page 
  private readonly projectsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.projectsLink = page.locator('nav[aria-label="Primary"] a[href="/projects"]');
  }

  async gotoProjects() {
    await this.projectsLink.click();
    await this.page.waitForNavigation({ url: /\/projects/ });
  }
}
