import { Router } from 'express';
import authRoutes from './authRoutes';
import guestRoutes from './guestRoutes';
import kitchenRoutes from './kitchenRoutes';
import waiterRoutes from './waiterRoutes';
import supervisorRoutes from './supervisorRoutes';
import adminRoutes from './adminRoutes';

const masterRouter = Router();

// Map route modules to respective sub-directories
masterRouter.use('/auth', authRoutes);
masterRouter.use('/guest', guestRoutes);
masterRouter.use('/kitchen', kitchenRoutes);
masterRouter.use('/waiter', waiterRoutes);
masterRouter.use('/supervisor', supervisorRoutes);
masterRouter.use('/admin', adminRoutes);

export default masterRouter;
