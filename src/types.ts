/**
 * Types & Schemas for RoomServiceOS Landing Page + Multi-Portal Synchronized Simulation
 */

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivering' | 'completed' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export interface Order {
  id: string;
  roomNumber: string;
  guestName: string;
  items: OrderItem[];
  specialRequests?: string;
  status: OrderStatus;
  timestamp: Date; // when placed
  prepStartedAt?: Date;
  readyAt?: Date;
  completedAt?: Date;
  secondsElapsed: number; // for live timer progress simulation
  chefName?: string;
  waiterName?: string;
  isDelayed?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  tags: string[];
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'chef' | 'waiter' | 'supervisor';
  status: 'active' | 'busy' | 'offline';
  assignedOrdersCount: number;
  rating: number;
  avatar: string;
}

export interface PlatformMetrics {
  totalRevenue: number;
  orderCount: number;
  avgOrderValue: number;
  avgDeliveryMinutes: number;
  guestSatisfaction: number;
  errorReductionRate: number;
}

export interface DemoRequest {
  fullName: string;
  email: string;
  hotelName: string;
  hotelSize: string; // "1-50 rooms", "51-200 rooms", "201+ rooms"
  phone: string;
  preferredDate: string;
  notes?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  hotelBrand: string;
  impactMetrics: string;
  imgUrl: string;
}

export interface PricingPlan {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  badge?: string;
  description: string;
  features: string[];
  notIncluded: string[];
}
