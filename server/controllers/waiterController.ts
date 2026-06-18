import { Response, NextFunction } from 'express';
import { prisma } from '../services/prisma';
import { AppError } from '../utils/appError';
import { socketService } from '../services/socket';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { DeliveryStatus, OrderStatus } from '@prisma/client';

/**
 * Gets a list of orders cooked by the kitchen that are ready for pickup
 */
export async function getReadyOrders(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const readyOrders = await prisma.order.findMany({
      where: {
        status: 'READY',
      },
      include: {
        guest: true,
        orderItems: {
          include: {
            menuItem: true,
          }
        },
        delivery: true,
      },
      orderBy: {
        createdAt: 'asc',
      }
    });

    res.status(200).json({
      success: true,
      orders: readyOrders,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Lists active deliveries assigned to the currently authenticated waiter
 */
export async function getWaiterDeliveries(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const waiterId = req.user?.id;

    if (!waiterId) {
      throw new AppError('Unauthorized: Waiter credentials not verified.', 401);
    }

    const deliveries = await prisma.delivery.findMany({
      where: {
        waiterId,
      },
      include: {
        order: {
          include: {
            guest: true,
            orderItems: {
              include: {
                menuItem: true,
              }
            }
          }
        }
      },
      orderBy: {
        order: {
          createdAt: 'desc',
        }
      }
    });

    res.status(200).json({
      success: true,
      deliveries,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Waiter accepts/claims a READY order for delivery
 */
export async function assignDelivery(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { orderId } = req.body;
    const waiterId = req.user?.id;

    if (!orderId) {
      throw new AppError('Order ID to assign is required.', 400);
    }

    if (!waiterId) {
      throw new AppError('Unauthorized: Waiter identity not verified.', 401);
    }

    // Guard: Verify order exists and is READY
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!order) {
      throw new AppError('Room service order not found.', 404);
    }

    if (order.status !== 'READY') {
      throw new AppError('This order is not ready for transit or is already taken.', 400);
    }

    // atomical transaction to assign waiter and update state
    const result = await prisma.$transaction(async (tx) => {
      // 1. Update the delivery record
      const delivery = await tx.delivery.update({
        where: { orderId: orderId },
        data: {
          waiterId: waiterId,
          status: 'IN_TRANSIT' as DeliveryStatus,
        }
      });

      // 2. Set the order status to DELIVERING
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'DELIVERING' as OrderStatus,
        },
        include: {
          guest: true,
          orderItems: {
            include: {
              menuItem: true,
            }
          },
          delivery: true,
        }
      });

      return { delivery, order: updatedOrder };
    });

    // Notify guest and supervisor of in-transit status
    socketService.emitOrderUpdate(orderId, result.order);

    res.status(200).json({
      success: true,
      delivery: result.delivery,
      order: result.order,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Waiter updates progress or registers successful handoff of room service dishes
 */
export async function updateDeliveryStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { orderId } = req.params;
    const { status } = req.body; // 'DELIVERED' or 'FAILED'

    const waiterId = req.user?.id;

    if (!orderId || !status) {
      throw new AppError('Order ID and a delivery status must be specified.', 400);
    }

    if (!['DELIVERED', 'FAILED'].includes(status)) {
      throw new AppError("Invalid delivery target status. Use 'DELIVERED' or 'FAILED'.", 400);
    }

    // Verify ownership/assignment matches
    const delivery = await prisma.delivery.findUnique({
      where: { orderId: orderId }
    });

    if (!delivery) {
      throw new AppError('Delivery instance not found.', 404);
    }

    if (delivery.waiterId !== waiterId) {
      throw new AppError('Forbidden: This delivery is not assigned to you.', 403);
    }

    const result = await prisma.$transaction(async (tx) => {
      const parentOrderStatus = status === 'DELIVERED' ? 'COMPLETED' : 'CANCELLED';

      const updatedDelivery = await tx.delivery.update({
        where: { orderId: orderId },
        data: {
          status: status as DeliveryStatus,
          deliveredAt: status === 'DELIVERED' ? new Date() : null,
        }
      });

      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          status: parentOrderStatus as OrderStatus,
        },
        include: {
          guest: true,
          orderItems: {
            include: {
              menuItem: true,
            },
          },
          delivery: true,
        }
      });

      return { delivery: updatedDelivery, order: updatedOrder };
    });

    // Emit live events to notify the guest and monitoring supervisor
    if (status === 'DELIVERED') {
      socketService.emitDelivered(orderId, result.order);
    }
    
    // Broadcast status sync
    socketService.emitOrderUpdate(orderId, result.order);

    res.status(200).json({
      success: true,
      delivery: result.delivery,
      order: result.order,
    });
  } catch (error) {
    next(error);
  }
}
