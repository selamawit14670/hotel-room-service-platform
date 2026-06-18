import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { config } from '../config/env';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle common Prisma database constraint faults
  if (err.code === 'P2002') {
    statusCode = 409;
    message = `Key conflict error: ${err.meta?.target || 'A unique field record already exists.'}`;
  } else if (err.code === 'P2003') {
    statusCode = 400;
    message = 'Data reference error: Referencing a field structure that does not exist.';
  } else if (err.code === 'P2025') {
    statusCode = 404;
    message = 'Not Found: Record does not exist in our system.';
  }

  const isDev = config.NODE_ENV === 'development';

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    ...(isDev && { stack: err.stack }),
  });
}
