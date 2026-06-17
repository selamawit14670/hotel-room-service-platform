import React, { useState } from 'react';
import { 
  BellRing, Navigation, CheckCircle2, Award, Landmark, MapPin, 
  Moon, Sun, LogOut, Check, ArrowRight, Clock, Star, Users 
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface WaiterPortalProps {
  session: {
    username?: string;
    waiterId?: string;
  };
  orders: Order[];
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onLogout: () => void;
  onUpdateStatus: (orderId: string, status: OrderStatus, extra?: any) => void;
}

export default function WaiterPortal({
  session,
  orders,
  theme,
  onToggleTheme,
  onLogout,
  onUpdateStatus
}: WaiterPortalProps) {
  const [activeTab, setActiveTab] = useState<'ready' | 'active' | 'history'>('ready');

  // Hardcoded or dynamic name of waiter for display
  const waiterName = session.username === 'staff_waiter' ? "Courier Sofia Lin" : "Courier Marcus Perez";

  // Filter orders by categories
  // "Ready for Pickup" — all orders which are marked as 'ready' by kitchen and have no waiter assigned
  const readyPickupOrders = orders.filter(o => o.status === 'ready' && !o.waiterName);

  // "My Active Deliveries" — orders assigned to this waiter which are in 'delivering' status
  const myActiveDeliveries = orders.filter(o => o.status === 'delivering' && o.waiterName === waiterName);

  // "Completed Deliveries" — completed orders settled by this waiter
  const deliveryHistory = orders.filter(o => o.status === 'completed' && o.waiterName === waiterName);

  const handleClaim = (orderId: string) => {
    onUpdateStatus(orderId, 'delivering', { waiterName });
  };

  const handleComplete = (orderId: string) => {
    onUpdateStatus(orderId, 'completed');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030408] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative select-none font-sans leading-normal">
      
      {/* Mobile Waiter Header */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-black/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-900 px-4 py-3 shadow-xs">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-amber-500 text-black font-extrabold flex items-center justify-center text-sm shadow-sm">
              🕴️
            </span>
            <div className="text-left">
              <h1 className="text-xs font-black tracking-widest font-display text-slate-900 dark:text-slate-50 uppercase leading-none">
                ATTENDANT TERMINAL
              </h1>
              <p className="text-[9px] uppercase font-mono tracking-widest text-amber-600 dark:text-[#c5a880] mt-0.5 font-bold">
                {waiterName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-neutral-900 hover:text-amber-500 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-500" />}
            </button>

            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-slate-100 dark:bg-neutral-900 hover:text-rose-500 transition-colors font-mono text-[10px] uppercase flex items-center gap-1 cursor-pointer"
              title="Lock Attendant Module"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
            </button>

          </div>
        </div>
      </header>

      {/* Attendant metrics banner block */}
      <div className="bg-gradient-to-r from-amber-500/5 to-amber-650/5 border-b border-amber-500/10 py-3.5 px-4">
        <div className="max-w-md mx-auto grid grid-cols-3 text-center divide-x divide-slate-200 dark:divide-slate-900 font-mono text-[10px] text-slate-500">
          <div>
            <span className="block font-bold text-xs text-slate-800 dark:text-slate-200">{readyPickupOrders.length}</span>
            <span>Awaiting Pickup</span>
          </div>
          <div>
            <span className="block font-bold text-xs text-amber-500">{myActiveDeliveries.length}</span>
            <span>In Transport</span>
          </div>
          <div>
            <span className="block font-bold text-xs text-emerald-500">{deliveryHistory.length}</span>
            <span>Done Today</span>
          </div>
        </div>
      </div>

      {/* Attendant Tabs Switcher */}
      <div className="sticky top-[58px] z-20 bg-white/95 dark:bg-black/95 border-b border-slate-200 dark:border-slate-950 py-2.5 shadow-xs">
        <div className="max-w-md mx-auto grid grid-cols-3 px-3 gap-1.5 font-mono text-[11px] font-bold">
          
          <button
            onClick={() => setActiveTab('ready')}
            className={`py-2 px-1.5 rounded-xl text-center cursor-pointer transition-all relative ${
              activeTab === 'ready'
                ? 'bg-amber-500 text-white dark:text-black font-extrabold shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Hot Pickup
            {readyPickupOrders.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[8px] font-sans font-bold text-white leading-none animate-bounce">
                {readyPickupOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('active')}
            className={`py-2 px-1.5 rounded-xl text-center cursor-pointer transition-all relative ${
              activeTab === 'active'
                ? 'bg-amber-500 text-white dark:text-black font-extrabold shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            My Corridors
            {myActiveDeliveries.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[8px] font-sans font-bold text-white leading-none">
                {myActiveDeliveries.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 px-1.5 rounded-xl text-center cursor-pointer transition-all ${
              activeTab === 'history'
                ? 'bg-amber-500 text-white dark:text-black font-extrabold shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            History Log
          </button>

        </div>
      </div>

      {/* Main Column list Area */}
      <main className="max-w-md mx-auto px-4 py-6 pb-24 space-y-6">
        
        {/* TAB 1: READY FOR PICKUP */}
        {activeTab === 'ready' && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold font-display uppercase tracking-widest text-[#c5a880]">
              🛎️ Active Kitchen Plated Trays
            </h2>

            {readyPickupOrders.length === 0 ? (
              <div className="text-center py-12 p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-950 font-sans">
                <p className="text-slate-400 text-xs">Nothing is currently waiting at the hot-pass counter.</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] text-slate-400 font-mono p-1 px-3 rounded-full bg-slate-100 dark:bg-black/40">
                  <Clock className="w-3.5 h-3.5 text-amber-500" /> Auto-sync active
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {readyPickupOrders.map((o) => (
                  <div 
                    key={o.id}
                    className="p-5 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-950 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">SUITE DESTINATION</span>
                          <h3 className="text-xl font-black font-display text-slate-800 dark:text-white mt-0.5">Room {o.roomNumber}</h3>
                          <p className="text-[10px] text-slate-400 font-sans mt-0.5">{o.guestName}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-[#c5a880] text-[8px] font-mono font-bold tracking-wider uppercase">
                          Hot plated
                        </span>
                      </div>

                      {/* Items summaries */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-900 mt-3">
                        <span className="text-[8px] font-mono text-slate-400 block uppercase mb-1 font-bold">Tray Contents</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {o.items?.map(it => `${it.quantity}x ${it.name}`).join(', ')}
                        </p>
                      </div>

                      {o.specialRequests && (
                        <p className="text-[10px] text-slate-400 bg-orange-500/5 mt-2.5 p-2 rounded border border-orange-500/15 italic">
                          &ldquo;{o.specialRequests}&rdquo;
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleClaim(o.id)}
                      className="w-full py-2.5 bg-slate-950 dark:bg-white hover:brightness-110 text-white dark:text-black font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98]"
                    >
                      <Navigation className="w-3.5 h-3.5" /> Claim Delivery Run
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MY DELIVERIES ACTIVE */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold font-display uppercase tracking-widest text-[#c5a880]">
              🚀 Your Active corridor Runs
            </h2>

            {myActiveDeliveries.length === 0 ? (
              <div className="text-center py-12 p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-950 font-sans">
                <p className="text-slate-400 text-xs">You are currently at rest. Claim a tray in the "Hot Pickup" tab!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myActiveDeliveries.map((o) => (
                  <div 
                    key={o.id}
                    className="p-5 rounded-2xl bg-white dark:bg-neutral-950 border border-amber-500/30 shadow-md flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] font-mono text-[#c5a880] uppercase tracking-widest block font-bold">TRANSITING TOWER RISE</span>
                          <h3 className="text-xl font-black font-display text-slate-800 dark:text-white mt-0.5">Room {o.roomNumber}</h3>
                          <p className="text-[10px] text-slate-400 font-sans mt-0.5">{o.guestName}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400 text-[8px] font-mono font-bold tracking-wider uppercase flex items-center gap-1">
                          <Navigation className="w-2.5 h-2.5 animate-bounce" /> In Corridor
                        </span>
                      </div>

                      {/* Items summaries */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-900 mt-3">
                        <span className="text-[8px] font-mono text-slate-400 block uppercase mb-1 font-bold">Tray Contents</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {o.items?.map(it => `${it.quantity}x ${it.name}`).join(', ')}
                        </p>
                      </div>

                      {o.specialRequests && (
                        <p className="text-[10px] text-rose-400 bg-rose-500/5 mt-2.5 p-2 rounded border border-rose-500/15 italic">
                          ⚠️ SPECIAL FLAG: &ldquo;{o.specialRequests}&rdquo;
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleComplete(o.id)}
                      className="w-full py-3 bg-gradient-to-r from-emerald-505 to-emerald-600 dark:from-emerald-600 dark:to-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98]"
                    >
                      <Check className="w-4 h-4" /> Delivered Elegantly
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ATTENDANT DEED HISTORIES */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold font-display uppercase tracking-widest text-[#c5a880]">
              🏆 Completed Deliveries
            </h2>

            {deliveryHistory.length === 0 ? (
              <div className="text-center py-12 p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-950 font-sans">
                <p className="text-slate-400 text-xs">No logged delivers completed on this shift yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {deliveryHistory.map((o) => (
                  <div 
                    key={o.id}
                    className="p-4 bg-white dark:bg-neutral-950/50 border border-slate-200 dark:border-slate-900 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-slate-700 dark:text-slate-300">Room {o.roomNumber}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                        {o.items?.length} Items &bull; Order #{o.id}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Settled
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

    </div>
  );
}
