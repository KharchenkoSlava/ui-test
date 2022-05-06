import LokaliseApi from '../api/lokalise.api';

class LokaliseHelper {
  private lokaliseApi: LokaliseApi;
  constructor() {
    this.lokaliseApi = new LokaliseApi();
  }

  async getProjectIds() {
    const { body } = await this.lokaliseApi.getProjects();
    const ids = body.projects.map(project => project.project_id);
    return ids;
  }

  async deleteAllProjects() {
    const ids = await this.getProjectIds();
    const promises = ids.map((id: string) => this.lokaliseApi.deleteProject(id));
    await Promise.all(promises)
  }
}

export default new LokaliseHelper();