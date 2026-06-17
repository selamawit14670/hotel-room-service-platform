import { useState, useEffect } from 'react';
import { Order, OrderStatus, MenuItem, StaffMember, OrderItem } from '../types';

export interface HotelSettings {
  name: string;
  logo: string;
  phone: string;
  address: string;
  totalRooms: number;
}

export type PortalType = 'none' | 'guest' | 'kitchen' | 'waiter' | 'supervisor' | 'admin';

export interface UserSession {
  role: PortalType;
  username?: string;
  roomNumber?: string;
  guestName?: string;
  phoneNumber?: string;
  waiterId?: string;
}

// Initial Menu Data
const INITIAL_MENU_ITEMS: MenuItem[] = [
  // Breakfast
  {
    id: "m-b1",
    name: "Classic Caviar Eggs Benedict",
    description: "Two poached farm eggs, smoked salmon on artisanal brioche, hollandaise, Royal Ossetra caviar crown.",
    price: 38.00,
    category: "Breakfast",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80",
    tags: ["Signature", "Royal Collection"]
  },
  {
    id: "m-b2",
    name: "Belgian Soufflé Waffles",
    description: "Whipped French batter waffles, organic woodland berries, lavender-infused maple syrup, Chantilly cream.",
    price: 24.00,
    category: "Breakfast",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&q=80",
    tags: ["Classic", "Popular"]
  },
  // Main Courses
  {
    id: "m-mc1",
    name: "Imperial Black Truffle Burger",
    description: "Premium dry-aged Wagyu beef patty, cave-aged white cheddar, shaved black truffles, charcoal-dust gold leaf fries.",
    price: 46.00,
    category: "Main Courses",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    tags: ["Bestseller", "Highly Recommended"]
  },
  {
    id: "m-mc2",
    name: "Slow-Braised Prime Ribeye Steak",
    description: "14oz dry-aged USDA Prime Ribeye glaze in rosemary bone-marrow pan glaze, charred baby leeks, and truffle potato mousse.",
    price: 68.00,
    category: "Main Courses",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    tags: ["Premium Cuts"]
  },
  // Beverages
  {
    id: "m-b3",
    name: "Gold Leaf Vintage Champagne",
    description: "Bespoke blend of Dom Pérignon vintage, artisanal elderflower elixir, visual 24k gold leaf swirl garnish.",
    price: 38.00,
    category: "Beverages",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1578401424476-35227185fe6e?auto=format&fit=crop&w=600&q=80",
    tags: ["Bespoke Lounge", "Luxury"]
  },
  {
    id: "m-b4",
    name: "Pressed Blue Mountain Pour-Over",
    description: "Bespoke single-estate Jamaica Blue Mountain beans ground & extracted bedside, raw Demerara sugar, lavender shortbread.",
    price: 16.00,
    category: "Beverages",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    tags: ["Aromatic", "Organic"]
  },
  // Snacks
  {
    id: "m-s1",
    name: "Bespoke Charcuterie & Cheese Display",
    description: "Prosciutto di Parma Aged 24 months, wild boar salami, French Brie de Meaux, Shropshire Blue, local honeycomb.",
    price: 32.00,
    category: "Snacks",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80",
    tags: ["Perfect Pairing", "Shared Table"]
  },
  {
    id: "m-s2",
    name: "Truffle & Toasted Herbs Popcorn",
    description: "Gourmet white kernels tossed lightly in white Alba truffle lipid glaze, fresh chives, smoked maldon flake salt.",
    price: 14.00,
    category: "Snacks",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1578496489467-3a1372551ec4?auto=format&fit=crop&w=600&q=80",
    tags: ["Light", "Late Night"]
  },
  // Amenities
  {
    id: "m-a1",
    name: "Plush Egyptian Towels Set",
    description: "Three ultra-heavy weight Egyptian combed cotton towels, warm & pre-sprayed with calming lavender mist.",
    price: 0.00,
    category: "Amenities",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    tags: ["Complimentary", "Guest Request"]
  },
  {
    id: "m-a2",
    name: "Luxury Goose-Down Pillow",
    description: "Premium hypoallergenic extra-soft goose-down support pillow wrapped in a silk jacquard protection sheet.",
    price: 0.00,
    category: "Amenities",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    tags: ["Complimentary", "Restful Sleep"]
  },
  {
    id: "m-a3",
    name: "Santal 33 Grooming Pack",
    description: "Travel collection of extra shower gel, hair wash, body lotion, and intensive hand treatment by Le Labo.",
    price: 0.00,
    category: "Amenities",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80",
    tags: ["Complimentary", "Premium Brand"]
  }
];

