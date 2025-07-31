import { Request, Response } from 'express';
import { userService } from '../services/user.service';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({ items: users });
  } catch (err) {
    res.status(400).json({ message: err instanceof Error ? err.message : 'Unknown error' });
  }
};
