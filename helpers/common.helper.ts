import { log } from 'helpers';

export function sleep(timeout: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      log.info(`I was sleeping ${timeout} ms`);
      resolve();
    }, timeout);
  });
}
