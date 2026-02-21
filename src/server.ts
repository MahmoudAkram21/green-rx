import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'dotenv/config';
import routes from './routes/index';
import { morganMiddleware } from './config/morgan';
import logger from './config/logger';
import { prisma } from './lib/prisma';
import { hashPassword } from './utils/password.util';

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

const app = express();

// HTTP request logging (Morgan)
app.use(morganMiddleware);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check BEFORE /api so it is always reachable
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' });
});
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// API Routes
app.use('/api', routes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err.stack);
  const status = (err as any).status || 500;
  res.status(status).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  logger.info(`Server is running on port ${PORT}`);
  ensureDefaultAdmin().catch((err) => {
    logger.error('ensureDefaultAdmin failed (server still running)', err);
    console.error('[RMMSY] Default admin setup failed:', err?.message ?? err);
  });
});

export default app;

