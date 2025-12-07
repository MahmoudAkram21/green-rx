import { Request, Response, NextFunction } from 'express';

interface PrismaError extends Error {
  code?: string;
  status?: number;
}

// Custom error handler middleware
const errorHandler = (err: PrismaError, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);

  // Prisma errors
  if (err.code === 'P2002') {
    return res.status(409).json({
      error: 'Duplicate entry',
      message: 'A record with this value already exists'
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      error: 'Not found',
      message: 'The requested record was not found'
    });
  }

  // Default error
  return res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export default errorHandler;

