import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { getProfile } from '../controllers/profile.controller';

const router = Router();

router.get('/profile', protect, getProfile);

export default router;
