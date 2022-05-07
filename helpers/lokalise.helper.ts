import { expect } from "@playwright/test";
import LokaliseApi, { ICreateKey, ICreateProject } from '../api/lokalise.api';

class LokaliseHelper {
  private lokaliseApi: LokaliseApi;
  constructor() {
    this.lokaliseApi = new LokaliseApi();
  }

  async getProjectIds() {
    const { body, status } = await this.lokaliseApi.getProjects();
    expect(status, 'Wrong status code').toEqual(200);
    const ids = body.projects.map(project => project.project_id);
    return ids;
  }

  async deleteAllProjects() {
    const ids = await this.getProjectIds();
    const promises = ids.map((id: string) => this.lokaliseApi.deleteProject(id));
    await Promise.all(promises)
  }

  async createProject(data: ICreateProject = {}) {
    const { body, status } = await this.lokaliseApi.createProject(data);
    expect(status, 'Wrong status code').toEqual(200);
    return body;
  }

  async createKey(projectId: string, data: ICreateKey = {}) {
    const { body, status } = await this.lokaliseApi.createKey(projectId, data);
    expect(status, 'Wrong status code').toEqual(200);
    return body;
  }
}

export default new LokaliseHelper();