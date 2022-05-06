import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import lokaliseHelper from '../helpers/lokalise.helper';
import LokaliseApi from '../api/lokalise.api';
import ProjectsPage from '../page-objects/projects.page';
import ProjectPage from '../page-objects/project.page';

test.describe('Lokalise', () => {
  let projectName: string;

  test.beforeEach(async ({ page }) => {
    await lokaliseHelper.deleteAllProjects();
    projectName = faker.random.alpha(10);
  });

  test('add first project', async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    const projectPage = new ProjectPage(page);

    await projectsPage.goto();
    await projectsPage.getStartedFirstProject();
    
    await projectsPage.createProjectBlock.createProject(projectName);

    await projectPage.navigationBlock.gotoProjects();
    await projectsPage.checkAmountOfProjects(1);
    await projectsPage.isVisibleProjectLinkByName(projectName);
  });

  test('add nth project', async ({ page }) => {
    const lokaliseApi = new LokaliseApi();
    await lokaliseApi.createProject();

    const projectsPage = new ProjectsPage(page);
    const projectPage = new ProjectPage(page);
    
    await projectsPage.goto();
    await projectsPage.getStartedNewProject();

    await projectsPage.createProjectBlock.createProject(projectName);
    
    await projectPage.navigationBlock.gotoProjects();
    await projectsPage.checkAmountOfProjects(2);
    await projectsPage.isVisibleProjectLinkByName(projectName);
  });
});
