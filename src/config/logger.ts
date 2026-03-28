import fs from 'fs';
import path from 'path';
import util from 'util';

type LogLevel = 'debug' | 'info' | 'notice' | 'warn' | 'warning' | 'error';

const LOG_DIR = path.resolve(process.cwd(), 'logs');
const APP_LOG = path.join(LOG_DIR, 'app.log');
const ERROR_LOG = path.join(LOG_DIR, 'error.log');

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const formatArgs = (args: unknown[]) =>
  args
    .map((arg) => {
      if (typeof arg === 'string') return arg;
      return util.inspect(arg, { depth: 6, breakLength: 120 });
    })
    .join(' ');

const writeLine = (level: LogLevel, args: unknown[]) => {
  const ts = new Date().toISOString();
  const line = `[${ts}] [${level.toUpperCase()}] ${formatArgs(args)}\n`;

  // Keep console output for dev visibility.
  if (level === 'error') {
    console.error(line.trim());
  } else if (level === 'warn' || level === 'warning') {
    console.warn(line.trim());
  } else {
    console.log(line.trim());
  }

  fs.appendFileSync(APP_LOG, line, 'utf8');
  if (level === 'error') {
    fs.appendFileSync(ERROR_LOG, line, 'utf8');
  }
};

const logger = {
  debug: (...args: unknown[]) => writeLine('debug', args),
  info: (...args: unknown[]) => writeLine('info', args),
  notice: (...args: unknown[]) => writeLine('notice', args),
  warn: (...args: unknown[]) => writeLine('warn', args),
  warning: (...args: unknown[]) => writeLine('warning', args),
  error: (...args: unknown[]) => writeLine('error', args),
};

export default logger;

export const morganStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};
