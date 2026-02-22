import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'dotenv/config';
import routes from './routes/index';
import { morganMiddleware } from './config/morgan';
import logger from './config/logger';
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

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger / OpenAPI
app.get('/api/openapi.json', (_req: Request, res: Response) => {
  res.json(swaggerSpec);
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// Routes
app.use('/api', routes);

// Health check (root and under /api for consistency)
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' });
});
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  logger.info(`Server is running on port ${PORT}`);
});

export default app;