const INITIAL_STAFF_MEMBERS: StaffMember[] = [
  { id: "st-1", name: "Chef Thomas Keller", role: "chef", status: "active", assignedOrdersCount: 1, rating: 4.9, avatar: "👨‍🍳" },
  { id: "st-2", name: "Chef Hélène Darroze", role: "chef", status: "busy", assignedOrdersCount: 2, rating: 4.8, avatar: "👩‍🍳" },
  { id: "st-3", name: "Courier Sofia Lin", role: "waiter", status: "active", assignedOrdersCount: 0, rating: 4.9, avatar: "🕴️" },
  { id: "st-4", name: "Courier Marcus Perez", role: "waiter", status: "active", assignedOrdersCount: 1, rating: 4.7, avatar: "🏃‍♂️" },
  { id: "st-5", name: "Supervisor Julian Vance", role: "supervisor", status: "active", assignedOrdersCount: 0, rating: 5.0, avatar: "🤵" }
];

const DEFAULT_HOTEL_SETTINGS: HotelSettings = {
  name: "The Ritz-Carlton Belvedere",
  logo: "R",
  phone: "+33 1 79 01 44",
  address: "Place Vendôme, Paris, France",
  totalRooms: 350
};

const getInitialOrders = (): Order[] => {
  const now = new Date();
  return [
    {
      id: "ord-101",
      roomNumber: "304",
      guestName: "Lord Julian Sterling",
      items: [
        { id: "m-mc1", name: "Imperial Black Truffle Burger", price: 46.00, quantity: 1, category: "Main Courses" },
        { id: "m-b3", name: "Gold Leaf Vintage Champagne", price: 38.00, quantity: 1, category: "Beverages" }
      ],
      specialRequests: "Medium-rare burger, champagne iced bottle.",
      status: "pending",
      timestamp: new Date(now.getTime() - 4 * 60 * 1000), // 4 mins ago
      secondsElapsed: 240
    },
    {
      id: "ord-102",
      roomNumber: "512",
      guestName: "Lady Elizabeth Windsor",
      items: [
        { id: "m-b1", name: "Classic Caviar Eggs Benedict", price: 38.00, quantity: 2, category: "Breakfast" },
        { id: "m-b4", name: "Pressed Blue Mountain Pour-Over", price: 16.00, quantity: 1, category: "Beverages" }
      ],
      specialRequests: "No onions, honey instead of sugar.",
      status: "preparing",
      timestamp: new Date(now.getTime() - 12 * 60 * 1000), // 12 mins ago
      prepStartedAt: new Date(now.getTime() - 11 * 60 * 1000),
      chefName: "Chef Thomas Keller",
      secondsElapsed: 720
    },
    {
      id: "ord-103",
      roomNumber: "201",
      guestName: "Countess Victoria Vane",
      items: [
        { id: "m-b2", name: "Belgian Soufflé Waffles", price: 24.00, quantity: 1, category: "Breakfast" },
        { id: "m-a1", name: "Plush Egyptian Towels Set", price: 0.00, quantity: 2, category: "Amenities" }
      ],
      specialRequests: "Leave on door-peg if not responding.",
      status: "ready",
      timestamp: new Date(now.getTime() - 28 * 60 * 1000), // 28 mins ago 
      prepStartedAt: new Date(now.getTime() - 27 * 60 * 1000),
      readyAt: new Date(now.getTime() - 20 * 60 * 1000),
      chefName: "Chef Hélène Darroze",
      secondsElapsed: 1680
    },
    {
      id: "ord-104",
      roomNumber: "408",
      guestName: "Dr. Richard Branson",
      items: [
        { id: "m-s1", name: "Bespoke Charcuterie & Cheese Display", price: 32.00, quantity: 1, category: "Snacks" }
      ],
      status: "delivering",
      timestamp: new Date(now.getTime() - 32 * 60 * 1000), // 32 mins ago
      prepStartedAt: new Date(now.getTime() - 30 * 60 * 1000),
      readyAt: new Date(now.getTime() - 15 * 60 * 1000),
      waiterName: "Courier Sofia Lin",
      secondsElapsed: 1920
    },
    {
      id: "ord-105",
      roomNumber: "107",
      guestName: "Prof. Alistair Macleod",
      items: [
        { id: "m-s2", name: "Truffle & Toasted Herbs Popcorn", price: 14.00, quantity: 2, category: "Snacks" },
        { id: "m-a2", name: "Luxury Goose-Down Pillow", price: 0.00, quantity: 1, category: "Amenities" }
      ],
      status: "completed",
      timestamp: new Date(now.getTime() - 65 * 60 * 1000),
      prepStartedAt: new Date(now.getTime() - 60 * 60 * 1000),
      readyAt: new Date(now.getTime() - 45 * 60 * 1000),
      completedAt: new Date(now.getTime() - 40 * 60 * 1000),
      waiterName: "Courier Marcus Perez",
      secondsElapsed: 1500
    }
  ];
};

