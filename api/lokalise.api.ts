import config from '../playwright.config';
import superAgent from 'superagent';
import { faker } from '@faker-js/faker';

export type ICreateKey = { key_name?: string, platforms?: Array<string>, is_plural?: boolean };
export type ICreateProject = { name?: string };

export default class LokaliseApi {
  private token: string;
  baseURL: string;
  constructor(baseURL = config.use.baseURL, token = 'ea4189988ca25a04c63ede9af52a5a6dc2a784e7') {
    this.baseURL = baseURL;
    this.token = token;
  }

  async getProjects() {
    return superAgent
      .get(`${this.baseURL}/api2/projects`)
      .timeout({ deadline: 30000 })
      .set('Content-Type', 'application/json')
      .set('x-api-token', this.token)
      .then(
        (result) => {
          console.log(`Get projects: ${JSON.stringify(result)}`);
          return result;
        },
        (error) => {
          console.warn(JSON.stringify(error));
          return error;
        },
      );
  }

  async deleteProject(projectId: string) {
    return superAgent
      .delete(`${this.baseURL}/api2/projects/${projectId}`)
      .timeout({ deadline: 30000 })
      .set('Content-Type', 'application/json')
      .set('x-api-token', this.token)
      .then(
        (result) => {
          console.log(`Delete projects: ${JSON.stringify(result)}`);
          return result;
        },
        (error) => {
          console.warn(JSON.stringify(error));
          return error;
        },
      );
  }

  async createProject(data: ICreateProject = {}) {
    const {
      name = faker.random.alpha(10),
    } = data;
    return superAgent
      .post(`${this.baseURL}/api2/projects`)
      .timeout({ deadline: 30000 })
      .set('Content-Type', 'application/json')
      .set('x-api-token', this.token)
      .send({ name })
      .then(
        (result) => {
          console.log(`Create projects: ${JSON.stringify(result)}`);
          return result;
        },
        (error) => {
          console.warn(JSON.stringify(error));
          return error;
        },
      );
  }

  async createKey(projectId: string, data: ICreateKey = {}) {
    const {
      key_name = faker.random.alpha(10),
      platforms = ['web'],
      is_plural = false
    } = data;
    return superAgent
      .post(`${this.baseURL}/api2/projects/${projectId}/keys`)
      .timeout({ deadline: 30000 })
      .set('Content-Type', 'application/json')
      .set('x-api-token', this.token)
      .send({ keys: [{ key_name, platforms, is_plural }]})
      .then(
        (result) => {
          console.log(`Create key: ${JSON.stringify(result)}`);
          return result;
        },
        (error) => {
          console.warn(JSON.stringify(error));
          return error;
        },
      );
  }
}
