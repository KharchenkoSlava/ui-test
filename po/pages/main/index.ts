import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { decoratePage } from '../../../helpers';

class MainPage extends BasePage {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = this.page.locator('input[name="q"]');
    this.searchButton = this.page.locator('input[value="Пошук Google"]').nth(0); 
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.page.waitForNavigation({ url: '**/search?**' });
  }
}

decoratePage(MainPage);

export { MainPage };