import { Locator, Page } from '@playwright/test';
import { BaseFragment } from '../../base.fragment';
import { decoratePage } from 'helpers';

class SearchFragment extends BaseFragment {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page, rootSelector = 'form[action="/search"]') {
    super(page, rootSelector);
    this.searchInput = this.rootLocator.locator('input[name="q"]');
    this.searchButton = this.rootLocator.locator('input[value="Пошук Google"]').nth(0);
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.page.waitForNavigation({ url: '**/search?**' });
  }
}

decoratePage(SearchFragment);
export { SearchFragment };
