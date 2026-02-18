"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganStream = void 0;
/**
 * Logger config using the "log" package.
 * Use LOG_LEVEL to control verbosity (debug | info | notice | warning | error).
 * Namespace: green-rx (for filtering in logs).
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const rootLog = require('log');
const logger = rootLog.get('green-rx');
exports.default = logger;
/** Morgan stream: pass HTTP log lines to logger.info */
exports.morganStream = {
    write: (message) => {
        logger.info(message.trim());
    }
};
//# sourceMappingURL=logger.js.map