import { Locator, Page } from '@playwright/test';

export default class CreateKeyBlock {
  private readonly page: Page;
  private readonly addKeyLink: Locator;
  private readonly keyNameInput: Locator;
  private readonly deviceDropDown: Locator;
  private readonly deviceOption: (text?: string) => Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addKeyLink = this.page.locator('[aria-label="Add first key"]');
    this.keyNameInput = this.page.locator('#addkey_div input');
    this.deviceDropDown = this.page.locator('div#s2id_device-s');
    this.deviceOption = (text: string) => this.page.locator(`div[role="option"]:has-text("${text}")`);
    this.submitButton = this.page.locator('#btn_addkey');
  }

  async createKey(name: string, device = 'Web') {
    await this.addKeyLink.click();
    
    await this.keyNameInput.fill(name);

    // search and choose device
    await this.deviceDropDown.click();
    await this.deviceOption(device).click();

    await this.submitButton.click();
  }
}
