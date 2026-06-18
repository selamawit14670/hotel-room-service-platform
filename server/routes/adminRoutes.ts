import { Router } from 'express';
import { 
  createStaff, 
  getStaffList, 
  updateStaff, 
  deleteStaff,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAdminDashboard
} from '../controllers/adminController';
import { requireAuth, requireRole } from '../middlewares/authMiddleware';
import { Role } from '@prisma/client';

const router = Router();

// Guards: require system administrator credentials
router.use(requireAuth);
router.use(requireRole([Role.ADMIN]));

// 1. Staff Management
router.get('/staff', getStaffList);
router.post('/staff', createStaff);
router.patch('/staff/:staffId', updateStaff);
router.delete('/staff/:staffId', deleteStaff);

// 2. Menu Category Management
router.post('/categories', createMenuCategory);
router.patch('/categories/:categoryId', updateMenuCategory);
router.delete('/categories/:categoryId', deleteMenuCategory);

// 3. Menu Item Management
router.post('/menu', createMenuItem);
router.patch('/menu/:itemId', updateMenuItem);
router.delete('/menu/:itemId', deleteMenuItem);

// 4. Analytics and Oversight
router.get('/dashboard', getAdminDashboard);

export default router;
