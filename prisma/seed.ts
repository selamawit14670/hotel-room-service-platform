import { PrismaClient, Role, StaffStatus, OrderStatus, DeliveryStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting RoomServiceOS Database Seeding...');

  // --- 1. SEED USERS / STAFF ---
  console.log('👥 Seeding hotel staff users...');
  
  // Kitchen Chef
  const chef = await prisma.user.upsert({
    where: { email: 'chef.sofia@roomserviceos.com' },
    update: {},
    create: {
      name: 'Chef Sofia Lin',
      email: 'chef.sofia@roomserviceos.com',
      phone: '+15550190',
      password: '$2b$10$xyzhashedpasswordhere', // Real bcrypt hashes in production
      role: Role.KITCHEN,
      status: StaffStatus.ONDUTY,
    },
  });

  // Waiter / Courier
  const waiter = await prisma.user.upsert({
    where: { email: 'marcus.waiter@roomserviceos.com' },
    update: {},
    create: {
      name: 'Courier Marcus Perez',
      email: 'marcus.waiter@roomserviceos.com',
      phone: '+15550231',
      password: '$2b$10$xyzhashedpasswordhere',
      role: Role.WAITER,
      status: StaffStatus.ONDUTY,
    },
  });

  // Supervisor
  const supervisor = await prisma.user.upsert({
    where: { email: 'supervisor@roomserviceos.com' },
    update: {},
    create: {
      name: 'Operations Manager Diana Prince',
      email: 'supervisor@roomserviceos.com',
      phone: '+15550488',
      password: '$2b$10$xyzhashedpasswordhere',
      role: Role.SUPERVISOR,
      status: StaffStatus.ONDUTY,
    },
  });

  // System Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@roomserviceos.com' },
    update: {},
    create: {
      name: 'Admin Director Edward Stark',
      email: 'admin@roomserviceos.com',
      phone: '+15550999',
      password: '$2b$10$xyzhashedpasswordhere',
      role: Role.ADMIN,
      status: StaffStatus.ONDUTY,
    },
  });

  console.log('✅ Staff accounts created successfully!');

  // --- 2. SEED MENU CATEGORIES & ITEMS ---
  console.log('🍽️ Seeding menu categories and culinary items...');

  // Category 1: Breakfast
  const breakfastCat = await prisma.menuCategory.upsert({
    where: { name: 'Signature Breakfasts' },
    update: {},
    create: { name: 'Signature Breakfasts' },
  });

  const benedict = await prisma.menuItem.create({
    data: {
      categoryId: breakfastCat.id,
      name: 'Imperial Eggs Benedict',
      description: 'Poached organic eggs, house-cured Canadian bacon, saffron-infused hollandaise sauce, served over standard toasted brioche.',
      image: '/assets/eggs_benedict.jpg',
      preparationTime: 12,
      price: 24.50,
      available: true,
    }
  });

  // Category 2: Mains/Dinner
  const dinnerCat = await prisma.menuCategory.upsert({
    where: { name: 'Gourmet Entrées' },
    update: {},
    create: { name: 'Gourmet Entrées' },
  });

  const ribeye = await prisma.menuItem.create({
    data: {
      categoryId: dinnerCat.id,
      name: 'Prime Dry-Aged Ribeye',
      description: '14oz flame-seared custom cut, black truffle compound butter, rosemary charred asparagus, roasted fingerling potatoes.',
      image: '/assets/prime_ribeye.jpg',
      preparationTime: 25,
      price: 68.00,
      available: true,
    }
  });

  // Category 3: Drinks
  const drinkCat = await prisma.menuCategory.upsert({
    where: { name: 'Artisan Beverages' },
    update: {},
    create: { name: 'Artisan Beverages' },
  });

  const matcha = await prisma.menuItem.create({
    data: {
      categoryId: drinkCat.id,
      name: 'Ceremonial Uji Matcha Latte',
      description: 'Whip-whisked Japanese stone-ground matcha, creamy organic oat milk, lightly sweetened with pure Madagascar vanilla syrup.',
      image: '/assets/matcha_latte.jpg',
      preparationTime: 5,
      price: 9.50,
      available: true,
    }
  });

  console.log('✅ Menu taxonomy loaded!');

  // --- 3. SEED GUESTS & CORRESPONDING ORDER SYSTEM ---
  console.log('🏨 Seeding resort guest specimen databases...');

  const guest1 = await prisma.guest.create({
    data: {
      roomNumber: '104B',
      guestName: 'Mr. Alexander Vance',
      phoneNumber: '+15559871',
    }
  });

  const guest2 = await prisma.guest.create({
    data: {
      roomNumber: 'Penthouse A',
      guestName: 'Lady Genevieve Sterling',
      phoneNumber: '+15554123',
    }
  });

  console.log('✅ Guest entries saved!');

  // --- 4. SEED REPRESENTATIVE ORDER, ORDER ITEMS, & DELIVERIES ---
  console.log('📋 Loading live and historic order cycles...');

  // Active Live Order: Guest #1 Room 104B placing order for Eggs Benedict & Matcha Latte
  const liveOrder = await prisma.order.create({
    data: {
      guestId: guest1.id,
      roomNumber: guest1.roomNumber,
      totalAmount: 34.00, // Benedit $24.50 + Matcha $9.50
      status: OrderStatus.PREPARING,
      orderItems: {
        create: [
          {
            menuItemId: benedict.id,
            quantity: 1,
            price: 24.50,
          },
          {
            menuItemId: matcha.id,
            quantity: 1,
            price: 9.50,
          }
        ]
      }
    }
  });

  // Completed Historical Order: Lady Genevieve ribeye order
  const completedOrder = await prisma.order.create({
    data: {
      guestId: guest2.id,
      roomNumber: guest2.roomNumber,
      totalAmount: 68.00,
      status: OrderStatus.COMPLETED,
      createdAt: new Date(Date.now() - 4 * 3600000), // 4 hours ago
      orderItems: {
        create: [
          {
            menuItemId: ribeye.id,
            quantity: 1,
            price: 68.00,
          }
        ]
      }
    }
  });

  // Assign delivery object for completed historical order
  await prisma.delivery.create({
    data: {
      orderId: completedOrder.id,
      waiterId: waiter.id,
      status: DeliveryStatus.DELIVERED,
      deliveredAt: new Date(Date.now() - 3.5 * 3600000), // Delivered shortly after
    }
  });

  // --- 5. SYSTEM NOTIFICATIONS ---
  console.log('🔔 Launching initial server notifications...');
  await prisma.notification.create({
    data: {
      userId: supervisor.id,
      title: 'Delayed Suite Alert Issued',
      message: 'Attention: Order #1 for Suite 104B has reached cooking queue limits.',
      read: false,
    }
  });

  console.log('🎉 Seeding successfully finished!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
