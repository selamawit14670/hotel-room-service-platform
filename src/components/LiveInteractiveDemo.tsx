import { useState, useEffect } from 'react';
import { 
  QrCode, Utensils, ChefHat, Truck, Eye, BarChart3, ArrowRight, Sparkles, 
  CheckCircle, Plus, Minus, ShoppingBag, Clock, User, Landmark, ChevronRight, 
  AlertTriangle, Play, RefreshCw, Smartphone, Monitor, Info, BellRing
} from 'lucide-react';
import { Order, OrderItem, MenuItem } from '../types';
import { MENU_ITEMS, INITIAL_ORDERS, STAFF_MEMBERS } from '../data';

export default function LiveInteractiveDemo() {
  const [activePortal, setActivePortal] = useState<'guest' | 'kitchen' | 'waiter' | 'supervisor' | 'admin'>('guest');
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [notification, setNotification] = useState<string | null>(null);
  
  // Guest Portal Menu state
  const [guestCart, setGuestCart] = useState<OrderItem[]>([]);
  const [guestNotes, setGuestNotes] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [guestRoom, setGuestRoom] = useState('Suite 412');
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState(false);
  const [newOrderId, setNewOrderId] = useState('');

  // Auto Tick Simulated timers for active orders every 3 seconds to represent passing time in the hotel
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders => 
        prevOrders.map(o => {
          if (o.status === 'preparing' || o.status === 'ready' || o.status === 'delivering') {
            const extraSeconds = 15; // Speed up time for simulation
            const updatedSeconds = o.secondsElapsed + extraSeconds;
            // Delay warning is triggered if orders are older than 25 minutes in real scale (25 mins * 60s)
            const isNowDelayed = updatedSeconds > 1500; 
            return {
              ...o,
              secondsElapsed: updatedSeconds,
              isDelayed: isNowDelayed || o.isDelayed
            };
          }
          return o;
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Trigger soundless clean visual notification popups
  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // 1. Guest operations
  const handleAddToCart = (item: MenuItem) => {
    setGuestCart(current => {
      const existing = current.find(i => i.id === item.id);
      if (existing) {
        return current.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...current, { id: item.id, name: item.name, price: item.price, quantity: 1, category: item.category }];
    });
    triggerNotification(`Added ${item.name} to Guest order cart.`);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setGuestCart(current => 
      current.map(i => {
        if (i.id === id) {
          const newQty = i.quantity + delta;
          return { ...i, quantity: Math.max(1, newQty) };
        }
        return i;
      }).filter(i => i.quantity > 0)
    );
  };

  const currentCartTotal = guestCart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    if (guestCart.length === 0) return;
    
    const randomIdNum = Math.floor(100 + Math.random() * 899);
    const generatedId = `ORD-${randomIdNum}`;
    
    const newOrder: Order = {
      id: generatedId,
      roomNumber: guestRoom,
      guestName: guestRoom.includes('Suite') ? "Honorable Guest" : "B2B Explorer",
      items: [...guestCart],
      specialRequests: guestNotes,
      status: 'pending',
      timestamp: new Date(),
      secondsElapsed: 0,
      isDelayed: false
    };

    setOrders(prev => [newOrder, ...prev]);
    setNewOrderId(generatedId);
    setOrderPlacedSuccess(true);
    setGuestCart([]);
    setGuestNotes('');
    
    triggerNotification(`✨ Unified State Synchronized: ${generatedId} sent to Kitchen and Administrator dashboards instantly!`);
  };

  const handleResetGuestPortal = () => {
    setOrderPlacedSuccess(false);
    setNewOrderId('');
  };

  // 2. Kitchen operations
  const handleKitchenStatusUpdate = (orderId: string, nextStatus: 'preparing' | 'ready') => {
    setOrders(current => 
      current.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            status: nextStatus,
            chefName: nextStatus === 'preparing' ? 'Chef Thomas Keller' : o.chefName,
            prepStartedAt: nextStatus === 'preparing' ? new Date() : o.prepStartedAt,
            readyAt: nextStatus === 'ready' ? new Date() : o.readyAt
          };
        }
        return o;
      })
    );
    
    const statusText = nextStatus === 'preparing' ? "Chef started preparing order" : "Order marked ready for delivery";
    triggerNotification(`🍳 Kitchen Action: Order ${orderId} status changed to [${nextStatus.toUpperCase()}]. Waiter Companion notified.`);
  };

  // 3. Waiter operations
  const handleWaiterStatusUpdate = (orderId: string, nextStatus: 'delivering' | 'completed') => {
    setOrders(current => 
      current.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            status: nextStatus,
            waiterName: 'Courier Sofia Lin',
            completedAt: nextStatus === 'completed' ? new Date() : o.completedAt
          };
        }
        return o;
      })
    );

    const statusMsg = nextStatus === 'delivering' ? "Courier claimed order" : "Courier confirmed room delivery";
    triggerNotification(`🕴️ Courier Action: Order ${orderId} marked [${nextStatus.toUpperCase()}]. Guest and Supervisor portals updated.`);
  };

  // 4. Admin restart simulation
  const handleResetDemo = () => {
    setOrders(INITIAL_ORDERS);
    setOrderPlacedSuccess(false);
    setGuestCart([]);
    setGuestNotes('');
    triggerNotification('🔄 Live simulator reset to initial default baseline hotel orders.');
  };

  // Calculate live Admin KPIs
  const completedOrders = orders.filter(o => o.status === 'completed');
  const totalSimulatedRevenue = orders.reduce((sum, o) => {
    if (o.status === 'completed' || o.status === 'delivering' || o.status === 'ready' || o.status === 'preparing') {
      const orderVal = o.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      return sum + orderVal;
    }
    return sum;
  }, 1450.00); // base initial high revenue
  
  const activePreparingCount = orders.filter(o => o.status === 'preparing').length;
  const activeReadyCount = orders.filter(o => o.status === 'ready').length;
  const delayedAlertsCount = orders.filter(o => o.isDelayed && o.status !== 'completed').length;

  const orderFormCategories = ['All', 'Main Courses', 'Artisanal Beverages', 'Delectable Desserts'];
  const filteredMenuItems = selectedCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <section className="relative py-12 md:py-24 bg-black border-y border-slate-900 overflow-hidden" id="interactive-platform">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-slate-950/40 rounded-full blur-3xl saturate-150 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-950/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-mono text-luxury-gold bg-luxury-gold/10 border border-luxury-gold/20 mb-3">
            <Sparkles className="w-4.5 h-4.5" /> Hands-On Platform Tour
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-slate-100 tracking-tight">
            One Connected Platform.<br/>Five Operational Portals.
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base">
            Click through our active live preview. Place a guest order and observe how information propagates in real time across the entire kitchen, delivery, supervisor, and management endpoints without manual messaging.
          </p>
        </div>

        {/* Live Notification Indicator */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border border-luxury-gold/30 bg-slate-950 shadow-xl shadow-black max-w-md animate-slide-in">
            <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 animate-ping absolute -top-1 -left-1"></div>
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center text-luxury-gold">
              <BellRing className="w-4 h-4" />
            </div>
            <p className="text-xs text-slate-200 font-mono leading-relaxed">{notification}</p>
          </div>
        )}

        {/* Sync Indicator bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-2.5 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-neutral-950/40 text-xs text-slate-600 dark:text-slate-400 font-mono transition-colors">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>SYSTEM AUDIT: 5 Portals Interconnected</span>
          </div>
          <div className="flex items-center gap-4">
            <span>⏱️ Active Delay Warning Trigger: <b className="text-red-500 dark:text-red-400">&gt;25 min automatic</b></span>
            <button 
              onClick={handleResetDemo}
              className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800 hover:border-luxury-gold transition-colors bg-white dark:bg-black flex items-center gap-1.5 text-[10px] text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Reset Simulator State
            </button>
          </div>
        </div>

        {/* Portal Switcher Grid Tabs */}
        <div className="grid grid-cols-5 md:grid-cols-5 gap-1.5 md:gap-3 mb-6 p-1.5 rounded-2xl bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-slate-900 transition-colors">
          {[
            { id: 'guest', label: '1. Guest Room QR', icon: QrCode, desc: 'Place Order' },
            { id: 'kitchen', label: '2. Kitchen KDS', icon: ChefHat, desc: 'Prepare Food' },
            { id: 'waiter', label: '3. Courier Apps', icon: Truck, desc: 'Deliver Orders' },
            { id: 'supervisor', label: '4. Supervisor Desk', icon: Eye, desc: 'Control Panel' },
            { id: 'admin', label: '5. Management Hub', icon: BarChart3, desc: 'Revenue KPIs' }
          ].map((portal) => {
            const Icon = portal.icon;
            const isActive = activePortal === portal.id;
            return (
              <button
                key={portal.id}
                onClick={() => setActivePortal(portal.id as any)}
                className={`flex flex-col items-center justify-center p-2.5 md:p-4 rounded-xl transition-all cursor-pointer relative ${
                  isActive 
                    ? 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-luxury-gold/40 text-luxury-gold shadow-lg shadow-slate-200/50 dark:shadow-black/60' 
                    : 'bg-transparent text-slate-500 dark:text-slate-400 border border-transparent hover:bg-slate-200/50 dark:hover:bg-white/5'
                }`}
                id={`demo-tab-${portal.id}`}
              >
                {isActive && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-luxury-gold rounded-full"></span>
                )}
                <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? 'text-luxury-gold' : 'text-slate-400'}`} />
                <span className="mt-1.5 hidden sm:block font-display text-xs font-bold leading-none">{portal.label}</span>
                <span className="mt-1 font-mono text-[9px] text-slate-500 hidden sm:block leading-none">{portal.desc}</span>
              </button>
            );
          })}
        </div>

        {/* Central Dashboard Frame */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-neutral-950 overflow-hidden shadow-2xl shadow-indigo-950/5 dark:shadow-indigo-950/10 transition-colors">
          
          {/* Mock Browser/Device Header */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-[#090b11] border-b border-slate-200 dark:border-slate-900 flex items-center justify-between transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span className="ml-4 px-3 py-1 bg-white dark:bg-black/50 border border-slate-200 dark:border-slate-800 rounded-md text-[11px] font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                {activePortal === 'guest' && <Smartphone className="w-3.5 h-3.5 text-luxury-gold" />}
                {activePortal !== 'guest' && <Monitor className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />}
                https://demo.roomserviceos.com/hotel/{activePortal === 'guest' ? 'suite-412' : activePortal}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest hidden sm:inline">Active Session ID:</span>
              <span className="px-2 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-luxury-gold">RSS-901</span>
            </div>
          </div>

          {/* Device Mockup Content Area */}
          <div className="p-4 md:p-8 min-h-[500px] bg-[#05060a]">
            
            {/* 1. GUEST PORTAL SIMULATION */}
            {activePortal === 'guest' && (
              <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 animate-scale-up" id="demo-guest-portal">
                
                {/* Guest QR Info Block */}
                <div className="lg:col-span-4 rounded-2xl bg-neutral-950 border border-slate-900 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-lg bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
                        <QrCode className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-300">Room QR Session</span>
                    </div>

                    <div className="mb-4">
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Select Room Number</label>
                      <select 
                        value={guestRoom} 
                        onChange={(e) => setGuestRoom(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-luxury-gold"
                      >
                        <option value="Suite 412">Suite 412 (Premium)</option>
                        <option value="Room 105">Room 105 (Superior)</option>
                        <option value="Penthouse 801">Penthouse 801 (VIP Presidential)</option>
                        <option value="Villa 2">Villa 2 (Waterfront)</option>
                      </select>
                    </div>

                    <div className="p-3 bg-black/60 border border-slate-800 rounded-xl text-xs text-slate-400 space-y-2">
                      <p className="font-sans leading-relaxed">
                        👉 <b>Interactive Guide:</b> Add premium items to your cart, specify cooking requests (e.g. <i>"Medium rare ribeye"</i>), and click <b>"Confirm Charge to Room"</b>.
                      </p>
                      <p className="font-sans leading-relaxed">
                        Observe how the order is placed without hotel staff intervention.
                      </p>
                    </div>
                  </div>

                  {/* Quick Tracker Inside Guest Portal */}
                  <div className="mt-6 border-t border-slate-900 pt-4">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block mb-2">My Live Order Status Feed</span>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {orders.filter(o => o.roomNumber === guestRoom).length === 0 ? (
                        <p className="text-[10px] font-mono text-slate-600 italic">No in-room orders placed yet.</p>
                      ) : (
                        orders.filter(o => o.roomNumber === guestRoom).map(o => (
                          <div key={o.id} className="p-2 rounded-lg bg-slate-950 border border-slate-900 flex justify-between items-center">
                            <div>
                              <span className="text-[10px] font-mono font-bold text-slate-300 block">{o.id}</span>
                              <span className="text-[9px] font-sans text-slate-500">
                                {o.items.length} dishes • {o.secondsElapsed}s elapsed
                              </span>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider ${
                              o.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                              o.status === 'preparing' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                              o.status === 'ready' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                              o.status === 'delivering' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                              'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            }`}>
                              {o.status}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Digital Menu Panel */}
                <div className="lg:col-span-8 flex flex-col justify-between">
                  
                  {!orderPlacedSuccess ? (
                    <div>
                      {/* Menu Category Pills */}
                      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none">
                        {orderFormCategories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                              selectedCategory === cat 
                                ? 'bg-luxury-gold text-black' 
                                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* Menu Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-1">
                        {filteredMenuItems.map(item => (
                          <div key={item.id} className="p-3.5 rounded-xl bg-[#0b0e15] border border-slate-900 hover:border-slate-800 transition-luxury flex gap-3 h-28">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-20 h-full object-cover rounded-lg flex-shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex flex-col justify-between flex-grow min-w-0">
                              <div>
                                <h4 className="text-xs font-bold text-slate-100 truncate">{item.name}</h4>
                                <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">{item.description}</p>
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs font-mono font-bold text-luxury-gold">${item.price.toFixed(2)}</span>
                                <button
                                  onClick={() => handleAddToCart(item)}
                                  className="p-1 px-2.5 bg-slate-900 hover:bg-luxury-gold hover:text-black rounded-lg text-[10px] font-bold transition-all text-slate-300 flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" /> Add
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Cart Drawer */}
                      <div className="mt-4 p-4 rounded-xl border border-slate-900 bg-neutral-950/80">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                            <ShoppingBag className="w-4 h-4 text-luxury-gold" /> Active Cart ({guestCart.reduce((a, b) => a + b.quantity, 0)} items)
                          </span>
                          <span className="text-xs font-mono font-semibold text-slate-100">Total: ${currentCartTotal.toFixed(2)}</span>
                        </div>

                        {guestCart.length === 0 ? (
                          <p className="text-xs text-slate-500 italic py-2">Select luxury items from the menu above to assemble your order.</p>
                        ) : (
                          <div className="space-y-2">
                            <div className="max-h-24 overflow-y-auto space-y-1.5 pr-1">
                              {guestCart.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-xs p-1 px-2 bg-black/40 rounded-lg">
                                  <span className="text-slate-200 truncate max-w-[200px]">{item.name} <b className="text-luxury-gold font-mono">x{item.quantity}</b></span>
                                  <div className="flex items-center gap-1.5">
                                    <button 
                                      onClick={() => handleUpdateCartQuantity(item.id, -1)}
                                      className="p-0.5 bg-slate-900 hover:bg-slate-800 rounded text-slate-400"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <button 
                                      onClick={() => handleUpdateCartQuantity(item.id, 1)}
                                      className="p-0.5 bg-slate-900 hover:bg-slate-800 rounded text-slate-400"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                    <span className="w-12 text-right font-mono text-slate-200">${(item.price * item.quantity).toFixed(2)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="pt-2 grid grid-cols-1 md:grid-cols-12 gap-2">
                              {/* Special request text input */}
                              <input 
                                type="text"
                                placeholder="Dietary adjustments or custom preparation instructions..."
                                value={guestNotes}
                                onChange={(e) => setGuestNotes(e.target.value)}
                                className="md:col-span-8 px-3 py-1.5 bg-black border border-slate-800 rounded-lg text-xs placeholder:text-slate-600 focus:outline-none focus:border-luxury-gold text-slate-300"
                              />
                              <button
                                onClick={handlePlaceOrder}
                                className="md:col-span-4 py-2 bg-luxury-gold hover:bg-luxury-gold/90 text-black font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                                id="btn-guest-order-submit"
                              >
                                Place Order (Room-Charge) <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-neutral-950 rounded-2xl border border-slate-900 p-6 flex flex-col items-center justify-center h-full">
                      <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mb-3 animate-pulse">
                        <CheckCircle className="w-7 h-7" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-100">Order Placed & Syncing Globally</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm font-sans">
                        Order <span className="text-luxury-gold font-mono">{newOrderId}</span> has been dispatched to KDS terminal near Chef Keller. Your device displays live preparation updates instantly.
                      </p>
                      
                      <div className="my-5 p-3 rounded-xl bg-black/50 border border-slate-900 text-left w-full max-w-xs space-y-1">
                        <div className="flex justify-between text-[11px] font-mono"><span className="text-slate-500">ROOM:</span> <span className="text-slate-200 font-bold">{guestRoom}</span></div>
                        <div className="flex justify-between text-[11px] font-mono"><span className="text-slate-500">DESTINATION:</span> <span className="text-slate-200">Main Kitchen Terminal</span></div>
                        <div className="flex justify-between text-[11px] font-mono"><span className="text-slate-500">PAYMENT:</span> <span className="text-slate-200">Room Verification Confirmed</span></div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setActivePortal('kitchen');
                            triggerNotification('Kitchen display was highlighted. Watch how chefs interact with your mock order!');
                          }}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold rounded-lg text-slate-100 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          Step 2: Go to Kitchen KDS <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleResetGuestPortal}
                          className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-xs font-semibold rounded-lg text-slate-400 transition-colors cursor-pointer"
                        >
                          Review Digital Menu
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}


            {/* 2. KITCHEN DISPLAY SYSTEM (KDS) */}
            {activePortal === 'kitchen' && (
              <div className="animate-scale-up" id="demo-kitchen-portal">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                      <ChefHat className="w-5 h-5 text-indigo-400" /> Executive Kitchen Monitor
                    </h3>
                    <p className="text-[11px] text-slate-400">Color-coded columns track real-time preparation timers. Orders older than 25 minutes automatically flag as late or delayed.</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-mono">
                      Preparing: {activePreparingCount}
                    </span>
                    <span className="px-2 py-1 rounded-md bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30 text-[10px] font-mono flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 animate-pulse" /> Overdue Delays: {delayedAlertsCount}
                    </span>
                  </div>
                </div>

                {orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length === 0 ? (
                  <div className="py-12 text-center rounded-2xl border border-dashed border-slate-800 bg-neutral-950">
                    <CheckCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-400 italic">Excellent work! No orders currently waiting in the Kitchen Display monitor.</p>
                    <button 
                      onClick={() => setActivePortal('guest')}
                      className="mt-3 px-3 py-1.5 bg-luxury-gold text-black rounded-lg text-[10px] font-bold cursor-pointer"
                    >
                      + Place a Test Order as Guest
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* COL 1: QUEUED / PENDING */}
                    <div className="bg-[#090b11] rounded-xl border border-slate-900 p-3">
                      <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider block mb-2 border-b border-slate-900 pb-1.5">
                        Queued Inbox ({orders.filter(o => o.status === 'pending').length})
                      </span>
                      <div className="space-y-3 max-h-[380px] overflow-y-auto">
                        {orders.filter(o => o.status === 'pending').length === 0 ? (
                          <p className="text-[10px] text-slate-600 italic py-4 text-center">No incoming orders in cue.</p>
                        ) : (
                          orders.filter(o => o.status === 'pending').map(o => (
                            <div key={o.id} className="p-3 rounded-lg bg-black border border-slate-800 hover:border-slate-700 transition-colors shadow-sm">
                              <div className="flex justify-between items-start mb-1.5">
                                <div>
                                  <span className="text-xs font-mono font-bold text-indigo-400">{o.id}</span>
                                  <span className="block text-[11px] font-bold text-slate-200 mt-0.5">{o.roomNumber}</span>
                                </div>
                                <span className="px-1.5 py-0.5 bg-neutral-900 rounded text-[9px] font-mono text-slate-400">0 min</span>
                              </div>
                              
                              <div className="space-y-1 mb-2">
                                {o.items.map((it, idx) => (
                                  <div key={idx} className="text-[10px] text-slate-300 flex justify-between">
                                    <span>{it.name}</span>
                                    <span className="font-mono text-slate-400">x{it.quantity}</span>
                                  </div>
                                ))}
                                {o.specialRequests && (
                                  <div className="p-1 px-2 mt-1 rounded bg-orange-950/25 border border-orange-900/40 text-[9px] text-orange-400 font-sans italic">
                                    &ldquo;{o.specialRequests}&rdquo;
                                  </div>
                                )}
                              </div>

                              <button
                                onClick={() => handleKitchenStatusUpdate(o.id, 'preparing')}
                                className="w-full py-1 bg-indigo-600 hover:bg-indigo-500 text-slate-100 text-[10px] font-semibold rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <Play className="w-3 h-3 fill-current" /> Claim & Start Prep
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* COL 2: PREPARING (Cooking status) */}
                    <div className="bg-[#090b11] rounded-xl border border-slate-900 p-3">
                      <span className="text-[10px] uppercase font-mono text-amber-500 tracking-wider block mb-2 border-b border-amber-900/20 pb-1.5">
                        Active Preparation ({orders.filter(o => o.status === 'preparing').length})
                      </span>
                      <div className="space-y-3 max-h-[380px] overflow-y-auto">
                        {orders.filter(o => o.status === 'preparing').length === 0 ? (
                          <p className="text-[10px] text-slate-600 italic py-4 text-center">No dishes currently on burners.</p>
                        ) : (
                          orders.filter(o => o.status === 'preparing').map(o => {
                            const minutes = Math.floor(o.secondsElapsed / 60);
                            return (
                              <div 
                                key={o.id} 
                                className={`p-3 rounded-lg bg-black border ${
                                  o.isDelayed 
                                    ? 'border-red-950/80 bg-red-950/5 shadow-md shadow-red-950/10' 
                                    : 'border-slate-800'
                                } hover:border-slate-700 transition-colors`}
                              >
                                <div className="flex justify-between items-start mb-1.5">
                                  <div>
                                    <span className="text-xs font-mono font-bold text-amber-400">{o.id}</span>
                                    <span className="block text-[11px] font-bold text-slate-200 mt-0.5">{o.roomNumber}</span>
                                  </div>
                                  <div className="text-right">
                                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono leading-none ${
                                      o.isDelayed ? 'bg-[#EF4444]/20 text-[#EF4444] font-bold animate-pulse' : 'bg-slate-900 text-slate-400'
                                    }`}>
                                      {minutes} min elapsed
                                    </span>
                                    {o.isDelayed && (
                                      <span className="block text-[8px] font-bold uppercase text-red-400 font-mono mt-0.5">⚠️ DELAY ALERT</span>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="space-y-1 mb-2.5">
                                  {o.items.map((it, idx) => (
                                    <div key={idx} className="text-[10px] text-slate-300 flex justify-between">
                                      <span>{it.name}</span>
                                      <span className="font-mono text-slate-400">x{it.quantity}</span>
                                    </div>
                                  ))}
                                  {o.specialRequests && (
                                    <div className="p-1 px-2 mt-1 rounded bg-black/50 border border-slate-900 text-[9px] text-slate-400 font-sans italic">
                                      {o.specialRequests}
                                    </div>
                                  )}
                                </div>

                                <div className="text-[9px] font-mono text-slate-500 mb-2 flex items-center gap-1">
                                  <span>🧑‍🍳 Designated:</span>
                                  <span className="text-slate-300">{o.chefName || 'Sous Chef'}</span>
                                </div>

                                <button
                                  onClick={() => handleKitchenStatusUpdate(o.id, 'ready')}
                                  className="w-full py-1 bg-emerald-600 hover:bg-emerald-500 text-slate-100 text-[10px] font-semibold rounded-md transition-colors cursor-pointer"
                                >
                                  Ready & Page Waiters
                                </button>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* COL 3: WAITING FOR PICKUP */}
                    <div className="bg-[#090b11] rounded-xl border border-slate-900 p-3">
                      <span className="text-[10px] uppercase font-mono text-emerald-400 tracking-wider block mb-2 border-b border-emerald-900/20 pb-1.5">
                        Food Ready for Couriers ({orders.filter(o => o.status === 'ready').length})
                      </span>
                      <div className="space-y-3 max-h-[380px] overflow-y-auto">
                        {orders.filter(o => o.status === 'ready').length === 0 ? (
                          <p className="text-[10px] text-slate-600 italic py-4 text-center">No completed orders on tray shelf.</p>
                        ) : (
                          orders.filter(o => o.status === 'ready').map(o => (
                            <div key={o.id} className="p-3 rounded-lg bg-neutral-900/60 border border-emerald-900/20 shadow-sm relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-2 h-2 rounded-bl bg-emerald-500"></div>
                              <div className="flex justify-between items-start mb-1.5">
                                <div>
                                  <span className="text-xs font-mono font-bold text-emerald-400">{o.id}</span>
                                  <span className="block text-[11px] font-bold text-slate-200 mt-0.5">{o.roomNumber}</span>
                                </div>
                                <span className="px-1.5 py-0.5 bg-black/40 rounded text-[9px] font-mono text-slate-400">Ready</span>
                              </div>
                              
                              <div className="space-y-1 mb-2">
                                {o.items.map((it, idx) => (
                                  <div key={idx} className="text-[10px] text-slate-300 flex justify-between">
                                    <span>{it.name}</span>
                                    <span className="font-mono text-slate-400">x{it.quantity}</span>
                                  </div>
                                ))}
                              </div>

                              <button
                                onClick={() => {
                                  setActivePortal('waiter');
                                  triggerNotification(`Opened Dispatch courier dashboard to fulfill the waiting orders.`);
                                }}
                                className="w-full py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[10px] font-semibold rounded-md transition-colors cursor-pointer"
                              >
                                View Courier Pickup App
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            )}


            {/* 3. COURIER / WAITER DISPATCH APP */}
            {activePortal === 'waiter' && (
              <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 animate-scale-up" id="demo-waiter-portal">
                
                {/* Waiter Stats Column */}
                <div className="md:col-span-5 rounded-2xl bg-[#090b11] border border-slate-950 p-5 space-y-4">
                  <div>
                    <h3 className="text-xs uppercase font-mono tracking-widest text-slate-500 mb-1">Staff Dispatch Screen</h3>
                    <h4 className="text-lg font-bold text-slate-100 flex items-center gap-1.5"><Truck className="w-5 h-5 text-indigo-400" /> Courier Feed</h4>
                  </div>

                  <div className="p-3 bg-black/50 border border-slate-900 rounded-xl space-y-1 text-xs">
                    <p className="text-slate-400"><b>Role Profile:</b> Courier Sofia Lin</p>
                    <p className="text-slate-400"><b>Availability:</b> Active & Connected</p>
                    <p className="text-slate-400"><b>Active Runs:</b> {orders.filter(o => o.status === 'delivering').length}</p>
                  </div>

                  <div className="p-3 bg-neutral-900/60 border border-slate-900 rounded-xl text-xs space-y-2 text-slate-400">
                    <p className="text-slate-300 font-bold">💡 How it Integrates:</p>
                    <p className="leading-relaxed">Waiters receive instant sensory prompts inside corridors when chefs push dishes onto pickup racks. No more running kitchen stairs simply to check preparation plates.</p>
                  </div>
                </div>

                {/* Waiter Task Queue */}
                <div className="md:col-span-7 space-y-4">
                  <span className="text-xs font-mono font-bold text-slate-400 block border-b border-slate-900 pb-2">Active Task Companion (Claim & Deliver)</span>
                  
                  {orders.filter(o => o.status === 'ready' || o.status === 'delivering').length === 0 ? (
                    <div className="py-12 text-center rounded-2xl border border-dashed border-slate-950 bg-black/40">
                      <CheckCircle className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                      <p className="text-xs text-slate-500 font-sans italic">No orders currently ready or out for delivery.</p>
                      <button 
                        onClick={() => setActivePortal('guest')}
                        className="mt-3 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        + Create a guest request
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      
                      {/* Active deliveries first, then ready items to pick up */}
                      {orders.filter(o => o.status === 'ready' || o.status === 'delivering').map(o => (
                        <div key={o.id} className={`p-4 rounded-xl bg-[#0b0f19] border ${
                          o.status === 'delivering' ? 'border-sky-500/35 bg-sky-950/5' : 'border-slate-900'
                        } transition-luxury`}>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-slate-900 text-slate-300 font-semibold mb-1">
                                {o.status === 'ready' ? '🍽️ Ready on Shelf' : '🚚 Out for Delivery'}
                              </span>
                              <h5 className="text-xs font-bold text-slate-200">{o.roomNumber} &bull; {o.id}</h5>
                            </div>
                            <span className="text-xs font-mono font-semibold text-slate-400">
                              {o.items.length} items &bull; ${o.items.reduce((acc, i) => acc + (i.price * i.quantity), 0).toFixed(2)}
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-400 mb-3 ml-2 list-disc font-sans pl-1 border-l border-slate-800">
                            {o.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between py-0.5">
                                <span>{it.name}</span>
                                <span className="font-mono text-slate-500">x{it.quantity}</span>
                              </div>
                            ))}
                          </div>

                          {o.status === 'ready' ? (
                            <button
                              onClick={() => handleWaiterStatusUpdate(o.id, 'delivering')}
                              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-slate-100 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                            >
                              Dispatch Order to {o.roomNumber}
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                handleWaiterStatusUpdate(o.id, 'completed');
                                triggerNotification(`Order ${o.id} successfully completed! Revenue ledger recalculated instantly.`);
                              }}
                              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-100 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                            >
                              Confirm Room Delivery (Bon Appétit!)
                            </button>
                          )}
                        </div>
                      ))}

                    </div>
                  )}

                </div>
              </div>
            )}


            {/* 4. SUPERVISOR CONTROL MONITOR */}
            {activePortal === 'supervisor' && (
              <div className="animate-scale-up" id="demo-supervisor-portal">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Active Delays Warning panel */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Active Live Alerts</span>
                      <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-[9px] font-bold border border-red-500/20 uppercase tracking-widest animate-pulse">Live</span>
                    </div>

                    <div className="space-y-3">
                      {orders.filter(o => o.status !== 'completed').map(o => {
                        const isLate = o.secondsElapsed > 1200; // delay trigger mock
                        return (
                          <div key={o.id} className={`p-3.5 rounded-xl bg-black border ${
                            isLate ? 'border-red-900/60 bg-red-950/10' : 'border-slate-900'
                          } flex items-center justify-between`}>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-slate-200">{o.id}</span>
                                <span className="text-[10px] font-semibold text-slate-400">{o.roomNumber}</span>
                                {isLate && (
                                  <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 text-[8px] font-bold uppercase font-mono tracking-wider animate-pulse">Overdue alert</span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-500">
                                Status: <b className="text-slate-300 font-mono capitalize">{o.status}</b> &bull; {Math.floor(o.secondsElapsed / 60)}m active
                              </p>
                            </div>

                            <button
                              onClick={() => triggerNotification(`📢 Supervisor Julian nudged ${o.chefName || 'Chef Thomas'} about matching ${o.id} items!`)}
                              className="px-2.5 py-1 rounded bg-[#0b0f1a] hover:bg-indigo-600 hover:text-white transition-colors border border-slate-850 text-[10px] font-bold text-slate-300 cursor-pointer"
                            >
                              Nudge Kitchen
                            </button>
                          </div>
                        );
                      })}

                      {orders.filter(o => o.status !== 'completed').length === 0 && (
                        <p className="text-xs text-slate-600 italic py-6 text-center">No active rooms in sequence. Perfect compliance achieved!</p>
                      )}
                    </div>
                  </div>

                  {/* Operational Telemetry column */}
                  <div className="md:col-span-5 rounded-2xl bg-[#090b11] border border-slate-900 p-5 space-y-4">
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Property Oversight Analytics</h4>
                    
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 bg-black border border-slate-900 rounded-xl">
                        <span className="text-[10px] text-slate-500 font-mono uppercase block">Active Staff</span>
                        <span className="text-xl font-bold font-display text-slate-100">5/5 Members</span>
                      </div>
                      <div className="p-3 bg-black border border-slate-900 rounded-xl">
                        <span className="text-[10px] text-slate-500 font-mono uppercase block">Avg Turnaround</span>
                        <span className="text-xl font-bold font-display text-luxury-gold">18.5 Min</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-black border border-slate-900 space-y-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Active Staff Members</span>
                      <div className="space-y-1.5 max-h-44 overflow-y-auto">
                        {STAFF_MEMBERS.map(sm => (
                          <div key={sm.id} className="flex justify-between items-center text-xs">
                            <span className="text-slate-300">{sm.avatar} {sm.name}</span>
                            <span className="px-1.5 py-0.5 rounded-sm bg-neutral-900 border border-slate-850 text-[9px] font-mono text-emerald-400">Active</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}


            {/* 5. ADMIN ANALYTICS DASHBOARD */}
            {activePortal === 'admin' && (
              <div className="animate-scale-up" id="demo-admin-portal">
                
                {/* Visual Chart Header & KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-neutral-950 border border-slate-900 rounded-xl relative overflow-hidden">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Today&apos;s Room Revenue</span>
                    <span className="text-2xl font-bold font-display text-emerald-500">${totalSimulatedRevenue.toFixed(2)}</span>
                    <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded ml-2 font-mono">+37.5% vs baseline</span>
                  </div>
                  <div className="p-4 bg-neutral-950 border border-slate-900 rounded-xl">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Total Dispatched Items</span>
                    <span className="text-2xl font-bold font-display text-slate-100">{orders.length} order tickets</span>
                    <span className="text-[9px] text-[#EF4444] bg-[#EF4444]/10 px-1.5 py-0.5 rounded ml-2 font-mono">0 mistakes recorded</span>
                  </div>
                  <div className="p-4 bg-neutral-950 border border-slate-900 rounded-xl">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Guest Satisfaction Core</span>
                    <span className="text-2xl font-bold font-display text-luxury-gold">4.92 / 5.00</span>
                    <span className="text-[9px] text-slate-500 px-1 rounded block">Based on automatic checkout reviews</span>
                  </div>
                </div>

                {/* Simulated Custom SVG interactive Chart */}
                <div className="p-5 rounded-2xl bg-neutral-950 border border-slate-900">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">In-Room Sales Surge Velocity (Hourly Scale)</span>
                    <span className="text-[10px] text-indigo-400 font-mono">Continuous Stream &bull; Live Updates</span>
                  </div>

                  <div className="h-44 flex items-end justify-between gap-2 pt-6 border-b border-l border-slate-800 relative">
                    
                    {/* Y-Axis Label guides */}
                    <span className="absolute left-2 top-2 text-[9px] font-mono text-slate-600">$500</span>
                    <span className="absolute left-2 top-20 text-[9px] font-mono text-slate-600">$250</span>

                    {/* Chart Bars - simulated hourly with highlights */}
                    {[
                      { hr: "08:00", val: 120, color: "bg-slate-800" },
                      { hr: "10:00", val: 190, color: "bg-slate-800" },
                      { hr: "12:00", val: 280, color: "bg-indigo-650" },
                      { hr: "14:00", val: 150, color: "bg-slate-800" },
                      { hr: "16:00", val: 220, color: "bg-slate-800" },
                      { hr: "18:00", val: 410, color: "bg-luxury-gold-dark" },
                      { hr: "20:00", val: 560, color: "bg-luxury-gold" }, // Peak dining hour!
                      { hr: "22:00", val: 320, color: "bg-indigo-650" },
                      { hr: "00:00", val: 180, color: "bg-slate-800" }
                    ].map((bar, i) => (
                      <div key={i} className="flex flex-col items-center flex-grow group relative cursor-help">
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-1 bg-black border border-slate-800 px-2 py-0.5 rounded text-[8px] font-mono text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                          Sales: ${bar.val}
                        </div>
                        <div 
                          className={`w-full max-w-[28px] rounded-t transition-all ${bar.color}`}
                          style={{ height: `${(bar.val / 600) * 100}%` }}
                        ></div>
                        <span className="text-[9px] font-mono text-slate-500 mt-2">{bar.hr}</span>
                      </div>
                    ))}

                  </div>
                </div>

                {/* Interactive Settings Simulation Box */}
                <div className="mt-4 p-4 rounded-xl border border-slate-900 bg-neutral-950/40 text-xs text-slate-400 flex flex-wrap gap-4 items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-300">⚙️ Live Operational Sandbox:</span>
                    <span className="ml-1">Add items globally in the Guest Room QR portal to see this simulated board scale live.</span>
                  </div>
                  <button 
                    onClick={handleResetDemo}
                    className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 hover:border-luxury-gold transition-luxury cursor-pointer text-[10px] font-mono font-bold"
                  >
                    Recalibrate Revenue Metrics
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
