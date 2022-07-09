import { FullConfig } from '@playwright/test';
import { log } from './helpers';

function globalSetup(config: FullConfig) {
  log.info('Start global setup...');
  log.info(JSON.stringify(config));
}

export default globalSetup;
