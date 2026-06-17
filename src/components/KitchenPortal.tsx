import React from 'react';
import { 
  Flame, CheckCircle2, CookingPot, Timer, AlertTriangle, Play, Check, 
  Moon, Sun, LogOut, RefreshCw, BarChart2 
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface KitchenPortalProps {
  orders: Order[];
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onLogout: () => void;
  onUpdateStatus: (orderId: string, status: OrderStatus, extra?: any) => void;
}

export default function KitchenPortal({
  orders,
  theme,
  onToggleTheme,
  onLogout,
  onUpdateStatus
}: KitchenPortalProps) {
  
  // Header statistic counters calculation
  const newCount = orders.filter(o => o.status === 'pending').length;
  const prepCount = orders.filter(o => o.status === 'preparing').length;
  const readyCount = orders.filter(o => o.status === 'ready').length;
  
  // Count completed orders received today (mock simple count of completed)
  const completedTodayCount = orders.filter(o => o.status === 'completed').length;

  // Kanban Columns filter
  const pendingOrders = orders.filter(o => o.status === 'pending');
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const readyOrders = orders.filter(o => o.status === 'ready');

  // Helper to format elapsed time in MM:SS which helps cooks manage active cooking
  const formatElapsedTime = (sec: number): string => {
    const mins = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSec.toString().padStart(2, '0')}`;
  };

  const handleStartPreparing = (orderId: string) => {
    onUpdateStatus(orderId, 'preparing', { chefName: 'Kitchen Depot A' });
  };

  const handleMarkReady = (orderId: string) => {
    onUpdateStatus(orderId, 'ready');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030408] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative select-none font-sans leading-normal">
      
      {/* KDS Header Controls */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-black/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-900 px-6 py-4 flex items-center justify-between">
        
        {/* Left Area Logo & Role label */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500">
            <CookingPot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black font-display tracking-wider uppercase text-slate-800 dark:text-white leading-none">
                ROOMSERVICEOS KDS
              </h1>
              <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[8px] font-mono uppercase font-black">
                Main Kitchen Terminal
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-0.5">
              ACTIVE HEATING SYSTEM ACTIVE
            </p>
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-3">
          
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-neutral-900 hover:text-amber-500 transition-colors cursor-pointer"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 w-4 text-amber-400" /> : <Moon className="w-4 w-4 text-slate-500" />}
          </button>

          <button
            onClick={onLogout}
            className="p-2.5 px-4 rounded-xl bg-slate-900 dark:bg-neutral-900 hover:bg-rose-500 hover:text-white text-slate-100 transition-all font-mono text-[10px] uppercase font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Lock Terminal</span>
          </button>

        </div>
      </header>

      {/* Main Container Viewport */}
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        
        {/* KDS Stat Widgets row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Stats 1: New orders */}
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-950/80 border border-slate-200 dark:border-slate-900 flex justify-between items-center shadow-xs">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">New Tickets</p>
              <h3 className="text-2xl font-black font-display text-slate-800 dark:text-white mt-1">{newCount}</h3>
            </div>
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          </div>

          {/* Stats 2: Cooking */}
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-950/80 border border-slate-200 dark:border-slate-900 flex justify-between items-center shadow-xs">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">Active Preparing</p>
              <h3 className="text-2xl font-black font-display text-amber-500 mt-1">{prepCount}</h3>
            </div>
            <Flame className="w-5 h-5 text-amber-500 animate-bounce-slow" />
          </div>

          {/* Stats 3: Ready for pickup */}
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-950/80 border border-slate-200 dark:border-slate-900 flex justify-between items-center shadow-xs">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">Pending pickup</p>
              <h3 className="text-2xl font-black font-display text-emerald-500 mt-1">{readyCount}</h3>
            </div>
            <Check className="w-5 h-5 text-emerald-500" />
          </div>

          {/* Stats 4: Completed today */}
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-950/80 border border-slate-200 dark:border-slate-900 flex justify-between items-center shadow-xs">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">Completed Today</p>
              <h3 className="text-2xl font-black font-display text-slate-500 mt-1">{completedTodayCount}</h3>
            </div>
            <CheckCircle2 className="w-5 h-5 text-slate-400" />
          </div>

        </div>

        {/* KDS Columns Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Column 1: NEW ORDERS */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-950 bg-slate-100/60 dark:bg-neutral-950/40 p-4 flex flex-col space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-900/60 font-mono text-xs">
              <span className="font-bold flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                🔵 NEW TICKETS ({pendingOrders.length})
              </span>
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[640px] pr-1">
              {pendingOrders.length === 0 ? (
                <div className="text-center py-16 text-slate-400 text-xs font-sans">
                  No pending orders.
                </div>
              ) : (
                pendingOrders.map((order) => {
                  const isDelayed = order.secondsElapsed > 25 * 60; // Flag red if exceeds 25 minutes!
                  return (
                    <div 
                      key={order.id}
                      className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between space-y-4 shadow-xs relative overflow-hidden group ${
                        isDelayed 
                          ? 'bg-rose-500/10 border-rose-500 text-slate-900 dark:text-rose-100'
                          : 'bg-white dark:bg-neutral-950 border-slate-200 dark:border-slate-900 hover:border-slate-350'
                      }`}
                    >
                      {/* Red Delayed Band Overlay */}
                      {isDelayed && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />
                      )}

                      <div className="space-y-3">
                        {/* Title ticket identification */}
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-base font-black font-display">
                              Suite {order.roomNumber}
                            </p>
                            <p className="text-[10px] text-slate-400 font-sans mt-0.5 font-bold">
                              {order.guestName}
                            </p>
                          </div>
                          
                          {/* Live Ticking display timer */}
                          <div className={`px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1.5 ${
                            isDelayed 
                              ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 animate-pulse'
                              : 'bg-slate-100 dark:bg-black/40 text-slate-500'
                          }`}>
                            <Timer className="w-3 h-3" />
                            <span>{formatElapsedTime(order.secondsElapsed)}</span>
                          </div>
                        </div>

                        {/* Delayed alert badge */}
                        {isDelayed && (
                          <div className="p-1 px-2.5 rounded bg-rose-500/20 border border-rose-500/30 text-[9px] font-mono text-rose-600 dark:text-rose-400 font-bold uppercase flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5" /> ESCALATED DELAY (&gt;25m Threshold)
                          </div>
                        )}

                        {/* Ordered Items lists */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-900/60 pb-1">
                          <span className="text-[8px] uppercase font-mono tracking-wider text-slate-400 block font-bold mb-1">
                            Dishes Requested ({order.items?.length})
                          </span>
                          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                            {order.items?.map((item) => (
                              <li key={item.id} className="flex justify-between font-medium">
                                <span className="truncate pr-2">{item.name}</span>
                                <span className="font-mono bg-slate-100 dark:bg-black/55 px-1.5 py-0.5 rounded text-[10px] text-slate-500 flex-shrink-0">
                                  x{item.quantity}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Special request notes */}
                        {order.specialRequests && (
                          <div className="p-2.5 rounded-lg bg-orange-500/5 border border-orange-500/10 text-[10px] text-slate-500 dark:text-slate-400 leading-normal italic">
                            &ldquo;{order.specialRequests}&rdquo;
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <button
                        onClick={() => handleStartPreparing(order.id)}
                        className="w-full py-2 px-3 rounded-lg bg-slate-950 dark:bg-[#c5a880] text-white dark:text-black font-bold text-xs uppercase tracking-wide cursor-pointer flex items-center justify-center gap-1.5 transition-all hover:brightness-110 active:scale-[0.98]"
                      >
                        <Play className="w-3.5 h-3.5" /> Start Preparing
                      </button>

                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Column 2: PREPARING */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-950 bg-slate-100/60 dark:bg-neutral-950/40 p-4 flex flex-col space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-900/60 font-mono text-xs">
              <span className="font-bold flex items-center gap-1.5 text-amber-500">
                🔥 PREPARING ({preparingOrders.length})
              </span>
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[640px] pr-1">
              {preparingOrders.length === 0 ? (
                <div className="text-center py-16 text-slate-400 text-xs font-sans">
                  No active pots heating.
                </div>
              ) : (
                preparingOrders.map((order) => {
                  const isDelayed = order.secondsElapsed > 25 * 60; // Flag red if exceeds 25 minutes!
                  return (
                    <div 
                      key={order.id}
                      className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between space-y-4 shadow-xs relative overflow-hidden group ${
                        isDelayed 
                          ? 'bg-rose-500/10 border-rose-500 text-slate-900 dark:text-rose-100'
                          : 'bg-white dark:bg-neutral-950 border-slate-200 dark:border-slate-900 hover:border-slate-350'
                      }`}
                    >
                      {/* Red Delayed Band Overlay */}
                      {isDelayed && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />
                      )}

                      <div className="space-y-3">
                        {/* Title ticket identification */}
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-base font-black font-display">
                              Suite {order.roomNumber}
                            </p>
                            <p className="text-[10px] text-slate-400 font-sans mt-0.5 font-bold">
                              {order.guestName}
                            </p>
                          </div>
                          
                          {/* Live Ticking display timer */}
                          <div className={`px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1.5 ${
                            isDelayed 
                              ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 animate-pulse'
                              : 'bg-slate-100 dark:bg-black/40 text-slate-500'
                          }`}>
                            <Timer className="w-3 h-3 animate-spin-slow" />
                            <span>{formatElapsedTime(order.secondsElapsed)}</span>
                          </div>
                        </div>

                        {/* Delayed alert badge */}
                        {isDelayed && (
                          <div className="p-1 px-2.5 rounded bg-rose-500/20 border border-rose-500/30 text-[9px] font-mono text-rose-600 dark:text-rose-400 font-bold uppercase flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5" /> ESCALATED DELAY (&gt;25m Threshold)
                          </div>
                        )}

                        {/* Ordered Items lists */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-900/60 pb-1">
                          <span className="text-[8px] uppercase font-mono tracking-wider text-slate-400 block font-bold mb-1">
                            Dishes Requested ({order.items?.length})
                          </span>
                          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                            {order.items?.map((item) => (
                              <li key={item.id} className="flex justify-between font-medium">
                                <span className="truncate pr-2">{item.name}</span>
                                <span className="font-mono bg-slate-100 dark:bg-black/55 px-1.5 py-0.5 rounded text-[10px] text-slate-500 flex-shrink-0">
                                  x{item.quantity}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Special request notes */}
                        {order.specialRequests && (
                          <div className="p-2.5 rounded-lg bg-orange-500/5 border border-orange-500/10 text-[10px] text-slate-500 dark:text-slate-400 leading-normal italic">
                            &ldquo;{order.specialRequests}&rdquo;
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <button
                        onClick={() => handleMarkReady(order.id)}
                        className="w-full py-2 px-3 rounded-lg bg-[#10b981] text-white font-bold text-xs uppercase tracking-wide cursor-pointer flex items-center justify-center gap-1.5 transition-all hover:brightness-110 active:scale-[0.98]"
                      >
                        <Check className="w-4 h-4" /> Plate & Mark Ready
                      </button>

                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Column 3: READY */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-950 bg-slate-100/60 dark:bg-neutral-950/40 p-4 flex flex-col space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-900/60 font-mono text-xs">
              <span className="font-bold flex items-center gap-1.5 text-emerald-500">
                🟢 READY FOR PICKUP ({readyOrders.length})
              </span>
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[640px] pr-1">
              {readyOrders.length === 0 ? (
                <div className="text-center py-16 text-slate-400 text-xs font-sans">
                  No orders waiting.
                </div>
              ) : (
                readyOrders.map((order) => {
                  const isDelayed = order.secondsElapsed > 25 * 60; // Flag red if exceeds 25 minutes!
                  return (
                    <div 
                      key={order.id}
                      className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between space-y-4 shadow-xs relative overflow-hidden group ${
                        isDelayed 
                          ? 'bg-rose-500/10 border-rose-500 text-slate-900 dark:text-rose-100'
                          : 'bg-white dark:bg-neutral-950 border-slate-200 dark:border-slate-900 hover:border-slate-350'
                      }`}
                    >
                      {/* Red Delayed Band Overlay */}
                      {isDelayed && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />
                      )}

                      <div className="space-y-3">
                        {/* Title ticket identification */}
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-base font-black font-display">
                              Suite {order.roomNumber}
                            </p>
                            <p className="text-[10px] text-slate-400 font-sans mt-0.5 font-bold">
                              {order.guestName}
                            </p>
                          </div>
                          
                          {/* Live Ticking display timer */}
                          <div className={`px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1.5 ${
                            isDelayed 
                              ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 animate-pulse'
                              : 'bg-slate-100 dark:bg-black/40 text-slate-500'
                          }`}>
                            <Timer className="w-3 h-3" />
                            <span>{formatElapsedTime(order.secondsElapsed)}</span>
                          </div>
                        </div>

                        {/* Detailed information status line */}
                        <div className="p-2 border border-emerald-500/10 bg-emerald-500/5 rounded-lg text-emerald-600 dark:text-emerald-400 text-[10px] font-mono text-center">
                          🛎️ AWAITING COURIER ASSIGNMENT
                        </div>

                        {/* Ordered Items lists */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-900/60 pb-1">
                          <span className="text-[8px] uppercase font-mono tracking-wider text-slate-400 block font-bold mb-1">
                            Dishes Requested ({order.items?.length})
                          </span>
                          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                            {order.items?.map((item) => (
                              <li key={item.id} className="flex justify-between font-medium">
                                <span className="truncate pr-2">{item.name}</span>
                                <span className="font-mono bg-slate-100 dark:bg-black/55 px-1.5 py-0.5 rounded text-[10px] text-slate-500 flex-shrink-0">
                                  x{item.quantity}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Special request notes */}
                        {order.specialRequests && (
                          <div className="p-2.5 rounded-lg bg-orange-500/5 border border-orange-500/10 text-[10px] text-slate-500 dark:text-slate-400 leading-normal italic">
                            &ldquo;{order.specialRequests}&rdquo;
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
