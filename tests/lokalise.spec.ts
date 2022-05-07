import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import lokaliseHelper from '../helpers/lokalise.helper';
import LokaliseApi from '../api/lokalise.api';
import ProjectsPage from '../page-objects/projects.page';
import ProjectPage from '../page-objects/project.page';

test.describe('Lokalise', () => {
  let projectName: string;
  let keyName: string;

  test.beforeEach(async ({ page }) => {
    await lokaliseHelper.deleteAllProjects();
    projectName = faker.random.alpha(10);
    keyName = faker.random.alpha(10);
  });

  test('add first project', async ({ page }) => {
    // Arrange
    const projectsPage = new ProjectsPage(page);
    const projectPage = new ProjectPage(page);

    // Act
    await projectsPage.goto();
    await projectsPage.getStartedFirstProject();
    await projectsPage.createProjectBlock.createProject(projectName);

    // Assert
    await projectPage.navigationBlock.gotoProjects();
    await projectsPage.checkAmountOfProjects(1);
    await projectsPage.isVisibleProjectLinkByName(projectName);
  });

  test('add nth project', async ({ page }) => {
    // Arrange
    const lokaliseApi = new LokaliseApi();
    await lokaliseApi.createProject();
    const projectsPage = new ProjectsPage(page);
    const projectPage = new ProjectPage(page);
    
    // Act
    await projectsPage.goto();
    await projectsPage.getStartedNewProject();
    await projectsPage.createProjectBlock.createProject(projectName);
    
    // Assert
    await projectPage.navigationBlock.gotoProjects();
    await projectsPage.checkAmountOfProjects(2);
    await projectsPage.isVisibleProjectLinkByName(projectName);
    
    const lastProjectName = await (await projectsPage.getProjectsName()).pop();
    expect(lastProjectName, 'Last created project must be in the end of the list').toEqual(lastProjectName);
  });

  test('add first key', async ({ page }) => {
    // Arrange
    const lokaliseApi = new LokaliseApi();
    const { body } = await lokaliseApi.createProject({ name: projectName });
    const projectPage = new ProjectPage(page);
    
    // Act
    await projectPage.goto(body.project_id);
    await projectPage.createKeyAndWaitKey(keyName);
    
    // Assert
    const keysName = await projectPage.getAllKeysName();
    expect(keysName, 'Project must have only one key').toHaveLength(1);
  });
});
