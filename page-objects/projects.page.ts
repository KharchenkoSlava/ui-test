import { expect, Locator, Page } from '@playwright/test';
import config from '../playwright.config';
import CreateProjectBlock from './blocks/create.project.block';

export default class ProjectsPage {
  private readonly page: Page 
  private readonly newProjectLink: Locator;
  private readonly getStartedLink: Locator;
  private readonly projectName: Locator;
  private readonly targetLanguage: Locator;
  private readonly submitButton: Locator;
  private readonly projects: Locator;
  private readonly projectsLink: Locator;
  private readonly selectTargetLanguage: (text?: string) => Locator;
  private readonly projectLinkByName: (projectName?: string) => Locator;;
  private readonly createProjectBlock: CreateProjectBlock;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.locator('text=Get started');
    this.newProjectLink = page.locator('button:has-text("New project")');
    this.projects = page.locator('div[data-name="project-container"]');
    this.projectLinkByName = (projectName: string) => page.locator(`[data-name="project-sidebar"]  a:has-text("${projectName}")`);
    this.projectsLink = page.locator('[data-name="project-sidebar"] > div > a');
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
    await expect(this.projects, 'Wrong projects amount').toHaveCount(count);
  }

  async getProjectsName() {
    let projectsName = [];
    const count = await this.projectsLink.count();
    for (let i = 0; i < count; i++) {
      const name = await this.projectsLink.nth(i).textContent();
      projectsName.push(name);
    }
    return projectsName;
  }
}