export function useSharedSystem() {
  const [session, setSession] = useState<UserSession>(() => {
    const saved = localStorage.getItem('rsos_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return { role: 'none' };
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('rsos_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((o: any) => ({
          ...o,
          timestamp: new Date(o.timestamp),
          prepStartedAt: o.prepStartedAt ? new Date(o.prepStartedAt) : undefined,
          readyAt: o.readyAt ? new Date(o.readyAt) : undefined,
          completedAt: o.completedAt ? new Date(o.completedAt) : undefined,
        }));
      } catch (e) {}
    }
    const initial = getInitialOrders();
    localStorage.setItem('rsos_orders', JSON.stringify(initial));
    return initial;
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('rsos_menu_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    localStorage.setItem('rsos_menu_items', JSON.stringify(INITIAL_MENU_ITEMS));
    return INITIAL_MENU_ITEMS;
  });

  const [staff, setStaff] = useState<StaffMember[]>(() => {
    const saved = localStorage.getItem('rsos_staff');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    localStorage.setItem('rsos_staff', JSON.stringify(INITIAL_STAFF_MEMBERS));
    return INITIAL_STAFF_MEMBERS;
  });

  const [settings, setSettings] = useState<HotelSettings>(() => {
    const saved = localStorage.getItem('rsos_hotel_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    localStorage.setItem('rsos_hotel_settings', JSON.stringify(DEFAULT_HOTEL_SETTINGS));
    return DEFAULT_HOTEL_SETTINGS;
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('rsos_theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return 'dark'; // Dark premium look
  });

  // Simulated WebSockets Connection Status: 'connected' | 'reconnecting' | 'offline'
  const [connectionStatus, setConnectionStatusState] = useState<'connected' | 'reconnecting' | 'offline'>(() => {
    const saved = localStorage.getItem('rsos_connection');
    return (saved as any) || 'connected';
  });

  // Offline Pending Operations queue
  const [offlineQueue, setOfflineQueue] = useState<any[]>(() => {
    const saved = localStorage.getItem('rsos_offline_queue');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  // Centralized alert message broadcasted via localStorage across tabs
  const [systemAlert, setSystemAlert] = useState<string | null>(null);

  // Storage listener across tabs for real-time synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'rsos_orders') {
        const parsed = JSON.parse(e.newValue || '[]');
        setOrders(parsed.map((o: any) => ({
          ...o,
          timestamp: new Date(o.timestamp),
          prepStartedAt: o.prepStartedAt ? new Date(o.prepStartedAt) : undefined,
          readyAt: o.readyAt ? new Date(o.readyAt) : undefined,
          completedAt: o.completedAt ? new Date(o.completedAt) : undefined,
        })));
      } else if (e.key === 'rsos_menu_items') {
        setMenuItems(JSON.parse(e.newValue || '[]'));
      } else if (e.key === 'rsos_staff') {
        setStaff(JSON.parse(e.newValue || '[]'));
      } else if (e.key === 'rsos_hotel_settings') {
        setSettings(JSON.parse(e.newValue || '{}'));
      } else if (e.key === 'rsos_session') {
        setSession(JSON.parse(e.newValue || '{"role":"none"}'));
      } else if (e.key === 'rsos_theme') {
        setTheme((e.newValue as 'light' | 'dark') || 'dark');
      } else if (e.key === 'rsos_connection') {
        setConnectionStatusState((e.newValue as any) || 'connected');
      } else if (e.key === 'rsos_offline_queue') {
        setOfflineQueue(JSON.parse(e.newValue || '[]'));
      } else if (e.key === 'rsos_system_alert') {
        if (e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            setSystemAlert(parsed.message);
            setTimeout(() => {
              setSystemAlert(null);
            }, 6000);
          } catch (err) {}
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Update Storage Helper
  const saveStateToStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new StorageEvent('storage', { key, newValue: JSON.stringify(value) }));
  };

  // Broadcast WebSockets system events across all devices & staff portals instantly
  const broadcastWSMessage = (msg: string) => {
    const payload = { message: msg, timestamp: Date.now() };
    localStorage.setItem('rsos_system_alert', JSON.stringify(payload));
    window.dispatchEvent(new StorageEvent('storage', { key: 'rsos_system_alert', newValue: JSON.stringify(payload) }));
    setSystemAlert(msg);
    setTimeout(() => {
      setSystemAlert(null);
    }, 6000);
  };

  // Change simulated connection modes ('connected' | 'reconnecting' | 'offline')
  const setConnectionStatus = (status: 'connected' | 'reconnecting' | 'offline') => {
    saveStateToStorage('rsos_connection', status);
    setConnectionStatusState(status);

    if (status === 'connected') {
      // Automatically flush and replay queued actions
      const savedQueue = localStorage.getItem('rsos_offline_queue');
      if (savedQueue) {
        try {
          const queue = JSON.parse(savedQueue);
          if (queue.length > 0) {
            saveStateToStorage('rsos_offline_queue', []);
            setOfflineQueue([]);
            broadcastWSMessage(`📡 Network Connected: Synchronized ${queue.length} offline actions to the Property Management System!`);
          } else {
            broadcastWSMessage(`🔌 WebSocket connection established on port 3000.`);
          }
        } catch (e) {}
      }
    } else if (status === 'reconnecting') {
      broadcastWSMessage(`⏳ Reconnecting: Accessing PMS telemetry database...`);
    } else {
      broadcastWSMessage(`🔌 Connection interrupted: Now working in offline-resilient cache mode.`);
    }
  };

  // Push item to the offline queuing registry
  const queueOfflineAction = (actionDesc: string) => {
    const nextQueue = [...offlineQueue, { desc: actionDesc, id: `act-${Date.now()}`, time: new Date().toLocaleTimeString() }];
    saveStateToStorage('rsos_offline_queue', nextQueue);
    setOfflineQueue(nextQueue);
    broadcastWSMessage(`⏳ [OFFLINE QUEUED] action saved on disk: "${actionDesc}"`);
  };

  // Tick active order timers
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(currentOrders => {
        const updated = currentOrders.map(o => {
          if (o.status !== 'completed' && o.status !== 'cancelled') {
            const msDiff = Date.now() - o.timestamp.getTime();
            return {
              ...o,
              secondsElapsed: Math.max(0, Math.floor(msDiff / 1000))
            };
          }
          return o;
        });
        localStorage.setItem('rsos_orders', JSON.stringify(updated));
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Apply visual theme to CSS DOM hierarchy
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  // Auth Operations
  const loginGuest = (roomNumber: string, guestName: string, phoneNumber: string) => {
    const newSession: UserSession = {
      role: 'guest',
      roomNumber,
      guestName,
      phoneNumber
    };
    saveStateToStorage('rsos_session', newSession);
    setSession(newSession);
    broadcastWSMessage(`🔑 Suite ${roomNumber} Active: ${guestName} registered and entered dining salon.`);
  };

  const loginStaff = (role: 'kitchen' | 'waiter' | 'supervisor' | 'admin', username: string, waiterId?: string) => {
    const newSession: UserSession = {
      role,
      username,
      waiterId
    };
    saveStateToStorage('rsos_session', newSession);
    setSession(newSession);
    broadcastWSMessage(`💼 Portal Auth: ${username} connected to the ${role.toUpperCase()} dispatch terminal.`);
  };

  const logout = () => {
    const oldRole = session.role;
    const oldName = session.guestName || session.username || "Staff";
    const newSession: UserSession = { role: 'none' };
    saveStateToStorage('rsos_session', newSession);
    setSession(newSession);
    broadcastWSMessage(`🔒 Session Closed: ${oldName} disconnected from ${oldRole.toUpperCase()} terminal.`);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    saveStateToStorage('rsos_theme', nextTheme);
    setTheme(nextTheme);
  };

  // Order Operations with live events
  const placeOrder = (items: OrderItem[], specialRequests?: string) => {
    if (session.role !== 'guest' || !session.roomNumber || !session.guestName) return null;

    const newOrder: Order = {
      id: `ord-${Math.floor(100 + Math.random() * 900)}`,
      roomNumber: session.roomNumber,
      guestName: session.guestName,
      items,
      specialRequests,
      status: 'pending',
      timestamp: new Date(),
      secondsElapsed: 0
    };

    const nextOrders = [newOrder, ...orders];
    saveStateToStorage('rsos_orders', nextOrders);
    setOrders(nextOrders);

    if (connectionStatus === 'offline') {
      queueOfflineAction(`Place Order ${newOrder.id} for Room ${newOrder.roomNumber}`);
    } else {
      broadcastWSMessage(`🔔 WS_EVENT: ORDER_CREATED » Suite ${newOrder.roomNumber} placed order ${newOrder.id} (${items.length} items)!`);
    }
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, extra: Partial<Order> = {}) => {
    const prevOrder = orders.find(o => o.id === orderId);
    const room = prevOrder ? prevOrder.roomNumber : '?';

    const nextOrders = orders.map(o => {
      if (o.id === orderId) {
        const patch: Partial<Order> = { ...extra, status };
        if (status === 'preparing' && !o.prepStartedAt) {
          patch.prepStartedAt = new Date();
        } else if (status === 'ready' && !o.readyAt) {
          patch.readyAt = new Date();
        } else if (status === 'completed' && !o.completedAt) {
          patch.completedAt = new Date();
        }
        return { ...o, ...patch };
      }
      return o;
    });

    saveStateToStorage('rsos_orders', nextOrders);
    setOrders(nextOrders);

    if (connectionStatus === 'offline') {
      queueOfflineAction(`Update Order ${orderId} status to ${status.toUpperCase()}`);
    } else {
      const statusMap: Record<string, string> = {
        pending: 'ORDER_CREATED',
        preparing: 'ORDER_PREPARING',
        ready: 'ORDER_READY',
        delivering: 'ORDER_DELIVERING',
        completed: 'ORDER_DELIVERED',
        cancelled: 'ORDER_CANCELLED'
      };
      const eventCode = statusMap[status] || 'ORDER_UPDATED';
      const actorAndContext = 
        status === 'preparing' ? `Chef started cooking` :
        status === 'ready' ? `Kitchen finished plating` :
        status === 'delivering' ? `${extra.waiterName || 'Courier'} claimed & dispatched` :
        status === 'completed' ? `Courier delivered to Door` : `Status updated to ${status}`;
      
      broadcastWSMessage(`🍽️ WS_EVENT: ${eventCode} » Order ${orderId} (Suite ${room}) &bull; ${actorAndContext}!`);
    }
  };

  // Menu Management Table API
  const saveMenuItem = (item: MenuItem) => {
    const exists = menuItems.find(m => m.id === item.id);
    let nextItems;
    if (exists) {
      nextItems = menuItems.map(m => m.id === item.id ? item : m);
    } else {
      nextItems = [...menuItems, item];
    }
    saveStateToStorage('rsos_menu_items', nextItems);
    setMenuItems(nextItems);

    if (connectionStatus === 'offline') {
      queueOfflineAction(`Save Menu Item ${item.name}`);
    } else {
      broadcastWSMessage(`📝 WS_EVENT: MENU_UPDATED » Culinary item "${item.name}" was saved.`);
    }
  };

  const deleteMenuItem = (itemId: string) => {
    const deletedItem = menuItems.find(m => m.id === itemId);
    const name = deletedItem ? deletedItem.name : itemId;
    const nextItems = menuItems.filter(m => m.id !== itemId);
    saveStateToStorage('rsos_menu_items', nextItems);
    setMenuItems(nextItems);

    if (connectionStatus === 'offline') {
      queueOfflineAction(`Delete Menu Item ${name}`);
    } else {
      broadcastWSMessage(`🔥 WS_EVENT: MENU_UPDATED » Culinary item "${name}" was deleted.`);
    }
  };

  // Staff Management Table API
  const updateStaffStatus = (staffId: string, status: 'active' | 'busy' | 'offline') => {
    const member = staff.find(s => s.id === staffId);
    const name = member ? member.name : staffId;

    const nextStaff = staff.map(s => {
      if (s.id === staffId) {
        return { ...s, status };
      }
      return s;
    });
    saveStateToStorage('rsos_staff', nextStaff);
    setStaff(nextStaff);

    if (connectionStatus === 'offline') {
      queueOfflineAction(`Update Staff ${name} to ${status}`);
    } else {
      broadcastWSMessage(`🕴️ WS_EVENT: STAFF_STATUS_CHANGED » ${name} is now ${status.toUpperCase()}.`);
    }
  };

  const updateStaffMember = (member: StaffMember) => {
    const exists = staff.find(s => s.id === member.id);
    let nextStaff;
    if (exists) {
      nextStaff = staff.map(s => s.id === member.id ? member : s);
    } else {
      nextStaff = [...staff, member];
    }
    saveStateToStorage('rsos_staff', nextStaff);
    setStaff(nextStaff);

    if (connectionStatus === 'offline') {
      queueOfflineAction(`Save Staff Roster Member ${member.name}`);
    } else {
      broadcastWSMessage(`🕴️ WS_EVENT: STAFF_STATUS_CHANGED » Team member "${member.name}" was modified.`);
    }
  };

  const updateHotelSettings = (newSettings: HotelSettings) => {
    saveStateToStorage('rsos_hotel_settings', newSettings);
    setSettings(newSettings);

    if (connectionStatus === 'offline') {
      queueOfflineAction(`Update Properties settings for ${newSettings.name}`);
    } else {
      broadcastWSMessage(`🏨 WS_EVENT: HOTEL_SETTINGS_CHANGED » Global hospitality metadata synced.`);
    }
  };

  return {
    session,
    orders,
    menuItems,
    staff,
    settings,
    theme,
    connectionStatus,
    offlineQueue,
    systemAlert,
    setConnectionStatus,
    broadcastWSMessage,
    loginGuest,
    loginStaff,
    logout,
    toggleTheme,
    placeOrder,
    updateOrderStatus,
    saveMenuItem,
    deleteMenuItem,
    updateStaffStatus,
    updateStaffMember,
    updateHotelSettings
  };
}
