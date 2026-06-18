import { Server as SocketServer } from 'socket.io';
import { Server as HttpServer } from 'http';

export let io: SocketServer | null = null;

export function initSocket(server: HttpServer): SocketServer {
  io = new SocketServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`🔌 New Socket client connection: ${socket.id}`);

    // Join specific operational channels (e.g. guest_104B, kitchen_channel, waiter_channel, supervisor_channel)
    socket.on('join_channel', (channel: string) => {
      socket.join(channel);
      console.log(`📡 Client ${socket.id} joined channel: ${channel}`);
    });

    // Leave channels when changing tabs/logouts
    socket.on('leave_channel', (channel: string) => {
      socket.leave(channel);
      console.log(`📡 Client ${socket.id} left channel: ${channel}`);
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Socket client disconnected: ${socket.id}`);
    });
  });

  return io;
}

/**
 * Clean real-time event distribution wrappers
 */
export const socketService = {
  emitNewOrder(order: any) {
    if (io) {
      io.to('kitchen_channel').emit('new_order', order);
      io.to('supervisor_channel').emit('new_order', order);
    }
  },
  emitPreparing(orderId: string, order: any) {
    if (io) {
      const guestChannel = `guest_${order.roomNumber}`;
      io.to(guestChannel).emit('preparing', { orderId, order });
      io.to('supervisor_channel').emit('preparing', { orderId, order });
    }
  },
  emitReady(orderId: string, order: any) {
    if (io) {
      const guestChannel = `guest_${order.roomNumber}`;
      io.to(guestChannel).emit('ready', { orderId, order });
      io.to('waiter_channel').emit('ready', { orderId, order });
      io.to('supervisor_channel').emit('ready', { orderId, order });
    }
  },
  emitDelivered(orderId: string, order: any) {
    if (io) {
      const guestChannel = `guest_${order.roomNumber}`;
      io.to(guestChannel).emit('delivered', { orderId, order });
      io.to('supervisor_channel').emit('delivered', { orderId, order });
    }
  },
  emitOrderUpdate(orderId: string, order: any) {
    if (io) {
      const guestChannel = `guest_${order.roomNumber}`;
      io.to(guestChannel).emit('order_update', { orderId, order });
      io.to('kitchen_channel').emit('order_update', { orderId, order });
      io.to('waiter_channel').emit('order_update', { orderId, order });
      io.to('supervisor_channel').emit('order_update', { orderId, order });
    }
  },
  emitStaffStatusUpdate(staffId: string, status: string, staff: any) {
    if (io) {
      io.to('supervisor_channel').emit('staff_status_update', { staffId, status, staff });
    }
  }
};
