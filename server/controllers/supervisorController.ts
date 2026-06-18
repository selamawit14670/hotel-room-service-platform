import { Request, Response, NextFunction } from 'express';
import { prisma } from '../services/prisma';
import { AppError } from '../utils/appError';
import { socketService } from '../services/socket';
import { OrderStatus, StaffStatus } from '@prisma/client';

/**
 * Returns a register of all hotel staff workers on operations duty
 */
export async function getStaffStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const staff = await prisma.user.findMany({
      where: {
        role: {
          in: ['KITCHEN', 'WAITER', 'SUPERVISOR'],
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        role: 'asc',
      }
    });

    res.status(200).json({
      success: true,
      staff,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Updates a staff member's duty availability state (e.g. ONDUTY -> BREAK)
 */
export async function updateStaffStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { staffId } = req.params;
    const { status } = req.body;

    if (!staffId || !status) {
      throw new AppError('Staff member ID and target status parameters are required.', 400);
    }

    const validStatuses = ['ONDUTY', 'BREAK', 'OFFLINE'] as StaffStatus[];
    if (!validStatuses.includes(status as StaffStatus)) {
      throw new AppError(`Invalid status '${status}'. Must be one of ${validStatuses.join(', ')}`, 400);
    }

    const updatedUser = await prisma.user.update({
      where: { id: staffId },
      data: { status: status as StaffStatus },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
      }
    });

    // Notify supervisors via web sockets
    socketService.emitStaffStatusUpdate(staffId, status, updatedUser);

    res.status(200).json({
      success: true,
      staff: updatedUser,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Queries active suite tickets exceeding the 30-minute threshold
 */
export async function getDelayedOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    const delayedOrders = await prisma.order.findMany({
      where: {
        status: {
          notIn: ['COMPLETED', 'CANCELLED'] as OrderStatus[],
        },
        createdAt: {
          lt: thirtyMinutesAgo,
        }
      },
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
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'asc',
      }
    });

    res.status(200).json({
      success: true,
      delayedOrders,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Pulls overall real-time KPI metrics for dashboard graphs
 */
export async function getOversightMetrics(req: Request, res: Response, next: NextFunction) {
  try {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    // 1. Live Active Tickets count
    const liveActiveCount = await prisma.order.count({
      where: {
        status: {
          in: ['PENDING', 'PREPARING', 'READY', 'DELIVERING'] as OrderStatus[],
        }
      }
    });

    // 2. Escalation warnings (>30m rules) count
    const escalationCount = await prisma.order.count({
      where: {
        status: {
          in: ['PENDING', 'PREPARING', 'READY', 'DELIVERING'] as OrderStatus[],
        },
        createdAt: {
          lt: thirtyMinutesAgo,
        }
      }
    });

    // 3. Kitchen staff currently active on duty
    const activeChefs = await prisma.user.count({
      where: {
        role: 'KITCHEN',
        status: 'ONDUTY',
      }
    });

    // 4. Completed deliveries
    const completedDeliveries = await prisma.order.count({
      where: {
        status: 'COMPLETED',
      }
    });

    res.status(200).json({
      success: true,
      metrics: {
        liveActiveCount,
        escalationCount,
        activeChefs,
        completedDeliveries,
      }
    });
  } catch (error) {
    next(error);
  }
}
