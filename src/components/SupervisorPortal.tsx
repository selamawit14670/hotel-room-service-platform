import React, { useState } from 'react';
import { 
  Building2, Users, AlertTriangle, Play, ShieldAlert, Timer, 
  Search, SlidersHorizontal, Moon, Sun, LogOut, CheckCircle2, ChevronRight, RefreshCw
} from 'lucide-react';
import { Order, OrderStatus, StaffMember } from '../types';

interface SupervisorPortalProps {
  orders: Order[];
  staff: StaffMember[];
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onLogout: () => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onUpdateStaffStatus: (staffId: string, status: 'active' | 'busy' | 'offline') => void;
}

export default function SupervisorPortal({
  orders,
  staff,
  theme,
  onToggleTheme,
  onLogout,
  onUpdateOrderStatus,
  onUpdateStaffStatus
}: SupervisorPortalProps) {
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'preparing' | 'ready' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Delay Alert calculation: Orders older than 30 minutes which are still active (not completed or cancelled)
  const delayAlertOrders = orders.filter(o => 
    o.status !== 'completed' && 
    o.status !== 'cancelled' && 
    o.secondsElapsed > 30 * 60 // 30 minutes * 60 seconds
  );

  // Statistics summaries
  const totalActiveCount = orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length;
  const criticalDelayCount = delayAlertOrders.length;
  const preparingCount = orders.filter(o => o.status === 'preparing').length;
  const completedToday = orders.filter(o => o.status === 'completed').length;

  // Filtered Orders mapping
  const filteredOrders = orders.filter(order => {
    const matchesFilter = orderFilter === 'all' || order.status === orderFilter;
    const matchesSearch = 
      order.roomNumber.includes(searchTerm) || 
      order.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  // Toggles active duty status for staff
  const handleToggleStaffStatus = (staffId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'offline' ? 'active' : 'offline';
    onUpdateStaffStatus(staffId, nextStatus);
  };

  const formatSecondsToMins = (sec: number): string => {
    const mins = Math.floor(sec / 60);
    return `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030408] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative select-none font-sans leading-normal">
      
      {/* Supervisor Header */}
      <header className="sticky top-0 z-30 bg-white dark:bg-black/90 border-b border-slate-200 dark:border-slate-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black font-display tracking-wider uppercase text-slate-800 dark:text-white leading-none">
                SUPERVISOR OPERATIONS HUB
              </h1>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/25 text-amber-600 dark:text-[#c5a880] text-[8px] font-mono uppercase font-black">
                Active Duty
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-0.5">
              REAL-TIME SERVICE RECTIFIER
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-neutral-900 hover:text-amber-500 transition-colors cursor-pointer"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            onClick={onLogout}
            className="p-2.5 px-4 rounded-xl bg-slate-900 dark:bg-neutral-900 hover:bg-rose-500 hover:text-white text-slate-100 transition-all font-mono text-[10px] uppercase font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Lock Console</span>
          </button>

        </div>
      </header>

      {/* Main Container */}
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        
        {/* Statistics Cards row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-950/80 border border-slate-200 dark:border-slate-900">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Live Active Tickets</span>
            <div className="flex justify-between items-baseline mt-1.5">
              <h3 className="text-2xl font-black font-display text-slate-800 dark:text-white">{totalActiveCount}</h3>
              <span className="text-[10px] text-slate-400 font-mono">active in rooms</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-950/80 border border-slate-200 dark:border-slate-900">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Escalation Warnings</span>
            <div className="flex justify-between items-baseline mt-1.5">
              <h3 className={`text-2xl font-black font-display ${criticalDelayCount > 0 ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`}>
                {criticalDelayCount}
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Older than 30m</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-950/80 border border-slate-200 dark:border-slate-900">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Staff In Kitchens</span>
            <div className="flex justify-between items-baseline mt-1.5">
              <h3 className="text-2xl font-black font-display text-amber-500">{staff.filter(s => s.role === 'chef' && s.status === 'active').length}</h3>
              <span className="text-[10px] text-slate-400 font-mono">chefs active</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-950/80 border border-slate-200 dark:border-slate-900">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Settled Deliveries</span>
            <div className="flex justify-between items-baseline mt-1.5">
              <h3 className="text-2xl font-black font-display text-emerald-500">{completedToday}</h3>
              <span className="text-[10px] text-slate-400 font-mono">completed shifts</span>
            </div>
          </div>

        </div>

        {/* DELAY ALERTS ACCENT CONTAINER (>30m rules highlight) */}
        {criticalDelayCount > 0 && (
          <div className="p-5 rounded-2xl border-2 border-rose-500/40 bg-rose-500/5 space-y-4">
            <div className="flex items-center gap-2.5 text-rose-500">
              <AlertTriangle className="w-5 h-5 animate-bounce" />
              <h2 className="font-bold text-sm tracking-wide font-display uppercase">
                🚨 Service Delay Alerts — Immediate Supervisor Intervention Needed
              </h2>
            </div>
            
            <p className="text-xs text-rose-400/90 leading-relaxed font-sans max-w-3xl">
              The following guest tickets have exceeded the critical 30-minute operational threshold. Please nudge the kitchen line chef or courier dispatcher immediately.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {delayAlertOrders.map((o) => (
                <div 
                  key={o.id} 
                  className="p-4 rounded-xl border border-rose-500/20 bg-rose-950/20 flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-rose-500"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-bold text-rose-200">
                        Suite {o.roomNumber} &bull; {o.guestName}
                      </p>
                      <p className="text-[10px] text-rose-400 mt-0.5">Order #{o.id} &bull; Culinary Status: <span className="uppercase font-bold">{o.status}</span></p>
                    </div>
                    <div className="px-2 py-0.5 rounded bg-rose-500/20 text-[10px] font-mono font-bold text-rose-500 flex items-center gap-1">
                      <Timer className="w-3.5 h-3.5" />
                      <span>{formatSecondsToMins(o.secondsElapsed)} elapsed</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-300 leading-snug border-l border-rose-500/30 pl-2">
                    {o.items?.map(it => `${it.quantity}x ${it.name}`).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DOUBLE COLUMN: LEFT ACTIVE ORDERS TABLE, RIGHT STAFF DUTY STATES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT COMMANDS ORDERS TABLE MODULE */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-neutral-950 shadow-sm overflow-hidden">
            
            {/* Nav tool section filters */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-900 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="font-display font-black text-sm text-slate-800 dark:text-slate-100 uppercase tracking-widest">
                  📋 Live Order Operations
                </h3>

                <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-black/30 px-3.5 py-1.5 rounded-xl text-xs w-full sm:max-w-xs">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search suite number or guest name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full focus:outline-none dark:text-white"
                  />
                </div>
              </div>

              {/* Pills Filters */}
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                {[
                  { key: 'all', title: 'ALL TICKETS' },
                  { key: 'pending', title: '🔵 NEW TICKET' },
                  { key: 'preparing', title: '🔥 PREPARING' },
                  { key: 'ready', title: '🟢 READY' },
                  { key: 'completed', title: '🏆 DELIVERED' }
                ].map((pill) => (
                  <button
                    key={pill.key}
                    onClick={() => setOrderFilter(pill.key as any)}
                    className={`px-3 py-1.5 rounded-lg border font-bold cursor-pointer transition-all ${
                      orderFilter === pill.key
                        ? 'bg-amber-500 text-white dark:text-black border-amber-500'
                        : 'bg-slate-50 dark:bg-black/30 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-900 hover:border-slate-300'
                    }`}
                  >
                    {pill.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Table layout overflow viewport */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-900 bg-slate-50 dark:bg-black/20 text-[9px] font-mono tracking-widest text-slate-400 uppercase select-none">
                    <th className="p-4 pl-6">ID & Suite</th>
                    <th className="p-4">Guest Name</th>
                    <th className="p-4">Dishes Count</th>
                    <th className="p-4">Processing Timer</th>
                    <th className="p-4">Status Pill</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-slate-400">
                        No active matched room orders found.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((o) => {
                      const isDelayedCritical = o.status !== 'completed' && o.status !== 'cancelled' && o.secondsElapsed > 30 * 60;
                      return (
                        <tr 
                          key={o.id} 
                          className={`hover:bg-slate-50/50 dark:hover:bg-white/2 transition-colors ${
                            isDelayedCritical ? 'bg-rose-500/5 hover:bg-rose-500/10' : ''
                          }`}
                        >
                          {/* Col 1: Room id details */}
                          <td className="p-4 pl-6">
                            <p className="font-bold text-slate-800 dark:text-slate-100">
                              Suite {o.roomNumber}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">#{o.id}</p>
                          </td>

                          {/* Col 2: Name */}
                          <td className="p-4">
                            <p className="font-semibold text-slate-650 dark:text-slate-300">{o.guestName}</p>
                          </td>

                          {/* Col 3: Items summarizing */}
                          <td className="p-4">
                            <p className="text-slate-500 dark:text-slate-400 truncate max-w-xs">
                              {o.items?.map(it => `${it.quantity}x ${it.name}`).join(', ')}
                            </p>
                          </td>

                          {/* Col 4: Ticking timer */}
                          <td className="p-4">
                            <span className={`font-mono font-bold text-[10px] px-2 py-0.5 rounded ${
                              isDelayedCritical 
                                ? 'bg-rose-500/20 text-rose-500' 
                                : 'bg-slate-100 dark:bg-black/40 text-slate-500'
                            }`}>
                              {formatSecondsToMins(o.secondsElapsed)}
                            </span>
                          </td>

                          {/* Col 5: Status indicator pills */}
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-[8px] font-mono uppercase font-bold tracking-wider ${
                              o.status === 'pending' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/15' :
                              o.status === 'preparing' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/15 animate-pulse' :
                              o.status === 'ready' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/15' :
                              o.status === 'delivering' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-400/15' :
                              'bg-slate-500/10 text-slate-400 border border-slate-500/15'
                            }`}>
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>

          {/* RIGHT STAFF TEAM ASSIGNMENTS & STATUS MODULE */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-neutral-950 shadow-sm p-5 space-y-6">
            
            <div className="border-b border-slate-100 dark:border-slate-900 pb-3">
              <h3 className="font-display font-black text-sm text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2">
                <Users className="w-4.5 h-4.5 text-amber-500" /> Attendants Duty
              </h3>
              <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                Toggle availability status for culinary line operators and room waiters.
              </p>
            </div>

            <div className="space-y-4">
              {staff.map((member) => (
                <div 
                  key={member.id} 
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-black/10 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl p-2 rounded-lg bg-white dark:bg-neutral-900 shadow-sm">{member.avatar}</span>
                    <div>
                      <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 leading-tight">
                        {member.name}
                      </h4>
                      <p className="text-[10px] uppercase font-mono mt-0.5 text-slate-500">
                        {member.role === 'chef' ? '👨‍🍳 KITCHEN COOK' : member.role === 'waiter' ? '🕴️ SUITE WAITER' : '🤵 SUPERVISOR'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {/* Active label status dots */}
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[9px] font-mono uppercase font-bold ${
                      member.status === 'active' || member.status === 'busy'
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/15'
                        : 'bg-slate-500/10 text-slate-400 border border-slate-500/15'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'active' || member.status === 'busy' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                      <span>{member.status === 'active' || member.status === 'busy' ? "ON DUTY" : "BREAK"}</span>
                    </span>

                    {/* Toggle duty controller checkbox button */}
                    <button
                      onClick={() => handleToggleStaffStatus(member.id, member.status)}
                      className={`p-1.5 px-3 rounded-lg text-[9px] font-mono font-bold uppercase cursor-pointer transition-all ${
                        member.status === 'active' || member.status === 'busy'
                          ? 'bg-slate-100 dark:bg-black/40 text-slate-400 hover:text-rose-500 hover:bg-rose-500/15'
                          : 'bg-emerald-505 dark:bg-emerald-600 text-white hover:brightness-110'
                      }`}
                    >
                      {member.status === 'active' || member.status === 'busy' ? "Set Break" : "Set Duty"}
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
