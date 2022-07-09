import { log } from '../helpers';

export function decoratePage(initialClass: any) {
    const name = initialClass.name;
    const methods = Object.getOwnPropertyNames(initialClass.prototype)    
      .filter((methodName) => methodName !== 'constructor')
      .filter((methodName) => typeof initialClass.prototype[methodName] === 'function');

      methods.forEach((methodName) => {
        const originalMethod = initialClass.prototype[methodName];
        initialClass.prototype[methodName] = async function (...args) {

            let message = `${name} execute method "${originalMethod.name}"`;
            if(args.length > 0) {
                message = `${message} with arguments ${JSON.stringify([...args])}`
            }
            log.info(message);

          return originalMethod.call(this, ...args);
        };
      });
  }