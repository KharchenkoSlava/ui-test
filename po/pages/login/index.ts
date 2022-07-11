import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { decoratePage } from 'helpers';

class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.locator('input#email');
    this.signInButton = this.page.locator('button[type="submit"]');
  }

  async signIn(email: string) {
    await this.emailInput.type(email);
    await this.signInButton.click();
    await this.page.waitForNavigation({ url: /anomalies/, timeout: 60000 });
  }
}

decoratePage(LoginPage);

export { LoginPage };
