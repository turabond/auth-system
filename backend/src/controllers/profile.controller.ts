import { Request, Response } from 'express';
import { profileService } from '../services/profile.service';

export const getProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error('');
  }
  const userId = req.user.id;

  try {
    const data = await profileService.getProfile(userId);
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: err instanceof Error ? err.message : 'Get Profile failed' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new Error('');
    }
    const userId = req.user.id;
    const data = req.body;
    const updatedProfile = await profileService.updateProfile(userId, data);
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err instanceof Error ? err.message : 'Update failed' });
  }
};
