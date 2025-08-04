import { Request, Response, NextFunction } from 'express';
import { tokenService } from '../services/token.service';
import { AppError } from '../utils/AppError';
import { Roles } from '../config/constants';

export const protect = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    const payload = tokenService.validateAccessToken(token);

    if (!payload) {
      throw new AppError('Invalid or expired token', 401);
    }

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};

export const restrictTo = (...roles: Roles[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AppError('Unauthorized', 401);
      }

      if (!roles.includes(req.user.role as Roles)) {
        throw new AppError('Forbidden: insufficient rights', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
