import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const isDev = process.env.NODE_ENV !== 'production';

  if (err instanceof AppError) {
    logger.warn(`[${req.method}] ${req.url} — ${err.message}`);

    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  logger.error(`[${req.method}] ${req.url} — ${err.stack || err.message}`);

  res.status(500).json({
    status: 'error',
    message: isDev ? err.message : 'Internal server error',
    ...(isDev && { stack: err.stack }),
  });
};
