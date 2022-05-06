import { Locator, Page } from '@playwright/test';

export default class CreateProjectBlock {
  readonly page: Page 
    projectName: Locator;
    targetLanguage: Locator;
    selectTargetLanguage: (text?: string) => Locator;
    submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.projectName = page.locator('input[name="name"]');
    this.targetLanguage = page.locator('#TargetLanguage + div');
    this.selectTargetLanguage = (text = 'Ukrainian (uk)') => page.locator(`text=${text}`);
    this.submitButton = page.locator('#tabs--1--panel--0 button:has-text("Proceed")');
  }

  async createProject(name: string) {
    await this.projectName.fill(name);
    
    // search and choose target language
    await this.targetLanguage.fill('uk');
    await this.selectTargetLanguage().click();

    await this.submitButton.click();
    await this.page.waitForNavigation({ url: /\/project\// });
  }
}
