import { Request, Response, NextFunction } from 'express';
import { profileService } from '../services/profile.service';
import { AppError } from '../utils/AppError';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppError('Unauthorized: no user in request', 401);
    }

    const userId = req.user.id;
    const data = await profileService.getProfile(userId);
    res.status(200).json(data);
  } catch (err) {
    next(err instanceof Error ? new AppError(err.message, 400) : err);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppError('Unauthorized: no user in request', 401);
    }

    const userId = req.user.id;
    const data = req.body;
    const updatedProfile = await profileService.updateProfile(userId, data);
    res.json(updatedProfile);
  } catch (err) {
    next(err instanceof Error ? new AppError(err.message, 400) : err);
  }
};
