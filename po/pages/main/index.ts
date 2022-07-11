import { Locator, Page } from '@playwright/test';
import { decoratePage } from 'helpers';
import { BasePage } from '../base.page';
import { SearchFragment } from './fragments/search';

class MainPage extends BasePage {
  private readonly switchLanguageTextBlock: Locator;
  readonly searchFragment: SearchFragment;

  constructor(page: Page) {
    super(page);
    this.switchLanguageTextBlock = this.page.locator('#gws-output-pages-elements-homepage_additional_languages__als');
    this.searchFragment = new SearchFragment(page);
  }

  async getSwitchLanguageTextBlock() {
    const text = await this.switchLanguageTextBlock.innerText();
    return text;
  }
}

decoratePage(MainPage);
export { MainPage };
