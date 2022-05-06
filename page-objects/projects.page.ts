import { expect, Locator, Page } from '@playwright/test';
import config from '../playwright.config';
import CreateProjectBlock from './blocks/create.project.block';

export default class ProjectsPage {
  readonly page: Page 
    newProjectLink: Locator;
    getStartedLink: Locator;
    projectName: Locator;
    targetLanguage: Locator;
    submitButton: Locator;
    projects: Locator;
    selectTargetLanguage: (text?: string) => Locator;
    projectLinkByName: (projectName?: string) => Locator;;
    createProjectBlock: CreateProjectBlock;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.locator('text=Get started');
    this.newProjectLink = page.locator('button:has-text("New project")');
    this.projects = page.locator('div[data-name="project-container"]');
    this.projectLinkByName = (projectName: string) => page.locator(`[data-name="project-sidebar"]  a:has-text("${projectName}")`);
    this.createProjectBlock = new CreateProjectBlock(this.page);
  }

  async goto() {
    await this.page.goto(`${config.use.baseURL}/projects`);
  }

  async getStartedFirstProject() {
    await this.getStartedLink.click();
    await expect(this.page).toHaveURL(`${config.use.baseURL}/projects#modal:new-project`);
  }

  async getStartedNewProject() {
    await this.newProjectLink.click();
    await expect(this.page).toHaveURL(`${config.use.baseURL}/projects#modal:new-project`);
  }

  async isVisibleProjectLinkByName(name: string) {
    await expect(this.projectLinkByName(name)).toBeVisible();
  }

  async checkAmountOfProjects(count: number) {
    await expect(this.projects).toHaveCount(count);
  }
}