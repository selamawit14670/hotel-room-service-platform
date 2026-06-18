import { Router } from 'express';
import { getActiveOrders, updateOrderStatus } from '../controllers/kitchenController';
import { requireAuth, requireRole } from '../middlewares/authMiddleware';
import { Role } from '@prisma/client';

const router = Router();

// Apply auth is mandatory for staff roles
router.use(requireAuth);
router.use(requireRole([Role.KITCHEN, Role.SUPERVISOR, Role.ADMIN]));

router.get('/orders', getActiveOrders);
router.patch('/orders/:orderId', updateOrderStatus);

export default router;
