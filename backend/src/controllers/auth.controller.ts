import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const data = await authService.register(email, password, role);
    res.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    res.status(400).json({ message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    res.status(401).json({ message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token provided' });

    const data = await authService.refresh(token);
    res.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    res.status(403).json({ message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(400).json({ message: 'No refresh token found' });

    await authService.logout(token);
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    res.status(500).json({ message });
  }
};
