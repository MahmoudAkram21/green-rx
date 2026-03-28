/**
 * Morgan HTTP request logger config.
 * - Development: "dev" format (colored, concise).
 * - Production: "combined" format (Apache-style), streamed to app logger.
 */
import morgan from 'morgan';
import { morganStream } from './logger';

// Always stream through app logger to keep one logging channel.
const format =
  ':method :url :status :response-time ms - :res[content-length] bytes - ip=:remote-addr';

export const morganMiddleware = morgan(format, { stream: morganStream });
