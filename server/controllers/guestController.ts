import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../services/prisma';
import { config } from '../config/env';
import { AppError } from '../utils/appError';
import { socketService } from '../services/socket';

/**
 * Registers guest into the current occupancy session
 */
export async function registerGuest(req: Request, res: Response, next: NextFunction) {
  try {
    const { roomNumber, guestName, phoneNumber } = req.body;

    if (!roomNumber || !guestName) {
      throw new AppError('Suite room number and Guest name are required.', 400);
    }

    const guest = await prisma.guest.create({
      data: {
        roomNumber,
        guestName,
        phoneNumber,
      },
    });

    // Provide a localized token for authenticated orders
    const guestToken = jwt.sign(
      { guestId: guest.id, roomNumber: guest.roomNumber, guestName: guest.guestName },
      config.JWT_SECRET,
      { expiresIn: '3d' }
    );

    res.status(201).json({
      success: true,
      token: guestToken,
      guest,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Lists catalog items categorized for room service dining
 */
export async function getMenu(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await prisma.menuCategory.findMany({
      include: {
        items: {
          where: { available: true },
          orderBy: { name: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    });

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Submits high-end culinary orders, locks prices at checkout, and notifies staff
 */
export async function placeOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { guestId, roomNumber, items } = req.body;

    if (!guestId || !roomNumber || !items || !Array.isArray(items) || items.length === 0) {
      throw new AppError('A valid guest, room ID, and structured dining items are required.', 400);
    }

    // Verify Guest exists
    const guest = await prisma.guest.findUnique({
      where: { id: guestId }
    });

    if (!guest) {
      throw new AppError('Room service guest account not active or expired.', 404);
    }

    let totalAmount = 0;
    const validatedItems = [];

    // Loop through each item, match actual DB pricing, and lock it in
    for (const item of items) {
      const menuItem = await prisma.menuItem.findUnique({
        where: { id: item.menuItemId }
      });

      if (!menuItem) {
        throw new AppError(`Culinary dish ID ${item.menuItemId} is not currently on the menu.`, 404);
      }

      if (!menuItem.available) {
        throw new AppError(`Culinary dish ${menuItem.name} is currently sold out.`, 400);
      }

      const price = Number(menuItem.price);
      const quantity = parseInt(item.quantity, 10);

      if (isNaN(quantity) || quantity <= 0) {
        throw new AppError('Invalid quantity format specified.', 400);
      }

      totalAmount += price * quantity;

      validatedItems.push({
        menuItemId: menuItem.id,
        quantity,
        price,
        // Carry name metadata for rapid socket event payloads
        name: menuItem.name
      });
    }

    // Create database records within a transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create primary Order record
      const newOrder = await tx.order.create({
        data: {
          guestId,
          roomNumber,
          totalAmount,
          status: 'PENDING',
        }
      });

      // 2. Create OrderItem junction objects
      await tx.orderItem.createMany({
        data: validatedItems.map(vi => ({
          orderId: newOrder.id,
          menuItemId: vi.menuItemId,
          quantity: vi.quantity,
          price: vi.price,
        }))
      });

      // 3. Auto-populate a Delivery placeholder for waiters
      await tx.delivery.create({
        data: {
          orderId: newOrder.id,
          status: 'ASSIGNED',
        }
      });

      return newOrder;
    });

    // Match order output including items & guest profile
    const completeOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        guest: true,
        orderItems: {
          include: {
            menuItem: true
          }
        },
        delivery: true
      }
    });

    // Notify kitchen queue and supervisors in real-time
    socketService.emitNewOrder(completeOrder);

    res.status(201).json({
      success: true,
      order: completeOrder,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Tracks status of an ongoing room order
 */
export async function trackOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      throw new AppError('Order ID parameter is required.', 400);
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        guest: true,
        orderItems: {
          include: {
            menuItem: true,
          }
        },
        delivery: {
          include: {
            waiter: {
              select: {
                name: true,
                phone: true,
                status: true
              }
            }
          }
        }
      }
    });

    if (!order) {
      throw new AppError('Room service order record not located.', 404);
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
}
