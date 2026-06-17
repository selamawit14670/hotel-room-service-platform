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
    <div className="min-h-screen bg-slate-50 dark:bg-[#030408] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative font-sans leading-normal antialiased">
      
      {/* Dynamic Header */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-black/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-900 px-4 py-3 sm:px-6 shadow-sm select-none">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-amber-500 dark:bg-[#c5a880] text-black font-extrabold flex items-center justify-center text-sm">
              R
            </span>
            <div className="text-left">
              <h1 className="text-xs font-black tracking-widest font-display text-slate-900 dark:text-slate-50 uppercase leading-none">
                RoomServiceOS
              </h1>
              <p className="text-[9px] uppercase font-mono tracking-widest text-amber-600 dark:text-[#c5a880] mt-0.5 font-bold">
                Suite {session.roomNumber || "304"} Keys
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-neutral-900 hover:text-amber-500 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-500" />}
            </button>
            {/* Exit/Change Role */}
            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-slate-100 dark:bg-neutral-900 hover:text-rose-500 transition-colors font-mono text-[10px] uppercase flex items-center gap-1 cursor-pointer"
              title="Leave Room Channel"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Guest Greeting Banner */}
      <div className="bg-gradient-to-r from-amber-500/5 to-amber-600/5 border-b border-amber-500/10 py-3.5 px-4 select-none">
        <div className="max-w-md mx-auto text-center space-y-1">
          <p className="text-[10px] uppercase font-mono tracking-widest text-[#c5a880] font-semibold">
            ESTEEMED RECEPTION WELCOME
          </p>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Welcome back, {session.guestName || "Estee Lauder"}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            Enjoy premium bed-side gourmet. Hand-crafted, delivered with speed.
          </p>
        </div>
      </div>

      {/* Core Tabs Navigator */}
      <div className="sticky top-[57px] z-20 bg-white/95 dark:bg-black/95 border-b border-slate-200 dark:border-slate-950 py-2 shadow-xs select-none">
        <div className="max-w-md mx-auto grid grid-cols-3 px-3 gap-1.5 font-mono text-[11px] font-bold">
          <button
            onClick={() => setActiveTab('menu')}
            className={`py-2 px-1.5 rounded-xl text-center cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'menu'
                ? 'bg-amber-500 text-white dark:text-black font-extrabold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" /> Dining Menu
          </button>
          <button
            onClick={() => setActiveTab('cart')}
            className={`py-2 px-1.5 rounded-xl text-center cursor-pointer transition-all flex items-center justify-center gap-1.5 relative ${
              activeTab === 'cart'
                ? 'bg-amber-500 text-white dark:text-black font-extrabold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
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
                ? 'bg-amber-500 text-white dark:text-black font-extrabold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
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
                      ? 'bg-slate-900 dark:bg-[#c5a880] text-white dark:text-black'
                      : 'bg-white dark:bg-neutral-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-900 hover:border-slate-350'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu item cards listing */}
            <div className="grid grid-cols-1 gap-5">
              {filteredNavItems.length === 0 ? (
                <div className="text-center py-12 p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-900">
                  <p className="text-slate-400 text-xs">This luxury category is currently resting. Check back soon.</p>
                </div>
              ) : (
                filteredNavItems.map((item) => (
                  <div 
                    key={item.id}
                    className="group bg-white dark:bg-neutral-950/80 rounded-2xl border border-slate-200 dark:border-slate-900 shadow-sm overflow-hidden flex flex-col hover:border-amber-500/30 transition-all duration-200"
                  >
                    {/* Item visual banner */}
                    <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
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
                          className="absolute top-3 left-3 px-2 py-0.5 rounded text-[8px] font-mono uppercase bg-black/60 text-amber-400 border border-amber-500/20"
                        >
                          ⭐ {tag}
                        </span>
                      ))}

                      {/* Prep timer indicator */}
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[8px] font-mono bg-black/70 text-slate-300 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-amber-500" /> {selectedCategory === 'Amenities' ? '10-15 min' : '15-25 min'}
                      </span>
                    </div>

                    {/* Specifications body descriptive text */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 font-display leading-tight">
                            {item.name}
                          </h3>
                          <span className="font-mono text-xs font-black text-amber-600 dark:text-[#c5a880]">
                            {item.price === 0 ? "FREE" : `$${item.price.toFixed(2)}`}
                          </span>
                        </div>
                        <p className="text-slate-400 dark:text-slate-400 text-[11px] leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Add Button */}
                      <button
                        onClick={() => addToCart(item)}
                        className="w-full py-2 px-3 rounded-lg bg-slate-950 dark:bg-white text-white dark:text-black font-semibold text-xs transition-transform tracking-wide hover:brightness-110 active:scale-[0.98] cursor-pointer"
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
              <div className="text-center py-16 p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-950">
                <p className="text-slate-400 text-xs">Your room service basket is currently empty.</p>
                <button
                  onClick={() => setActiveTab('menu')}
                  className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-bold cursor-pointer"
                >
                  Browse Luxury Menu
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* List items */}
                <div className="divide-y divide-slate-100 dark:divide-slate-900 border-y border-slate-100 dark:border-slate-900">
                  {cart.map((item) => (
                    <div key={item.id} className="py-4 flex justify-between items-center gap-4">
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{item.name}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">{item.category}</p>
                        <p className="text-[10px] text-amber-600 dark:text-[#c5a880] font-mono mt-0.5">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-black/30">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="p-1 px-2.5 text-xs text-slate-500 hover:text-amber-500 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold w-6 text-center text-slate-700 dark:text-slate-350">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="p-1 px-2.5 text-xs text-slate-500 hover:text-amber-500 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 min-w-[50px] text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sub-total Display layout box */}
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-neutral-950 border border-slate-200/50 dark:border-slate-900 space-y-2">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>In-Room Standard Order Total</span>
                    <span className="font-mono">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Hotel Hospitality Service Fee</span>
                    <span className="font-mono text-emerald-500">FREE COMPLIMENTARY</span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex justify-between text-sm font-bold text-slate-850 dark:text-slate-100">
                    <span>Est. Final Charge</span>
                    <span className="font-mono text-amber-500">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Form checkout */}
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-1.5 font-bold">
                      Special Culinary Requests or Dietary Restrictions
                    </label>
                    <textarea
                      placeholder="e.g. Rare steak, allergies, cutlery setup times, leave at doorstep etc."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      rows={3}
                      className="w-full p-3 font-sans text-xs rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-1.5 font-bold">
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
                              ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-[#c5a880] font-bold'
                              : 'bg-white dark:bg-neutral-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-950'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 font-bold text-xs text-white dark:text-black uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer text-center"
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
            <h2 className="text-base font-bold font-display text-slate-850 dark:text-slate-100 uppercase tracking-wide">
              Active Suite Room Deliveries
            </h2>

            {!activeOrder ? (
              <div className="text-center py-16 p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-950">
                <p className="text-slate-400 text-xs">You have no active or historical orders during this session.</p>
                <button
                  onClick={() => setActiveTab('menu')}
                  className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-bold cursor-pointer font-mono"
                >
                  Order Food Now
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Active Order Outline Status details */}
                <div className="p-5 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-950 space-y-3 shadow-md">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-900 pb-3">
                    <div>
                      <span className="text-[9px] font-mono text-slate-400">ORDER TOKEN</span>
                      <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">#{activeOrder.id}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-mono text-amber-600 dark:text-[#c5a880] uppercase tracking-wider font-bold">
                      {getStatusStringAndDesc(activeOrder.status).title}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 space-y-1 font-sans">
                    <p className="font-bold text-slate-700 dark:text-slate-300">
                      Suite Room {activeOrder.roomNumber} - {activeOrder.guestName}
                    </p>
                    <p className="text-[10px] text-slate-400 leading-relaxed italic border-l-2 border-amber-500/40 pl-2 mt-1">
                      &ldquo;{activeOrder.specialRequests || "No special dietary instructions."}&rdquo;
                    </p>
                  </div>

                  {/* Order Items list summarized bubble */}
                  <div className="pt-2">
                    <span className="text-[8px] font-mono text-slate-400 block uppercase mb-1 font-bold">Consumables Placed</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {activeOrder.items?.map(it => `${it.quantity}x ${it.name}`).join(', ')}
                    </p>
                  </div>
                </div>

                {/* Timeline Process Diagram */}
                <div className="py-2 space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a880] font-bold block">
                    SERVICE STATE OUTLINE
                  </span>

                  <div className="flex flex-col space-y-5 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-900">
                    
                    {/* Step 1: Placed */}
                    <div className="relative">
                      <div className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 ${
                        getTimelineStep(activeOrder.status) >= 1
                          ? 'bg-emerald-500 border-white dark:border-[#030408]'
                          : 'bg-slate-300 dark:bg-slate-800 border-slate-200'
                      }`} />
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">Order Placed</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Your kitchen request registered instantly in operational system logs.</p>
                      </div>
                    </div>

                    {/* Step 2: Confirmed */}
                    <div className="relative">
                      <div className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 ${
                        getTimelineStep(activeOrder.status) >= 3
                          ? 'bg-emerald-500 border-white dark:border-[#030408]'
                          : 'bg-slate-300 dark:bg-slate-800 border-slate-200'
                      }`} />
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">Chef Preparing</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Kitchen display screens flagged preparation with digital timing sequence.</p>
                      </div>
                    </div>

                    {/* Step 3: Plated */}
                    <div className="relative">
                      <div className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 ${
                        getTimelineStep(activeOrder.status) >= 4
                          ? 'bg-emerald-500 border-white dark:border-[#030408]'
                          : 'bg-slate-300 dark:bg-slate-800 border-slate-200'
                      }`} />
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">Ready & Polished</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Gourmet preparation finished. Insulated trays sealed for corridor delivery.</p>
                      </div>
                    </div>

                    {/* Step 4: Out for Dispatch */}
                    <div className="relative">
                      <div className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 ${
                        getTimelineStep(activeOrder.status) >= 5
                          ? 'bg-emerald-500 border-white dark:border-[#030408]'
                          : 'bg-slate-300 dark:bg-slate-800 border-slate-200'
                      }`} />
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">Descending Corridor</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Assigned waiter is actively carrying goods to room entrance door.</p>
                      </div>
                    </div>

                    {/* Step 5: Completed */}
                    <div className="relative">
                      <div className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 ${
                        getTimelineStep(activeOrder.status) >= 6
                          ? 'bg-emerald-500 border-white dark:border-[#030408]'
                          : 'bg-slate-300 dark:bg-slate-800 border-slate-200'
                      }`} />
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">Delivered Bon Appétit</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Goods received elegantly. Thank you for using RoomServiceOS.</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Simulated live status advice notice box */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-neutral-950/40 text-[11px] text-slate-500 font-sans leading-relaxed flex items-start gap-2.5">
                  <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-200 block mb-0.5">Live Room System Advice</span>
                    {getStatusStringAndDesc(activeOrder.status).desc}
                  </div>
                </div>

              </div>
            )}

            {/* Past orders list brief tracker */}
            {guestOrders.length > 1 && (
              <div className="pt-6 border-t border-slate-200 dark:border-slate-900 space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a880] font-bold block">
                  PRIOR SESSION REQUESTS
                </span>
                <div className="space-y-2">
                  {guestOrders.map((o) => {
                    if (o.id === activeOrder?.id) return null;
                    return (
                      <div 
                        key={o.id}
                        onClick={() => setJustPlacedOrder(o)}
                        className="p-3 bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-950 rounded-xl flex justify-between items-center text-xs hover:border-amber-500/25 cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="font-bold text-slate-700 dark:text-slate-200">Order #{o.id}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
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
             className="max-w-md mx-auto w-full bg-slate-950 dark:bg-white text-white dark:text-black py-4 px-6 rounded-2xl flex items-center justify-between shadow-2xl font-bold text-xs font-sans tracking-wide cursor-pointer"
           >
             <span className="flex items-center gap-2">
                <ShoppingBag className="w-4.5 h-4.5 text-amber-500 dark:text-amber-600" />
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
