import { Router } from 'express';
import { 
  getStaffStatus, 
  updateStaffStatus, 
  getDelayedOrders, 
  getOversightMetrics 
} from '../controllers/supervisorController';
import { requireAuth, requireRole } from '../middlewares/authMiddleware';
import { Role } from '@prisma/client';

const router = Router();

// Guards: require Supervisor or Administrator authorization
router.use(requireAuth);
router.use(requireRole([Role.SUPERVISOR, Role.ADMIN]));

router.get('/staff', getStaffStatus);
router.patch('/staff/:staffId', updateStaffStatus);
router.get('/delayed', getDelayedOrders);
router.get('/metrics', getOversightMetrics);

export default router;
