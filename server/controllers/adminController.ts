import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../services/prisma';
import { AppError } from '../utils/appError';
import { Role, StaffStatus } from '@prisma/client';

// === 1. STAFF MANAGEMENT CRUD ===

export async function createStaff(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !password || !role) {
      throw new AppError('Name, email, password, and operational role are required.', 400);
    }

    const validRoles = ['KITCHEN', 'WAITER', 'SUPERVISOR', 'ADMIN'] as Role[];
    if (!validRoles.includes(role)) {
      throw new AppError(`Invalid role specification. Choose one of: ${validRoles.join(', ')}`, 400);
    }

    // Guard: Unique email check
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError('An account with this email address already exists.', 409);
    }

    // Encrypt password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: role as Role,
        status: 'OFFLINE' as StaffStatus,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
      }
    });

    res.status(201).json({
      success: true,
      staff: newUser,
    });
  } catch (error) {
    next(error);
  }
}

export async function getStaffList(req: Request, res: Response, next: NextFunction) {
  try {
    const staff = await prisma.user.findMany({
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
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      success: true,
      staff,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateStaff(req: Request, res: Response, next: NextFunction) {
  try {
    const { staffId } = req.params;
    const { name, email, phone, role, status, password } = req.body;

    const dataToUpdate: any = {};
    if (name) dataToUpdate.name = name;
    if (email) dataToUpdate.email = email;
    if (phone) dataToUpdate.phone = phone;
    if (role) dataToUpdate.role = role as Role;
    if (status) dataToUpdate.status = status as StaffStatus;
    if (password) {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: staffId },
      data: dataToUpdate,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
      }
    });

    res.status(200).json({
      success: true,
      staff: updatedUser,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteStaff(req: Request, res: Response, next: NextFunction) {
  try {
    const { staffId } = req.params;

    await prisma.user.delete({
      where: { id: staffId },
    });

    res.status(200).json({
      success: true,
      message: 'Staff member account deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
}

// === 2. MENU MANAGEMENT CRUD ===

export async function createMenuCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.body;

    if (!name) {
      throw new AppError('Menu category name is required.', 400);
    }

    const category = await prisma.menuCategory.create({
      data: { name },
    });

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateMenuCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;

    if (!name) {
      throw new AppError('Menu category name is required.', 400);
    }

    const category = await prisma.menuCategory.update({
      where: { id: categoryId },
      data: { name },
    });

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteMenuCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { categoryId } = req.params;

    // Reject deletion if items are bound (Restrict relation matches DELETE rules)
    const attachedItemsCount = await prisma.menuItem.count({
      where: { categoryId }
    });

    if (attachedItemsCount > 0) {
      throw new AppError('Cannot delete category: contains active menu dishes. Delete or reassign items first.', 400);
    }

    await prisma.menuCategory.delete({
      where: { id: categoryId },
    });

    res.status(200).json({
      success: true,
      message: 'Menu category deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
}

export async function createMenuItem(req: Request, res: Response, next: NextFunction) {
  try {
    const { categoryId, name, description, image, preparationTime, price, available } = req.body;

    if (!categoryId || !name || !price) {
      throw new AppError('Dish category link, name, and pricing are required.', 400);
    }

    const dish = await prisma.menuItem.create({
      data: {
        categoryId,
        name,
        description: description || '',
        image: image || null,
        preparationTime: preparationTime ? parseInt(preparationTime, 10) : 15,
        price: Number(price),
        available: available !== undefined ? Boolean(available) : true,
      }
    });

    res.status(201).json({
      success: true,
      menuItem: dish,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateMenuItem(req: Request, res: Response, next: NextFunction) {
  try {
    const { itemId } = req.params;
    const { categoryId, name, description, image, preparationTime, price, available } = req.body;

    const dataToUpdate: any = {};
    if (categoryId) dataToUpdate.categoryId = categoryId;
    if (name) dataToUpdate.name = name;
    if (description !== undefined) dataToUpdate.description = description;
    if (image !== undefined) dataToUpdate.image = image;
    if (preparationTime !== undefined) dataToUpdate.preparationTime = parseInt(preparationTime, 10);
    if (price !== undefined) dataToUpdate.price = Number(price);
    if (available !== undefined) dataToUpdate.available = Boolean(available);

    const dish = await prisma.menuItem.update({
      where: { id: itemId },
      data: dataToUpdate,
    });

    res.status(200).json({
      success: true,
      menuItem: dish,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteMenuItem(req: Request, res: Response, next: NextFunction) {
  try {
    const { itemId } = req.params;

    await prisma.menuItem.delete({
      where: { id: itemId },
    });

    res.status(200).json({
      success: true,
      message: 'Culinary dish removed from menu successfully.',
    });
  } catch (error) {
    next(error);
  }
}

// === 3. EXECUTIVE METRICS & DASHBOARD DATA ===

export async function getAdminDashboard(req: Request, res: Response, next: NextFunction) {
  try {
    // 1. Calculate historical gross revenue (sum of companion totalAmount for completed orders)
    const completedOrders = await prisma.order.findMany({
      where: { status: 'COMPLETED' },
      select: { totalAmount: true }
    });

    const totalRevenue = completedOrders.reduce((sum, order) => sum + Number(order.totalAmount), 0);

    // 2. Count distinct status distributions
    const statusCounts = await prisma.order.groupBy({
      by: ['status'],
      _count: {
        id: true,
      }
    });

    const formattedStatusDist = statusCounts.reduce((acc: any, item) => {
      acc[item.status.toLowerCase()] = item._count.id;
      return acc;
    }, { pending: 0, preparing: 0, ready: 0, delivering: 0, completed: 0, cancelled: 0 });

    // 3. Extract popular menu items by quantity ordered
    const orderItemsAggregation = await prisma.orderItem.groupBy({
      by: ['menuItemId'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 5
    });

    const activePopularItems = [];
    for (const item of orderItemsAggregation) {
      const dish = await prisma.menuItem.findUnique({
        where: { id: item.menuItemId },
        select: { name: true, price: true }
      });
      if (dish) {
        activePopularItems.push({
          name: dish.name,
          price: Number(dish.price),
          quantity: item._sum.quantity || 0,
        });
      }
    }

    // 4. Summarize key quantities
    const totalOrdersCount = await prisma.order.count();
    const guestRoomsActive = await prisma.guest.count();
    const activeStaffCount = await prisma.user.count({
      where: {
        role: { not: 'ADMIN' },
        status: { in: ['ONDUTY', 'BREAK'] }
      }
    });

    res.status(200).json({
      success: true,
      analytics: {
        totalRevenue,
        totalOrdersCount,
        guestRoomsActive,
        activeStaffCount,
        statusDistribution: formattedStatusDist,
        popularDishes: activePopularItems,
      }
    });
  } catch (error) {
    next(error);
  }
}
