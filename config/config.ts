import dotenv from 'dotenv';
import { log } from 'helpers';

dotenv.config();

// Provide information about process.env which we use for tests
log.info(`Run tests with params: ENV: ${process.env.ENV}`);

type paramsType = {
  env: string;
  baseUrl: string;
};

const params: paramsType = {
  env: getEnv(),
  baseUrl: getBaseUrl(),
};

function getEnv(env = process.env.ENV) {
  const envs = ['dev'];
  if (!envs.includes(env)) {
    throw new Error(`Environment ${env} is unspecified! Please use one of ${JSON.stringify(envs)}`);
  }
  return env;
}

function getBaseUrl(env = process.env.ENV) {
  switch (env) {
    case 'dev':
      return 'https://jaime-dev.jera-stg.com';
    default:
      throw new Error(`BaseUrl is unspecified for env: ${env}!`);
  }
}

export { params };
