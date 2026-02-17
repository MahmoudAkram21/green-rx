/**
 * Morgan HTTP request logger config.
 * - Development: "dev" format (colored, concise).
 * - Production: "combined" format (Apache-style), streamed to app logger.
 */
import morgan from 'morgan';
import { morganStream } from './logger';

const isDev = process.env.NODE_ENV !== 'production';

const format = isDev ? 'dev' : 'combined';
const options = isDev ? {} : { stream: morganStream };

export const morganMiddleware = morgan(format, options);
