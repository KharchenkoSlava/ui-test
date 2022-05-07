import { faker } from '@faker-js/faker';
import { test, expect } from "../fixtures/base.fixture"
import lokaliseHelper from '../helpers/lokalise.helper';

test.describe('Lokalise', () => {
  let projectName: string;
  let keyName: string;
  let translation: string;
  let otherTranslation: string;

  test.beforeEach(async () => {
    await lokaliseHelper.deleteAllProjects();
    projectName = faker.random.alpha(10);
    keyName = faker.random.alpha(10);
    translation = faker.random.alpha(10);
    otherTranslation = faker.random.alpha(10);
  });

  test('add first project', async ({ projectPage, projectsPage }) => {
    // Arrange
    await projectsPage.goto();

    // Act
    await projectsPage.getStartedFirstProject();
    await projectsPage.createProjectBlock.createProject(projectName);

    // Assert
    await projectPage.navigationBlock.gotoProjects();
    await projectsPage.checkAmountOfProjects(1);
    await projectsPage.isVisibleProjectLinkByName(projectName);
  });

  test('add nth project', async ({ projectPage, projectsPage }) => {
    // Arrange
    await lokaliseHelper.createProject();
    await projectsPage.goto();

    // Act
    await projectsPage.getStartedNewProject();
    await projectsPage.createProjectBlock.createProject(projectName);
    
    // Assert
    await projectPage.navigationBlock.gotoProjects();
    await projectsPage.checkAmountOfProjects(2);
    await projectsPage.isVisibleProjectLinkByName(projectName);
    
    const lastProjectName = await (await projectsPage.getProjectsName()).pop();
    expect(lastProjectName, 'Last created project must be in the end of the list').toEqual(lastProjectName);
  });

  test('add first key', async ({ projectPage }) => {
    // Arrange
    const { project_id } = await lokaliseHelper.createProject({ name: projectName });
    await projectPage.goto(project_id);
    
    // Act
    await projectPage.createKeyAndWaitKey(keyName);
    
    // Assert
    const keysName = await projectPage.getAllKeysName();
    expect(keysName, 'Project must have only one key').toHaveLength(1);
  });

  test('add translation for plain key', async ({ projectPage, baseURL, page }) => {
    // Arrange
    const { project_id } = await lokaliseHelper.createProject({ name: projectName });
    const { keys } = await lokaliseHelper.createKey(project_id, { key_name: keyName });
    const translationId = keys.pop().translations.pop().translation_id;
    
    await projectPage.goto(project_id);
    await page.reload(); // for appearing key in the project

    // Act
    await Promise.all([
      page.waitForResponse(response => response.url() === `${baseURL}/translation/${translationId}/update` && response.status() === 200),
      projectPage.setPlainTransaltion(translationId, translation),
    ]);

    // Assert
    await page.reload();
    expect(await projectPage.getPlainTransaltion(translationId)).toEqual(translation);
  });

  test('add translation for plural key', async ({ projectPage, page, baseURL }) => {
    // Arrange
    const { project_id } = await lokaliseHelper.createProject({ name: projectName });
    const { keys } = await lokaliseHelper.createKey(project_id, { key_name: keyName, is_plural: true });
    const translationId = keys.pop().translations.pop().translation_id;
    
    await projectPage.goto(project_id);
    await page.reload(); // for appearing key in the project

    // Act
    await projectPage.setAllPluralTransaltion(translationId, [translation, otherTranslation]),

    // Assert
    await page.reload();
    expect(await projectPage.getPlainPluralTransaltion(translationId, [translation, otherTranslation])).toStrictEqual([translation, otherTranslation]);
  });
});
