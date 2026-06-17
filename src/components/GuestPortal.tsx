import React, { useState } from 'react';
import { 
  ShoppingBag, Clipboard, History, Sparkles, Moon, Sun, LogOut, 
  Clock, Flame, Plus, Minus, Check, ChevronRight, Info, UtensilsCrossed 
} from 'lucide-react';
import { MenuItem, Order, OrderItem } from '../types';

interface GuestPortalProps {
  session: {
    roomNumber?: string;
    guestName?: string;
    phoneNumber?: string;
  };
  menuItems: MenuItem[];
  orders: Order[];
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onLogout: () => void;
  onPlaceOrder: (items: OrderItem[], specialRequests?: string) => Order | null;
}

export default function GuestPortal({
  session,
  menuItems,
  orders,
  theme,
  onToggleTheme,
  onLogout,
  onPlaceOrder
}: GuestPortalProps) {
  const [activeTab, setActiveTab] = useState<'menu' | 'cart' | 'tracking'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string>('Breakfast');
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Room Charge' | 'Cash' | 'Card'>('Room Charge');
  const [justPlacedOrder, setJustPlacedOrder] = useState<Order | null>(null);

  // Filter menu items by category
  const filteredNavItems = menuItems.filter(item => item.category === selectedCategory);

  // Cart operations
  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        category: item.category
      }];
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const nextQty = item.quantity + delta;
          if (nextQty <= 0) return null;
          return { ...item, quantity: nextQty };
        }
        return item;
      }).filter(Boolean) as OrderItem[];
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Filter guest's order history
  const guestOrders = orders.filter(o => o.roomNumber === session.roomNumber);
  const activeOrder = justPlacedOrder 
    ? orders.find(o => o.id === justPlacedOrder.id) || justPlacedOrder
    : guestOrders.find(o => o.status !== 'completed' && o.status !== 'cancelled') || guestOrders[0];

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const formattedItems = cart.map(i => ({
      id: i.id,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      category: i.category
    }));

    const result = onPlaceOrder(formattedItems, specialRequests);
    if (result) {
      setJustPlacedOrder(result);
      setCart([]);
      setSpecialRequests('');
      setActiveTab('tracking');
    }
  };

  // Status mapping for visual timeline
  const getTimelineStep = (status: string): number => {
    switch (status) {
      case 'pending': return 1;     // Order Received
      case 'preparing': return 3;   // Preparing (Kitchen active)
      case 'ready': return 4;       // Ready in kitchen (Waiter notified)
      case 'delivering': return 5;  // Out for Delivery
      case 'completed': return 6;   // Delivered
      default: return 1;
    }
  };

  const getStatusStringAndDesc = (status: string) => {
    switch (status) {
      case 'pending': return { title: 'Order Received', desc: 'Our head sommelier/chef is confirming your request.' };
      case 'preparing': return { title: 'Kitchen Preparing', desc: 'Savoury ingredients of premium selection are currently cooking.' };
      case 'ready': return { title: 'Dished & Ready', desc: 'Your selection is plated, insulated, and awaiting transport pickup.' };
      case 'delivering': return { title: 'Corridor Dispatch', desc: 'Our designated room suite waiter is ascending the tower lift.' };
      case 'completed': return { title: 'Delivered Elegantly', desc: 'Delivered to your luxury suite door. Bon Appétit!' };
      case 'cancelled': return { title: 'Cancelled Order', desc: 'Request has been halted or adjusted by hotel front-desk.' };
      default: return { title: 'In Discussion', desc: 'Your in-room ticket is placed.' };
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg-light dark:bg-brand-bg-dark text-brand-text-light dark:text-brand-text-dark transition-colors duration-300 relative font-sans leading-normal antialiased">
      
      {/* Dynamic Header */}
      <header className="sticky top-0 z-30 bg-brand-surface-light/90 dark:bg-brand-surface-dark/90 backdrop-blur-md border-b border-brand-border-light dark:border-brand-border-dark px-4 py-3 sm:px-6 shadow-sm select-none">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-luxury-gold-dark dark:bg-luxury-gold text-brand-bg-light dark:text-brand-bg-dark font-display font-bold flex items-center justify-center text-base">
              R
            </span>
            <div className="text-left">
              <h1 className="text-sm font-bold tracking-widest font-display text-brand-text-light dark:text-brand-text-dark uppercase leading-none">
                RoomServiceOS
              </h1>
              <p className="text-[9px] uppercase font-mono tracking-widest text-luxury-gold-dark dark:text-luxury-gold mt-0.5 font-bold">
                Suite {session.roomNumber || "304"} Keys
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-brand-bg-light dark:bg-brand-surface-dark border border-brand-border-light dark:border-brand-border-dark hover:text-luxury-gold transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-luxury-gold" /> : <Moon className="w-4 h-4 text-[#B38B4D]" />}
            </button>
            {/* Exit/Change Role */}
            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-brand-bg-light dark:bg-brand-surface-dark border border-brand-border-light dark:border-brand-border-dark hover:text-rose-500 transition-colors font-mono text-[10px] uppercase flex items-center gap-1 cursor-pointer"
              title="Leave Room Channel"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Guest Greeting Banner */}
      <div className="bg-gradient-to-r from-luxury-gold/10 via-luxury-gold/5 to-luxury-gold-dark/10 border-b border-brand-border-light dark:border-brand-border-dark py-3.5 px-4 select-none">
        <div className="max-w-md mx-auto text-center space-y-1">
          <p className="text-[10px] uppercase font-mono tracking-widest text-[#B38B4D] dark:text-[#C8A86B] font-bold">
            ESTEEMED RECEPTION WELCOME
          </p>
          <p className="text-sm font-bold text-brand-text-light dark:text-brand-text-dark font-display">
            Welcome back, {session.guestName || "Estee Lauder"}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            Enjoy premium bed-side gourmet. Hand-crafted, delivered with speed.
          </p>
        </div>
      </div>

      {/* Core Tabs Navigator */}
      <div className="sticky top-[57px] z-20 bg-brand-surface-light/95 dark:bg-brand-surface-dark/95 border-b border-brand-border-light dark:border-brand-border-dark py-2 shadow-sm select-none">
        <div className="max-w-md mx-auto grid grid-cols-3 px-3 gap-1.5 font-mono text-[11px] font-bold">
          <button
            onClick={() => setActiveTab('menu')}
            className={`py-2 px-1.5 rounded-xl text-center cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'menu'
                ? 'bg-luxury-gold-dark dark:bg-luxury-gold text-white dark:text-[#0B1F1A] font-extrabold shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-brand-text-light dark:hover:text-brand-text-dark'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" /> Dining Menu
          </button>
          <button
            onClick={() => setActiveTab('cart')}
            className={`py-2 px-1.5 rounded-xl text-center cursor-pointer transition-all flex items-center justify-center gap-1.5 relative ${
              activeTab === 'cart'
                ? 'bg-luxury-gold-dark dark:bg-luxury-gold text-white dark:text-[#0B1F1A] font-extrabold shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-brand-text-light dark:hover:text-brand-text-dark'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Cart 
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[8px] font-sans font-bold text-white leading-none">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`py-2 px-1.5 rounded-xl text-center cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'tracking'
                ? 'bg-luxury-gold-dark dark:bg-luxury-gold text-white dark:text-[#0B1F1A] font-extrabold shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-brand-text-light dark:hover:text-brand-text-dark'
            }`}
          >
            <Clipboard className="w-3.5 h-3.5" /> Tracking
            {activeOrder && activeOrder.status !== 'completed' && activeOrder.status !== 'cancelled' && (
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            )}
          </button>
        </div>
      </div>

      <main className="max-w-md mx-auto px-4 py-6 pb-24">
        
        {/* TAB 1: MENU WRAPPER */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            
            {/* Category Horizonal Scroll Pills */}
            <div className="overflow-x-auto scrollbar-hide flex gap-1.5 py-1">
              {['Breakfast', 'Main Courses', 'Beverages', 'Snacks', 'Amenities'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4.5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all ${
                    selectedCategory === cat
                      ? 'bg-brand-text-light dark:bg-luxury-gold text-brand-surface-light dark:text-[#0B1F1A]'
                      : 'bg-brand-surface-light dark:bg-brand-surface-dark text-slate-500 dark:text-slate-400 border border-brand-border-light dark:border-brand-border-dark hover:border-luxury-gold'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu item cards listing */}
            <div className="grid grid-cols-1 gap-5">
              {filteredNavItems.length === 0 ? (
                <div className="text-center py-12 p-6 rounded-2xl bg-brand-surface-light dark:bg-brand-surface-dark border border-brand-border-light dark:border-brand-border-dark">
                  <p className="text-slate-400 text-xs">This luxury category is currently resting. Check back soon.</p>
                </div>
              ) : (
                filteredNavItems.map((item) => (
                  <div 
                    key={item.id}
                    className="group bg-brand-surface-light dark:bg-brand-surface-dark/80 rounded-2xl border border-brand-border-light dark:border-brand-border-dark shadow-sm overflow-hidden flex flex-col hover:border-luxury-gold-dark dark:hover:border-luxury-gold transition-all duration-200"
                  >
                    {/* Item visual banner */}
                    <div className="relative h-44 w-full bg-brand-bg-light overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {/* Popular badges overlay */}
                      {item.tags?.map((tag) => (
                        <span 
                          key={tag}
                          className="absolute top-3 left-3 px-2 py-0.5 rounded text-[8px] font-mono uppercase bg-[#0B1F1A]/80 text-luxury-gold border border-luxury-gold/20"
                        >
                          ⭐ {tag}
                        </span>
                      ))}

                      {/* Prep timer indicator */}
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[8px] font-mono bg-[#0B1F1A]/85 text-slate-300 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-luxury-gold" /> {selectedCategory === 'Amenities' ? '10-15 min' : '15-25 min'}
                      </span>
                    </div>

                    {/* Specifications body descriptive text */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-medium text-sm text-brand-text-light dark:text-brand-text-dark font-display leading-tight">
                            {item.name}
                          </h3>
                          <span className="font-mono text-xs font-bold text-luxury-gold-dark dark:text-luxury-gold">
                            {item.price === 0 ? "FREE" : `$${item.price.toFixed(2)}`}
                          </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Add Button */}
                      <button
                        onClick={() => addToCart(item)}
                        className="w-full py-2 px-3 rounded-lg bg-brand-text-light hover:bg-[#2c3d35] dark:bg-luxury-gold text-brand-bg-light dark:text-[#0B1F1A] font-semibold text-xs transition-all tracking-wide active:scale-[0.98] cursor-pointer"
                      >
                        Add to In-Room Request
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* TAB 2: GUEST CART OUTLAY */}
        {activeTab === 'cart' && (
          <div className="space-y-6">
            <h2 className="text-base font-bold font-display text-slate-850 dark:text-slate-100 uppercase tracking-wide">
              Your Suite Dining Basket
            </h2>

            {cart.length === 0 ? (
              <div className="text-center py-16 p-6 rounded-2xl bg-brand-surface-light dark:bg-brand-surface-dark border border-brand-border-light dark:border-brand-border-dark shadow-sm">
                <p className="text-slate-550 dark:text-slate-400 text-xs">Your room service basket is currently empty.</p>
                <button
                  onClick={() => setActiveTab('menu')}
                  className="mt-4 px-4 py-2 rounded-xl bg-luxury-gold-dark dark:bg-luxury-gold text-white dark:text-[#0B1F1A] text-xs font-bold cursor-pointer font-display transition-colors"
                >
                  Browse Luxury Menu
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* List items */}
                <div className="divide-y divide-brand-border-light dark:divide-brand-border-dark border-y border-brand-border-light dark:border-brand-border-dark">
                  {cart.map((item) => (
                    <div key={item.id} className="py-4 flex justify-between items-center gap-4">
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-brand-text-light dark:text-brand-text-dark font-display truncate">{item.name}</h4>
                        <p className="text-[10px] text-slate-550 dark:text-slate-450 mt-0.5">{item.category}</p>
                        <p className="text-[10px] text-luxury-gold-dark dark:text-luxury-gold font-mono mt-0.5 font-bold">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-brand-border-light dark:border-brand-border-dark rounded-lg bg-brand-bg-light/60 dark:bg-black/30">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="p-1 px-2.5 text-xs text-slate-550 dark:text-slate-400 hover:text-luxury-gold transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold w-6 text-center text-brand-text-light dark:text-brand-text-dark">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="p-1 px-2.5 text-xs text-slate-550 dark:text-slate-400 hover:text-luxury-gold transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-mono text-xs font-bold text-brand-text-light dark:text-brand-text-dark min-w-[50px] text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sub-total Display layout box */}
                <div className="p-4 rounded-xl bg-brand-bg-light/80 dark:bg-[#122B24]/40 border border-brand-border-light dark:border-brand-border-dark space-y-2">
                  <div className="flex justify-between text-xs text-slate-550 dark:text-slate-400">
                    <span>In-Room Standard Order Total</span>
                    <span className="font-mono">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-550 dark:text-slate-400">
                    <span>Hotel Hospitality Service Fee</span>
                    <span className="font-mono text-emerald-500 dark:text-emerald-400 font-bold uppercase text-[9px] tracking-wider">COMPLIMENTARY</span>
                  </div>
                  <div className="border-t border-brand-border-light dark:border-brand-border-dark pt-2 flex justify-between text-sm font-bold text-brand-text-light dark:text-brand-text-dark">
                    <span className="font-display">Est. Final Charge</span>
                    <span className="font-mono text-luxury-gold-dark dark:text-luxury-gold">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Form checkout */}
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 font-bold">
                      Special Culinary Requests or Dietary Restrictions
                    </label>
                    <textarea
                      placeholder="e.g. Rare steak, allergies, cutlery setup times, leave at doorstep etc."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      rows={3}
                      className="w-full p-3 font-sans text-xs rounded-xl border border-brand-border-light dark:border-brand-border-dark bg-brand-surface-light dark:bg-[#122B24]/50 focus:outline-none focus:border-luxury-gold text-brand-text-light dark:text-brand-text-dark"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 dark:text-slate-300 uppercase tracking-wide mb-1.5 font-bold">
                      Designated Account Payment Channel Selection
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {(['Room Charge', 'Cash', 'Card'] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPaymentMethod(method)}
                          className={`py-2 p-1.5 rounded-xl text-center border font-mono text-[9px] uppercase tracking-wide cursor-pointer transition-all ${
                            paymentMethod === method
                              ? 'bg-luxury-gold/10 border-luxury-gold text-luxury-gold-dark dark:text-luxury-gold font-bold'
                              : 'bg-brand-surface-light dark:bg-brand-surface-dark text-slate-500 dark:text-slate-400 border-brand-border-light dark:border-brand-border-dark'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-linear-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-dark font-bold font-display text-xs text-white dark:text-[#0B1F1A] uppercase tracking-widest rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer text-center"
                  >
                    Confirm Room Charge & Purchase (${cartTotal.toFixed(2)})
                  </button>
                </form>

              </div>
            )}

          </div>
        )}

        {/* TAB 3: ORDER TIMELINE TRACKING */}
        {activeTab === 'tracking' && (
          <div className="space-y-6">
            <h2 className="text-base font-bold font-display text-brand-text-light dark:text-brand-text-dark uppercase tracking-wide">
              Active Suite Room Deliveries
            </h2>

            {!activeOrder ? (
              <div className="text-center py-16 p-6 rounded-2xl bg-brand-surface-light dark:bg-brand-surface-dark border border-brand-border-light dark:border-brand-border-dark shadow-sm">
                <p className="text-slate-450 dark:text-slate-400 text-xs">You have no active or historical orders during this session.</p>
                <button
                  onClick={() => setActiveTab('menu')}
                  className="mt-4 px-4 py-2 rounded-xl bg-luxury-gold dark:bg-luxury-gold text-[#0B1F1A] text-xs font-bold cursor-pointer font-display"
                >
                  Order Food Now
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Active Order Outline Status details */}
                <div className="p-5 rounded-2xl bg-brand-surface-light dark:bg-brand-surface-dark border border-brand-border-light dark:border-brand-border-dark space-y-3 shadow-md">
                  <div className="flex justify-between items-center border-b border-brand-border-light dark:border-brand-border-dark pb-3">
                    <div>
                      <span className="text-[9px] font-mono text-slate-450 block font-bold uppercase">ORDER TOKEN</span>
                      <p className="text-xs font-mono font-bold text-brand-text-light dark:text-brand-text-dark">#{activeOrder.id}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-luxury-gold/15 border border-luxury-gold/30 text-[9px] font-mono text-luxury-gold-dark dark:text-luxury-gold uppercase tracking-wider font-bold">
                      {getStatusStringAndDesc(activeOrder.status).title}
                    </span>
                  </div>

                  <div className="text-xs text-brand-text-light dark:text-brand-text-dark space-y-1 font-sans">
                    <p className="font-bold text-brand-text-light dark:text-brand-text-dark">
                      Suite Room {activeOrder.roomNumber} - {activeOrder.guestName}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed italic border-l-2 border-luxury-gold pl-2 mt-1">
                      &ldquo;{activeOrder.specialRequests || "No special dietary instructions."}&rdquo;
                    </p>
                  </div>

                  {/* Order Items list summarized bubble */}
                  <div className="pt-2">
                    <span className="text-[8px] font-mono text-slate-550 dark:text-slate-400 block uppercase mb-1 font-bold">Consumables Placed</span>
                    <p className="text-[11px] text-slate-655 dark:text-slate-350">
                      {activeOrder.items?.map(it => `${it.quantity}x ${it.name}`).join(', ')}
                    </p>
                  </div>
                </div>

                {/* Timeline Process Diagram */}
                <div className="py-2 space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#B38B4D] dark:text-[#C8A86B] font-bold block">
                    SERVICE STATE OUTLINE
                  </span>

                  <div className="flex flex-col space-y-5 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-border-light dark:before:bg-brand-border-dark">
                    
                    {/* Step 1: Placed */}
                    <div className="relative">
                      <div className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 ${
                        getTimelineStep(activeOrder.status) >= 1
                          ? 'bg-emerald-500 border-brand-surface-light dark:border-brand-bg-dark'
                          : 'bg-slate-300 dark:bg-slate-800 border-slate-200'
                      }`} />
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-brand-text-light dark:text-brand-text-dark font-display">Order Placed</h4>
                        <p className="text-[10px] text-slate-450 dark:text-slate-400 mt-0.5">Your kitchen request registered instantly in operational system logs.</p>
                      </div>
                    </div>

                    {/* Step 2: Confirmed */}
                    <div className="relative">
                      <div className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 ${
                        getTimelineStep(activeOrder.status) >= 3
                          ? 'bg-emerald-500 border-brand-surface-light dark:border-brand-bg-dark'
                          : 'bg-slate-300 dark:bg-slate-800 border-slate-200'
                      }`} />
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-brand-text-light dark:text-brand-text-dark font-display">Chef Preparing</h4>
                        <p className="text-[10px] text-slate-450 dark:text-slate-400 mt-0.5">Kitchen display screens flagged preparation with digital timing sequence.</p>
                      </div>
                    </div>

                    {/* Step 3: Plated */}
                    <div className="relative">
                      <div className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 ${
                        getTimelineStep(activeOrder.status) >= 4
                          ? 'bg-emerald-500 border-brand-surface-light dark:border-brand-bg-dark'
                          : 'bg-slate-300 dark:bg-slate-800 border-slate-200'
                      }`} />
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-brand-text-light dark:text-brand-text-dark font-display">Ready & Polished</h4>
                        <p className="text-[10px] text-slate-450 dark:text-slate-400 mt-0.5">Gourmet preparation finished. Insulated trays sealed for corridor delivery.</p>
                      </div>
                    </div>

                    {/* Step 4: Out for Dispatch */}
                    <div className="relative">
                      <div className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 ${
                        getTimelineStep(activeOrder.status) >= 5
                          ? 'bg-emerald-500 border-brand-surface-light dark:border-brand-bg-dark'
                          : 'bg-slate-300 dark:bg-slate-800 border-slate-200'
                      }`} />
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-brand-text-light dark:text-brand-text-dark font-display">Descending Corridor</h4>
                        <p className="text-[10px] text-slate-450 dark:text-slate-400 mt-0.5">Assigned waiter is actively carrying goods to room entrance door.</p>
                      </div>
                    </div>

                    {/* Step 5: Completed */}
                    <div className="relative">
                      <div className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 ${
                        getTimelineStep(activeOrder.status) >= 6
                          ? 'bg-emerald-500 border-brand-surface-light dark:border-brand-bg-dark'
                          : 'bg-slate-300 dark:bg-slate-800 border-slate-200'
                      }`} />
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-brand-text-light dark:text-brand-text-dark font-display">Delivered Bon Appétit</h4>
                        <p className="text-[10px] text-slate-455 dark:text-slate-400 mt-0.5">Goods received elegantly. Thank you for using RoomServiceOS.</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Simulated live status advice notice box */}
                <div className="p-4 rounded-xl border border-brand-border-light dark:border-brand-border-dark bg-brand-surface-light dark:bg-brand-surface-dark/40 text-[11px] text-slate-550 dark:text-slate-450 font-sans leading-relaxed flex items-start gap-2.5 shadow-xs">
                  <Info className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-text-light dark:text-brand-text-dark block mb-0.5 font-display">Live Room System Advice</span>
                    {getStatusStringAndDesc(activeOrder.status).desc}
                  </div>
                </div>

              </div>
            )}

            {/* Past orders list brief tracker */}
            {guestOrders.length > 1 && (
              <div className="pt-6 border-t border-brand-border-light dark:border-brand-border-dark space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#B38B4D] dark:text-[#C8A86B] font-bold block">
                  PRIOR SESSION REQUESTS
                </span>
                <div className="space-y-2">
                  {guestOrders.map((o) => {
                    if (o.id === activeOrder?.id) return null;
                    return (
                      <div 
                        key={o.id}
                        onClick={() => setJustPlacedOrder(o)}
                        className="p-3 bg-brand-surface-light dark:bg-brand-surface-dark border border-brand-border-light dark:border-brand-border-dark rounded-xl flex justify-between items-center text-xs hover:border-luxury-gold cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="font-bold text-brand-text-light dark:text-brand-text-dark font-display">Order #{o.id}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                            {o.items?.length} Items &bull; {o.status.toUpperCase()}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* Floating Cart Indicator inside dining menu */}
      {activeTab === 'menu' && cart.length > 0 && (
         <div className="fixed bottom-6 left-0 right-0 px-4 z-40 select-none animate-bounce-slow">
           <button
             onClick={() => setActiveTab('cart')}
             className="max-w-md mx-auto w-full bg-brand-text-light hover:bg-[#2c3d35] dark:bg-luxury-gold text-brand-surface-light dark:text-[#0B1F1A] py-4 px-6 rounded-2xl flex items-center justify-between shadow-2xl font-bold text-xs font-sans tracking-wide cursor-pointer transition-all"
           >
             <span className="flex items-center gap-2">
                <ShoppingBag className="w-4.5 h-4.5 text-luxury-gold dark:text-[#0B1F1A]" />
                <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} Items Added</span>
             </span>
             <span className="flex items-center gap-1.5 font-mono">
                <span>View Cart Check</span>
                <ChevronRight className="w-4 h-4" />
             </span>
           </button>
         </div>
      )}

    </div>
  );
}
