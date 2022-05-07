import { Locator, Page } from '@playwright/test';
import config from '../playwright.config';
import NavigationBlock from './mixin-block/navigation.block';
import CreateKeyBlock from './blocks/create.key.block';

export default class ProjectPage {
  readonly page: Page 
  navigationBlock: NavigationBlock;
  createKeyBlock: CreateKeyBlock;
  keysList: Locator;
  keysName: Locator;
  spinnerLogo: Locator;
  keyName: (text: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigationBlock = new NavigationBlock(this.page);
    this.createKeyBlock = new CreateKeyBlock(this.page);
    this.keysList = this.page.locator('[id^="keyrowhead-"]');
    this.keysName = this.keysList.locator('a.edit-key');
    this.keyName = (text: string) => this.keysList.locator('a', { hasText: text });
    this.spinnerLogo = this.page.locator('#spinner-endless');
  }

  async goto(id: string) {
    await this.page.goto(`${config.use.baseURL}/project/${id}/?view=multi`);
  }

  async waitLoader() {
    await this.spinnerLogo.waitFor({ state: 'visible' });
    await this.spinnerLogo.waitFor({ state: 'hidden' });
  }  

  async createKeyAndWaitKey(name: string) {
    await this.createKeyBlock.createKey(name);
    await this.waitLoader();
    await this.keyName(name).waitFor({ state: 'visible' });
  }

  async getAllKeysName() {
    let keys = [];
    const count = await this.keysName.count();
    for (let i = 0; i < count; i++) {
      const name = await this.keysName.nth(i).innerText();
      keys.push(name);
    }
    return keys;
  }
}