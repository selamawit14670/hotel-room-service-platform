import { Router } from 'express';
import { registerGuest, getMenu, placeOrder, trackOrder } from '../controllers/guestController';

const router = Router();

// Guest specific endpoints
router.post('/register', registerGuest);
router.get('/menu', getMenu);
router.post('/order', placeOrder);
router.get('/order/:orderId', trackOrder);

export default router;
