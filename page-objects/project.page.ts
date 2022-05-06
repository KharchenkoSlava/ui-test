import { Page } from '@playwright/test';
import config from '../playwright.config';
import NavigationBlock from './mixin-block/navigation.block';


export default class ProjectPage {
  readonly page: Page 
  navigationBlock: NavigationBlock;

  constructor(page: Page) {
    this.page = page;
    this.navigationBlock = new NavigationBlock(this.page);
  }

  async goto(id: string) {
    await this.page.goto(`${config.use.baseURL}/project/${id}`);
  }
}