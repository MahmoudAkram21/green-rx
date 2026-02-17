/**
 * Logger config using the "log" package.
 * Use LOG_LEVEL to control verbosity (debug | info | notice | warning | error).
 * Namespace: green-rx (for filtering in logs).
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const rootLog = require('log') as {
  get: (namespace: string) => {
    debug: (...args: unknown[]) => void;
    info: (...args: unknown[]) => void;
    notice: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    warning: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
  };
};

const logger = rootLog.get('green-rx');

export default logger;

/** Morgan stream: pass HTTP log lines to logger.info */
export const morganStream = {
  write: (message: string) => {
    logger.info(message.trim());
  }
};
