import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export const validate = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
  const { success, error, data } = schema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: 'Validation failed',
      error: error.issues.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      })),
    });
  }

  req.body = data;
  next();
};
