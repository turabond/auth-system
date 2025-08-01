import { Router } from 'express';
import { authSchema } from '../schemas/auth.schema';
import { validate } from '../middleware/validate.middleware';
import { register, login, logout, refreshToken } from '../controllers/auth.controller';

const router = Router();

router.post('/register', validate(authSchema), register);
router.post('/login', validate(authSchema), login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

// Health check endpoint
router.get('/ping', (_req, res) => {
  res.json({ message: 'pong' });
});

export default router;
