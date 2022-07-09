import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../base.page';
import { decoratePage } from 'helpers';

class SearchPage extends BasePage {
  private readonly firstResult: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstResult = this.page.locator('#rso > div').nth(0);
  }

  async checkFirstResultLink(expectedLink: string) {
    const actualLink = await this.firstResult.locator('link').getAttribute('href');
    expect(actualLink, 'Wrong search result').toBe(expectedLink);
  }
}

decoratePage(SearchPage);

export { SearchPage };
