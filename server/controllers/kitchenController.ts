import { Request, Response, NextFunction } from 'express';
import { prisma } from '../services/prisma';
import { AppError } from '../utils/appError';
import { socketService } from '../services/socket';
import { OrderStatus } from '@prisma/client';

/**
 * Returns active culinary tickets (PENDING, PREPARING, READY)
 */
export async function getActiveOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const activeOrders = await prisma.order.findMany({
      where: {
        status: {
          in: ['PENDING', 'PREPARING', 'READY'] as OrderStatus[],
        },
      },
      include: {
        guest: true,
        orderItems: {
          include: {
            menuItem: true,
          }
        },
      },
      orderBy: {
        createdAt: 'asc', // FIFO standard queueing
      },
    });

    res.status(200).json({
      success: true,
      orders: activeOrders,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Transitions order status (e.g., PENDING -> PREPARING or PREPARING -> READY)
 */
export async function updateOrderStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId || !status) {
      throw new AppError('Order ID and a target status string must be specified.', 400);
    }

    const availableStatuses = ['PENDING', 'PREPARING', 'READY', 'DELIVERING', 'COMPLETED', 'CANCELLED'];
    if (!availableStatuses.includes(status)) {
      throw new AppError(`Invalid status '${status}'. Must be one of ${availableStatuses.join(', ')}`, 400);
    }

    // Update main order
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: status as OrderStatus },
      include: {
        guest: true,
        orderItems: {
          include: {
            menuItem: true,
          },
        },
        delivery: true,
      },
    });

    // Check status triggers to alert specific modules in real-time
    if (status === 'PREPARING') {
      socketService.emitPreparing(orderId, updatedOrder);
    } else if (status === 'READY') {
      // Auto-transition Delivery status to match order queue
      await prisma.delivery.updateMany({
        where: { orderId: orderId },
        data: { status: 'ASSIGNED' },
      });
      socketService.emitReady(orderId, updatedOrder);
    }

    // Generic system-wide state sync
    socketService.emitOrderUpdate(orderId, updatedOrder);

    res.status(200).json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
}
