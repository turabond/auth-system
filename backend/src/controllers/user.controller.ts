import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { userService } from '../services/user.service';

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ items: users });
  } catch (err) {
    next(err instanceof Error ? new AppError(err.message, 400) : err);
  }
};
