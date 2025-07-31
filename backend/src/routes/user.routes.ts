import { Router } from 'express';
import { authorize } from '../middleware/role.middleware';
import { protect } from '../middleware/auth.middleware';
import { getAll } from '../controllers/user.controller';

const router = Router();

router.get('/users', protect, authorize(['Admin']), getAll);

export default router;
