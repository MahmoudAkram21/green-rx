import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';
import routes from './routes/index';
import { authenticate, authorize } from './middleware/auth.middleware';
import { UserRole } from '../generated/client/client';
import * as adminSideEffectController from './controllers/adminSideEffect.controller';
import { morganMiddleware } from './config/morgan';
import logger from './config/logger';
import { prisma } from './lib/prisma';
import { startMedicineReminderJob } from './services/medicineReminderJob';
import { hashPassword } from './utils/password.util';
import multer from "multer";

const DEFAULT_ADMIN_EMAIL = 'superadmin@greenrx.com';
const DEFAULT_ADMIN_PASSWORD = 'Password@123';

/** In development: ensure default SuperAdmin exists so login works without running seed. */
async function ensureDefaultAdmin(): Promise<void> {
  if (process.env.NODE_ENV !== 'development' && process.env.CREATE_DEFAULT_ADMIN !== 'true') return;
  try {
    const existing = await prisma.user.findUnique({ where: { email: DEFAULT_ADMIN_EMAIL } });
    if (existing) return;
    const passwordHash = await hashPassword(DEFAULT_ADMIN_PASSWORD);
    await prisma.user.create({
      data: {
        email: DEFAULT_ADMIN_EMAIL,
        passwordHash,
        role: 'SuperAdmin',
        emailVerified: true,
        isActive: true,
      },
    });
    logger.info(`Default admin created: ${DEFAULT_ADMIN_EMAIL}`);
    console.log(`[RMMSY] Default admin created: ${DEFAULT_ADMIN_EMAIL} / ${DEFAULT_ADMIN_PASSWORD}`);
  } catch (e) {
    logger.error('Failed to create default admin', e);
  }
}
import swaggerSpec from './config/swagger';
import type { RequestHandler } from 'express';

type SwaggerUiModule = {
  serve: RequestHandler[];
  setup: (spec: unknown, options?: unknown) => RequestHandler;
};

// Use require here to avoid ts-node declaration resolution issues in dev mode.
const swaggerUi = require('swagger-ui-express') as SwaggerUiModule;

const app = express();

// HTTP request logging (Morgan)
app.use(morganMiddleware);
app.use((req: Request, res: Response, next: NextFunction) => {
  const startedAt = Date.now();
  logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);

  res.on('finish', () => {
    const durationMs = Date.now() - startedAt;
    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
    logger[level](`Completed request: ${req.method} ${req.originalUrl} -> ${res.statusCode} (${durationMs}ms)`);
  });

  next();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static: serve uploaded files (e.g. doctor licenses, patient medicines, medical reports)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Swagger / OpenAPI (served at /api/docs; redirect /api-docs for convenience)
app.get('/api/openapi.json', (_req: Request, res: Response) => {
  res.json(swaggerSpec);
});
app.get('/api-docs', (_req: Request, res: Response) => {
  res.redirect(302, '/api/docs');
});
app.get('/api-docs/', (_req: Request, res: Response) => {
  res.redirect(302, '/api/docs');
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// POST/DELETE admin side-effects trade-names — handle first so it always matches
app.post('/api/admin/side-effects/:id/trade-names', authenticate, authorize([UserRole.Admin, UserRole.SuperAdmin]), adminSideEffectController.attachTradeNames);
app.post('/api/admin/side-effects/:id/medications', authenticate, authorize([UserRole.Admin, UserRole.SuperAdmin]), adminSideEffectController.attachTradeNames);
app.delete('/api/admin/side-effects/:id/trade-names/:tradeNameId', authenticate, authorize([UserRole.Admin, UserRole.SuperAdmin]), adminSideEffectController.removeTradeName);

// Routes
app.use('/api', routes);

// Health check (root and under /api for consistency)
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' });
});
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// 404 handler — catch POST/DELETE trade-names (path from path or originalUrl)
app.use((req: Request, res: Response, next: NextFunction) => {
  const pathname = (req.originalUrl || req.url || req.path || '').split('?')[0];
  const postMatch = pathname.match(/\/api\/admin\/side-effects\/(\d+)\/trade-names\/?$/);
  const deleteMatch = pathname.match(/\/api\/admin\/side-effects\/(\d+)\/trade-names\/(\d+)\/?$/);
  if (req.method === 'POST' && postMatch) {
    req.params = { ...(req.params || {}), id: postMatch[1] };
    return authenticate(req, res, (err: unknown) => {
      if (err) return next(err);
      authorize([UserRole.Admin, UserRole.SuperAdmin])(req, res, (err: unknown) => {
        if (err) return next(err);
        adminSideEffectController.attachTradeNames(req, res, next);
      });
    });
  }
  if (req.method === 'DELETE' && deleteMatch) {
    req.params = { ...(req.params || {}), id: deleteMatch[1], tradeNameId: deleteMatch[2] };
    return authenticate(req, res, (err: unknown) => {
      if (err) return next(err);
      authorize([UserRole.Admin, UserRole.SuperAdmin])(req, res, (err: unknown) => {
        if (err) return next(err);
        adminSideEffectController.removeTradeName(req, res, next);
      });
    });
  }
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  return res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

// Multer/file upload errors
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  logger.error('Upload Error', err);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return next();
});

// Global error handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  const status = (err as any).status || 500;
  logger.error(`Unhandled error on ${req.method} ${req.originalUrl}`, err);
  res.status(status).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

const server = app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
  logger.info(`Health check: http://localhost:${PORT}/api/health`);
  logger.info('POST /api/admin/side-effects/:id/trade-names is registered');
  logger.info(`Server is running on port ${PORT}`);
  startMedicineReminderJob();
  ensureDefaultAdmin().catch((err) => {
    logger.error('ensureDefaultAdmin failed (server still running)', err);
  });
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Promise Rejection', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', error);
});

const shutdown = (signal: string) => {
  logger.warn(`Received ${signal}. Shutting down server...`);
  server.close(() => {
    logger.info('HTTP server closed');
    prisma.$disconnect()
      .then(() => {
        logger.info('Prisma disconnected');
        process.exit(0);
      })
      .catch((err) => {
        logger.error('Failed to disconnect Prisma during shutdown', err);
        process.exit(1);
      });
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

export default app;
