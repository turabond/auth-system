import { Router } from 'express';
import { authorize } from '../middleware/role.middleware';
import { protect } from '../middleware/auth.middleware';
import { getAll } from '../controllers/user.controller';
import { Roles } from '../config/constants';

const router = Router();

router.get('/users', protect, authorize([Roles.ADMIN]), getAll);

export default router;
