import chalk from 'chalk';
import winston from 'winston';

function colorize(log: { level?: string; message?: string; timestamp?: string }) {
  switch (log.level) {
    case 'error':
      return `${log.timestamp}-${log.level.toLocaleUpperCase()}: ${chalk.red(log.message)}`;
    case 'info':
      return `${log.timestamp}-${log.level.toLocaleUpperCase()}: ${chalk.green(log.message)}`;
    case 'warn':
      return `${log.timestamp}-${log.level.toLocaleUpperCase()}: ${chalk.yellow(log.message)}`;
    default:
      throw Error(`Log level: ${log.level} does not exist, try: info, error, warn`);
  }
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'HH:mm:ss' }),
        winston.format.printf((log) => colorize(log)),
      ),
    }),
  ],
});

function info(message: string): string {
  logger.info(message, 'info');
  return message;
}

function error(message: string): string {
  logger.error(message, 'error');
  return message;
}

function warn(message: string): string {
  logger.warn(message, 'warn');
  return message;
}

export { info, error, warn };
