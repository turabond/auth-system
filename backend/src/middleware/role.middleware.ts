import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export function authorize(roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AppError('Unauthorized', 401);
      }

      if (!roles.includes(req.user.role)) {
        throw new AppError('Forbidden', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
