import { expect, test as baseTexst } from "@playwright/test";
import ProjectPage from "../page-objects/project.page";
import ProjectsPage from "../page-objects/projects.page";

const test = baseTexst.extend<{ projectPage: ProjectPage; projectsPage: ProjectsPage; }>({
  projectPage: async ({ page }, use) => { await use(new ProjectPage(page)); },
  projectsPage: async ({ page }, use) => { await use(new ProjectsPage(page)); },
})

export { test, expect };
