import { Router } from 'express';
import { 
  getReadyOrders, 
  getWaiterDeliveries, 
  assignDelivery, 
  updateDeliveryStatus 
} from '../controllers/waiterController';
import { requireAuth, requireRole } from '../middlewares/authMiddleware';
import { Role } from '@prisma/client';

const router = Router();

// Guards: authenticated staff access
router.use(requireAuth);
router.use(requireRole([Role.WAITER, Role.SUPERVISOR, Role.ADMIN]));

router.get('/ready', getReadyOrders);
router.get('/deliveries', getWaiterDeliveries);
router.post('/assign', assignDelivery);
router.patch('/deliveries/:orderId', updateDeliveryStatus);

export default router;
