import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { authService } from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
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
  } catch (error) {
    next(error instanceof Error ? new AppError(error.message, 400) : error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
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
  } catch (error) {
    next(error instanceof Error ? new AppError(error.message, 401) : error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return next(new AppError('No refresh token provided', 401));

    const data = await authService.refresh(token);
    res.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json(data);
  } catch (error) {
    next(error instanceof Error ? new AppError(error.message, 403) : error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return next(new AppError('No refresh token found', 400));

    await authService.logout(token);
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error instanceof Error ? new AppError(error.message, 500) : error);
  }
};
