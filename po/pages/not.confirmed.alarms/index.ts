import { Locator, Page } from '@playwright/test';
import { decoratePage } from 'helpers';
import { BasePage } from '../base.page';
import { SearchFragment } from './fragments/search';

class NotConfirmedAlarmsPage extends BasePage {
  readonly title: Locator;
  readonly searchFragment: SearchFragment;

  constructor(page: Page) {
    super(page);
    this.title = this.page.locator('h1:has-text("Reports In Work")');
    this.searchFragment = new SearchFragment(page);
  }

  async goto(): Promise<void> {
    await super.goto('/anomalies/reportsInWork');
  }
}

decoratePage(NotConfirmedAlarmsPage);
export { NotConfirmedAlarmsPage };
