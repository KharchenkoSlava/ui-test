import { Locator, Page } from '@playwright/test';
import config from '../playwright.config';
import NavigationBlock from './mixin-block/navigation.block';
import CreateKeyBlock from './blocks/create.key.block';

export default class ProjectPage {
  private readonly page: Page 
  readonly navigationBlock: NavigationBlock;
  private readonly createKeyBlock: CreateKeyBlock;
  private readonly keysList: Locator;
  private readonly keysName: Locator;
  private readonly keyName: (text: string) => Locator;
  private readonly translationSpan: (text: string) => Locator;
  private readonly translationPluralSpan: (text: string) => Locator;
  private readonly translationTextarea: Locator;
  private readonly translationSaveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigationBlock = new NavigationBlock(this.page);
    this.createKeyBlock = new CreateKeyBlock(this.page);
    this.keysList = this.page.locator('[id^="keyrowhead-"]');
    this.keysName = this.keysList.locator('a.edit-key');
    this.keyName = (text: string) => this.keysList.locator('a', { hasText: text });
    this.translationSpan = (translationId: string) => this.page.locator(`#transcell-${translationId} span`);
    this.translationPluralSpan = (translationId: string) => this.page.locator(`#transcell-${translationId} span.lokalise-popup-wrapper`);
    this.translationTextarea = this.page.locator('.lokalise-editor-wrapper textarea');
    this.translationSaveButton = this.page.locator('.lokalise-editor-wrapper button.editor-icon-button.save');
  }

  async goto(id: string) {
    await this.page.goto(`${config.use.baseURL}/project/${id}/?view=multi`);
  }

  async createKeyAndWaitKey(name: string) {
    await this.createKeyBlock.createKey(name);
    await this.keyName(name).waitFor({ state: 'visible' });
  }

  async waitForKeyIsVisible(name: string) {
    try {
      await this.keyName(name).waitFor({ state: 'visible', timeout: 3000 });
    } catch(e) {
      await this.page.reload();
      await this.keyName(name).waitFor({ state: 'visible' });
    }
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

  async setPlainTransaltion(translationId: string, translation: string) {
    await this.translationSpan(translationId).click();
    await this.translationTextarea.fill(translation);
    await this.translationSaveButton.click();
  }

  async getPlainTransaltion(translationId: string) {
    return await this.translationSpan(translationId).innerHTML();
  }

  async setAllPluralTransaltion(translationId: string, translations: Array<string>) {
    for (let i = 0; i < translations.length; i++) {
      await this.translationPluralSpan(translationId).nth(i).click();
      await this.translationTextarea.fill(translations[i]);
      await this.translationSaveButton.click();
    }
  }

  async getPlainPluralTransaltion(translationId: string, translations: Array<string>) {
    let translationList = [];
    for (let i = 0; i < translations.length; i++) {
      const translation = await this.translationPluralSpan(translationId).locator('span').nth(i).innerHTML();
      translationList.push(translation);
    }
    return translationList;
  }
}