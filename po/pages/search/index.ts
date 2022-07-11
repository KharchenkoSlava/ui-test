import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../base.page';
import { decoratePage } from 'helpers';

class SearchPage extends BasePage {
  private readonly firstResult: Locator;

  constructor(page: Page) {
    super(page);
    this.firstResult = this.page.locator('#rso > div:nth-child(1)');
  }

  checkFirstResultLink(expectedLink: string) {
    const cite = this.firstResult.locator('cite').nth(0);
    expect(cite, 'Wrong search result').toContainText(expectedLink);
  }
}

decoratePage(SearchPage);

export { SearchPage };
