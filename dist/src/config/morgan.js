"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganMiddleware = void 0;
/**
 * Morgan HTTP request logger config.
 * - Development: "dev" format (colored, concise).
 * - Production: "combined" format (Apache-style), streamed to app logger.
 */
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = require("./logger");
const isDev = process.env.NODE_ENV !== 'production';
const format = isDev ? 'dev' : 'combined';
const options = isDev ? {} : { stream: logger_1.morganStream };
exports.morganMiddleware = (0, morgan_1.default)(format, options);
//# sourceMappingURL=morgan.js.map