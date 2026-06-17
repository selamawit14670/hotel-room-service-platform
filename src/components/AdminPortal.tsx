import React, { useState } from 'react';
import { 
  BarChart4, UtensilsCrossed, Users, Settings, Clipboard, Search, Plus, 
  Trash2, Edit3, Power, Save, Landmark, DollarSign, Clock, Star, 
  CreditCard, Smartphone, Check, Moon, Sun, LogOut, Info, AlertTriangle 
} from 'lucide-react';
import { MenuItem, Order, StaffMember, OrderStatus } from '../types';
import { HotelSettings } from '../lib/state';

interface AdminPortalProps {
  orders: Order[];
  menuItems: MenuItem[];
  staff: StaffMember[];
  settings: HotelSettings;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onLogout: () => void;
  onSaveMenuItem: (item: MenuItem) => void;
  onDeleteMenuItem: (id: string) => void;
  onUpdateStaffMember: (member: StaffMember) => void;
  onUpdateHotelSettings: (newSettings: HotelSettings) => void;
  onUpdateOrderStatus: (id: string, status: OrderStatus) => void;
}

export default function AdminPortal({
  orders,
  menuItems,
  staff,
  settings,
  theme,
  onToggleTheme,
  onLogout,
  onSaveMenuItem,
  onDeleteMenuItem,
  onUpdateStaffMember,
  onUpdateHotelSettings,
  onUpdateOrderStatus
}: AdminPortalProps) {
  const [activeTab, setActiveTab] = useState<'dash' | 'menu' | 'orders' | 'staff' | 'settings'>('dash');

  // Search/Filter states
  const [menuSearch, setMenuSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [staffSearch, setStaffSearch] = useState('');

  // Editing and Creation states
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [isCreatingMenu, setIsCreatingMenu] = useState(false);
  const [newMenuForm, setNewMenuForm] = useState<Partial<MenuItem>>({
    name: '', description: '', price: 10, category: 'Main Courses', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80', tags: []
  });

  // Hotel settings inputs
  const [settingsForm, setSettingsForm] = useState<HotelSettings>({ ...settings });

  // 1. ANALYTICS CALCULATIONS
  const totalRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + o.items.reduce((itemSum, item) => itemSum + item.price * item.quantity, 0), 0);

  const completedOrdersCount = orders.filter(o => o.status === 'completed').length;
  const averageOrderValue = completedOrdersCount > 0 ? totalRevenue / completedOrdersCount : 0;
  
  // Calculate delay count: active orders older than 25 minutes
  const activeDelayedOrdersCount = orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled' && o.secondsElapsed > 25 * 60).length;

  // Render SVG Sparkline for Revenue (Mock data scaled for nice rendering)
  const sparklineData = [120, 240, 180, 420, 310, 520, totalRevenue];
  const maxSparkVal = Math.max(...sparklineData);
  const points = sparklineData.map((val, i) => `${i * 35},${100 - (val / maxSparkVal) * 80}`).join(' ');

  // Category sales breakdown count
  const categorySales: { [key: string]: number } = {};
  orders.filter(o => o.status === 'completed').forEach(o => {
    o.items.forEach(it => {
      const category = it.category || 'Main Courses';
      categorySales[category] = (categorySales[category] || 0) + it.quantity;
    });
  });

  // 2. MENU OPERATIONS
  const handleSaveMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMenuItem) {
      onSaveMenuItem(editingMenuItem);
      setEditingMenuItem(null);
    } else if (isCreatingMenu && newMenuForm.name && newMenuForm.price) {
      const item: MenuItem = {
        id: `m-custom-${Date.now()}`,
        name: newMenuForm.name,
        description: newMenuForm.description || '',
        price: Number(newMenuForm.price),
        category: newMenuForm.category || 'Main Courses',
        rating: 5.0,
        image: newMenuForm.image || 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80',
        tags: newMenuForm.tags || []
      };
      onSaveMenuItem(item);
      setIsCreatingMenu(false);
      setNewMenuForm({ name: '', description: '', price: 10, category: 'Main Courses', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80', tags: [] });
    }
  };

  const handleToggleMenuAvailability = (item: MenuItem) => {
    // If we want to simulate availability, let's toggle a flag or toggle delete/re-save.
    // For simplicity, we can tag active menu items using metadata. Let's toggle tags "Out Of Stock"
    let nextTags = [...(item.tags || [])];
    if (nextTags.includes("OUT OF STOCK")) {
      nextTags = nextTags.filter(t => t !== "OUT OF STOCK");
    } else {
      nextTags.push("OUT OF STOCK");
    }
    onSaveMenuItem({ ...item, tags: nextTags });
  };

  // 3. STAFF OPERATIONS
  const handleToggleStaffAvailability = (member: StaffMember) => {
    const nextStatus = member.status === 'offline' ? 'active' : 'offline';
    onUpdateStaffMember({ ...member, status: nextStatus });
  };

  // 4. SETTINGS SAVE
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateHotelSettings(settingsForm);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030408] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col lg:flex-row font-sans">
      
      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-64 bg-white dark:bg-black/80 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-900 p-5 flex flex-col justify-between select-none shrink-0">
        <div className="space-y-8">
          
          {/* Logo brand block */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-[#ffff] font-black shadow-md">
              <span className="font-display">{settings.logo}</span>
            </div>
            <div>
              <h1 className="text-xs font-black tracking-widest font-display text-slate-900 dark:text-slate-50 uppercase leading-none">
                {settings.name.split(' ')[0]} Admin
              </h1>
              <span className="text-[8px] font-mono uppercase text-amber-600 dark:text-[#c5a880] mt-1 font-bold block">
                Enterprise Suite
              </span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 pb-2 lg:pb-0 font-mono text-[11px] font-bold">
            <button
              onClick={() => setActiveTab('dash')}
              className={`w-full text-left py-3 px-3.5 rounded-xl flex items-center gap-3 whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'dash'
                  ? 'bg-amber-500 text-white dark:text-black font-extrabold shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <BarChart4 className="w-4 h-4" /> <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`w-full text-left py-3 px-3.5 rounded-xl flex items-center gap-3 whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'menu'
                  ? 'bg-amber-500 text-white dark:text-black font-extrabold shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" /> <span>Menu Control</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left py-3 px-3.5 rounded-xl flex items-center gap-3 whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'orders'
                  ? 'bg-amber-500 text-white dark:text-black font-extrabold shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Clipboard className="w-4 h-4" /> <span>Orders Audit</span>
            </button>
            <button
              onClick={() => setActiveTab('staff')}
              className={`w-full text-left py-3 px-3.5 rounded-xl flex items-center gap-3 whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'staff'
                  ? 'bg-amber-500 text-white dark:text-black font-extrabold shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4" /> <span>Staff Roster</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left py-3 px-3.5 rounded-xl flex items-center gap-3 whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'settings'
                  ? 'bg-amber-500 text-white dark:text-black font-extrabold shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Settings className="w-4 h-4" /> <span>Settings</span>
            </button>
          </nav>

        </div>

        {/* Account controls */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-900 mt-6 flex lg:flex-col flex-row gap-3 items-center lg:items-stretch justify-between lg:justify-start">
          
          {/* Quick theme action */}
          <button
            onClick={onToggleTheme}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-slate-350 font-mono text-[10px] uppercase font-bold flex items-center justify-center gap-2 cursor-pointer border border-slate-200 dark:border-slate-950"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
            <span>{theme === 'dark' ? "Light UI" : "Dark UI"}</span>
          </button>
          
          <button
            onClick={onLogout}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-rose-500 hover:text-[#ffff] text-[#ffff] font-mono text-[10px] uppercase font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>Lock Terminal</span>
          </button>

        </div>
      </aside>

      {/* CORE VIEWPORT CONTENT MODULE */}
      <main className="flex-1 p-6 md:p-8 lg:p-10 max-h-screen overflow-y-auto space-y-8 select-none">
        
        {/* TAB 1: DASHBOARD ANALYTICS */}
        {activeTab === 'dash' && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold font-display uppercase tracking-widest text-[#c5a880] border-b border-slate-200 dark:border-slate-900 pb-3">
              📊 Executive Platform Analytics
            </h2>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-900 shadow-xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Today's Revenue</span>
                <div className="flex items-center gap-2 mt-2">
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-2xl font-black font-display text-slate-800 dark:text-white">${totalRevenue.toFixed(2)}</h3>
                </div>
                <p className="text-[9px] text-slate-400 mt-1 font-mono">100% direct room charge settlements</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-900 shadow-xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Completed orders</span>
                <div className="flex items-center gap-2 mt-2">
                  <Clipboard className="w-5 h-5 text-indigo-505 dark:text-[#c5a880]" />
                  <h3 className="text-2xl font-black font-display text-slate-800 dark:text-white">{completedOrdersCount}</h3>
                </div>
                <p className="text-[9px] text-slate-400 mt-1 font-mono">excluding cancelled tickets</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-900 shadow-xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Average room check</span>
                <div className="flex items-center gap-2 mt-2">
                  <CreditCard className="w-5 h-5 text-amber-505 dark:text-amber-500" />
                  <h3 className="text-2xl font-black font-display text-slate-800 dark:text-white">${averageOrderValue.toFixed(2)}</h3>
                </div>
                <p className="text-[9px] text-slate-400 mt-1 font-mono">excluding complimentary items</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-900 shadow-xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold font-black text-rose-500">Active delay count</span>
                <div className="flex items-center gap-2 mt-2">
                  <AlertTriangle className="w-5 h-5 text-rose-500" />
                  <h3 className="text-2xl font-black font-display text-rose-500">{activeDelayedOrdersCount}</h3>
                </div>
                <p className="text-[9px] text-slate-400 mt-1 font-mono">Orders exceeding 25m threshold</p>
              </div>

            </div>

            {/* Custom SVG Rendered Sales Trend chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-900 space-y-4">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider font-display text-slate-805 dark:text-slate-200">Revenue trajectory hourly</h4>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">Calculated in real time across systems</p>
                </div>
                
                {/* SVG Sparkline Graph */}
                <div className="h-44 w-full bg-slate-50 dark:bg-black/35 rounded-xl flex items-center justify-center p-4">
                  <svg viewBox="0 0 250 100" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#c5a880" stopOpacity="0.4"/>
                        <stop offset="100%" stopColor="#c5a880" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <polyline
                      fill="url(#gradient-area)"
                      stroke="none"
                      points={`0,100 ${points} 210,100`}
                    />
                    <polyline
                      fill="none"
                      stroke="#c5a880"
                      strokeWidth="2.5"
                      points={points}
                      strokeLinecap="round"
                    />
                    {/* Dots at graph points */}
                    {sparklineData.map((val, i) => (
                      <circle
                        key={i}
                        cx={i * 35}
                        cy={100 - (val / maxSparkVal) * 80}
                        r="3.5"
                        fill="#000000"
                        stroke="#c5a880"
                        strokeWidth="1.5"
                      />
                    ))}
                  </svg>
                </div>
                <div className="flex justify-between font-mono text-[9px] text-slate-400">
                  <span>Breakfast</span>
                  <span>Lunch Rush</span>
                  <span>Sunset lounge</span>
                  <span>Late dine</span>
                </div>
              </div>

              {/* Popular categories lists bento */}
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-900 space-y-4">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider font-display text-slate-805 dark:text-slate-200 font-black">Category volumes</h4>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">Most in-demand culinary categories</p>
                </div>

                <div className="space-y-3.5">
                  {[
                    { cat: 'Breakfast', icon: '🍳', defaultCount: 12 },
                    { cat: 'Main Courses', icon: '🍔', defaultCount: 22 },
                    { cat: 'Beverages', icon: '🥂', defaultCount: 18 },
                    { cat: 'Snacks', icon: '🍿', defaultCount: 8 },
                    { cat: 'Amenities', icon: ' towels', defaultCount: 14 }
                  ].map((item) => {
                    const actualCount = (categorySales[item.cat] || 0) + item.defaultCount;
                    return (
                      <div key={item.cat} className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-medium text-slate-700 dark:text-slate-350">{item.icon} {item.cat}</span>
                          <span className="font-mono font-bold text-slate-600 dark:text-slate-450">{actualCount} units</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-amber-500 h-full rounded-full" 
                            style={{ width: `${Math.min(100, (actualCount / 40) * 100)}%` }} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: MENU CONTROL MANAGEMENT */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-900 pb-4">
              <div>
                <h2 className="text-xl font-bold font-display uppercase tracking-widest text-[#c5a880]">
                  🍔 In-Room Culinary Menu Builder
                </h2>
                <p className="text-[10px] text-slate-400 font-mono tracking-wide">
                  Configure categories, adjusting prices, and toggle kitchen rest times.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-900 bg-white dark:bg-black/30 px-3 py-1.5 rounded-xl text-xs sm:w-64">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search dishes name..."
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    className="w-full focus:outline-none dark:text-white"
                  />
                </div>

                <button
                  onClick={() => setIsCreatingMenu(true)}
                  className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black hover:brightness-110 font-mono text-[10px] uppercase font-mono font-bold rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-505" /> Add Dish
                </button>
              </div>
            </div>

            {/* Editing modal block overlay if active */}
            {(editingMenuItem || isCreatingMenu) && (
              <form onSubmit={handleSaveMenu} className="p-6 rounded-2xl border border-[#c5a880]/40 bg-white dark:bg-black/40 space-y-4">
                <h3 className="font-display font-bold text-sm text-slate-800 dark:text-[#c5a880] uppercase tracking-wider">
                  {editingMenuItem ? 'Edit Menu Item Details' : 'Design New Room Service Item'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-550 uppercase mb-1">Dish Title Name</label>
                    <input
                      type="text"
                      value={editingMenuItem ? editingMenuItem.name : newMenuForm.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (editingMenuItem) setEditingMenuItem({ ...editingMenuItem, name: val });
                        else setNewMenuForm({ ...newMenuForm, name: val });
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-550 uppercase mb-1">Price Billed ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingMenuItem ? editingMenuItem.price : newMenuForm.price}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (editingMenuItem) setEditingMenuItem({ ...editingMenuItem, price: val });
                        else setNewMenuForm({ ...newMenuForm, price: val });
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-550 uppercase mb-1">Service Category</label>
                    <select
                      value={editingMenuItem ? editingMenuItem.category : newMenuForm.category}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (editingMenuItem) setEditingMenuItem({ ...editingMenuItem, category: val });
                        else setNewMenuForm({ ...newMenuForm, category: val });
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      {['Breakfast', 'Main Courses', 'Beverages', 'Snacks', 'Amenities'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-550 uppercase mb-1">Descriptive Recipe notes & Shorthand</label>
                  <input
                    type="text"
                    value={editingMenuItem ? editingMenuItem.description : newMenuForm.description}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingMenuItem) setEditingMenuItem({ ...editingMenuItem, description: val });
                      else setNewMenuForm({ ...newMenuForm, description: val });
                    }}
                    placeholder="e.g. Dry-aged patty served on brioche with custom aioli sauce."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingMenuItem(null);
                      setIsCreatingMenu(false);
                    }}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-900 hover:bg-slate-50 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Cancel Draft
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-505 dark:bg-[#c5a880] text-[#ffff] dark:text-black rounded-xl text-xs font-black cursor-pointer shadow-sm flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" /> Save Dish Config
                  </button>
                </div>
              </form>
            )}

            {/* Menu List Table */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-neutral-950 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-900 bg-slate-50 dark:bg-black/20 text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                      <th className="p-4 pl-6">Dish / Amenity Picture</th>
                      <th className="p-4">Item Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Unit Price Billed</th>
                      <th className="p-4">Tags Overview</th>
                      <th className="p-4 text-right pr-6">Management Controllers</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-105 dark:divide-slate-900">
                    {menuItems.filter(item => item.name.toLowerCase().includes(menuSearch.toLowerCase())).map((item) => {
                      const isOutOfStock = item.tags?.includes("OUT OF STOCK");
                      return (
                        <tr key={item.id} className="hover:bg-slate-55/60 dark:hover:bg-white/2 transition-colors">
                          <td className="p-4 pl-6">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-900"
                              referrerPolicy="no-referrer"
                            />
                          </td>
                          <td className="p-4">
                            <h4 className="font-bold text-slate-800 dark:text-white leading-tight">{item.name}</h4>
                            <p className="text-[10px] text-slate-400 leading-relaxed max-w-sm font-sans mt-0.5">{item.description}</p>
                          </td>
                          <td className="p-4 font-mono text-[10px] text-slate-500 uppercase font-bold">{item.category}</td>
                          <td className="p-4 font-mono font-bold text-slate-700 dark:text-slate-350">${item.price.toFixed(2)}</td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {item.tags?.map(t => (
                                <span 
                                  key={t} 
                                  className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold ${
                                    t === "OUT OF STOCK" ? 'bg-rose-500/10 text-rose-500 border border-rose-500/15' : 'bg-amber-500/10 text-amber-600'
                                  }`}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 text-right pr-6">
                            <div className="flex items-center justify-end gap-2">
                              {/* Power Toggle Availability */}
                              <button
                                onClick={() => handleToggleMenuAvailability(item)}
                                className={`p-1.5 rounded-lg border cursor-pointer ${
                                  isOutOfStock 
                                    ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' 
                                    : 'bg-emerald-505/10 text-emerald-500 border-emerald-505/20'
                                }`}
                                title={isOutOfStock ? "Set Available" : "Set Out of Stock"}
                              >
                                <Power className="w-3.5 h-3.5" />
                              </button>
                              
                              {/* Edit Action Button */}
                              <button
                                onClick={() => setEditingMenuItem(item)}
                                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-900 text-slate-500 hover:text-[#c5a880] hover:border-amber-500/20 cursor-pointer"
                                title="Edit Specifications"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete Action Button */}
                              <button
                                onClick={() => onDeleteMenuItem(item.id)}
                                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-900 text-slate-400 hover:text-rose-500 hover:border-rose-500/25 cursor-pointer"
                                title="Delete Dish"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: ORDERS COMPREHENSIVE VIEW */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-900 pb-4">
              <div>
                <h2 className="text-xl font-bold font-display uppercase tracking-widest text-[#c5a880]">
                  🗄️ Master Orders Log & Audits
                </h2>
                <p className="text-[10px] text-slate-400 font-mono tracking-wide">
                  Complete chronological audits. Intervene, adjust, or cancel room service tickets directly.
                </p>
              </div>

              <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-900 bg-white dark:bg-black/30 px-3 py-1.5 rounded-xl text-xs sm:w-64">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search suite num or ID..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-neutral-950 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-900 bg-slate-50 dark:bg-black/20 text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                      <th className="p-4 pl-6">ID & Suite</th>
                      <th className="p-4">Guest Info</th>
                      <th className="p-4">Dishes Claimed</th>
                      <th className="p-4">Timestamps Placed</th>
                      <th className="p-4">Status & Action override</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
                    {orders.filter(o => o.roomNumber.includes(orderSearch) || o.guestName.toLowerCase().includes(orderSearch.toLowerCase())).map((o) => (
                      <tr key={o.id} className="hover:bg-slate-55/65 dark:hover:bg-white/2 transition-colors">
                        <td className="p-4 pl-6">
                          <p className="font-bold text-slate-805 dark:text-white">Suite {o.roomNumber}</p>
                          <p className="text-[10px] text-slate-450 font-mono mt-0.5">#{o.id}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-semibold text-slate-700 dark:text-slate-300">{o.guestName}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-slate-500 dark:text-slate-400 max-w-sm truncate">
                            {o.items?.map(it => `${it.quantity}x ${it.name}`).join(', ')}
                          </p>
                        </td>
                        <td className="p-4 font-mono text-[10px] text-slate-450">
                          {o.timestamp ? new Date(o.timestamp).toLocaleTimeString() : 'Recent'}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 rounded text-[8px] font-mono uppercase font-bold tracking-wider ${
                              o.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' :
                              o.status === 'cancelled' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-550'
                            }`}>
                              {o.status}
                            </span>

                            {/* Status controls */}
                            <select
                              value={o.status}
                              onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as OrderStatus)}
                              className="px-2 py-1 rounded border border-slate-205 dark:border-slate-850 bg-slate-50 dark:bg-black/30 font-mono text-[9px] text-slate-500"
                            >
                              <option value="pending">pending</option>
                              <option value="preparing">preparing</option>
                              <option value="ready">ready</option>
                              <option value="delivering">delivering</option>
                              <option value="completed">completed</option>
                              <option value="cancelled">cancelled</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: STAFF MANAGEMENT DIRECTORY */}
        {activeTab === 'staff' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-900 pb-4">
              <div>
                <h2 className="text-xl font-bold font-display uppercase tracking-widest text-[#c5a880]">
                  🤵 Attendant & Chef Service Directory
                </h2>
                <p className="text-[10px] text-slate-400 font-mono tracking-wide">
                  Review staff satisfaction, assignments, and audit on-duty registers.
                </p>
              </div>

              <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-900 bg-white dark:bg-black/30 px-3 py-1.5 rounded-xl text-xs sm:w-64">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search members name..."
                  value={staffSearch}
                  onChange={(e) => setStaffSearch(e.target.value)}
                  className="w-full focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {staff.filter(s => s.name.toLowerCase().includes(staffSearch.toLowerCase())).map((member) => (
                <div 
                  key={member.id}
                  className="p-5 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-900 flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl p-3 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-150 dark:border-slate-950 shadow-inner">
                      {member.avatar}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-850 dark:text-white leading-tight">
                        {member.name}
                      </h4>
                      <p className="text-[10px] uppercase font-mono text-slate-400 mt-1 font-bold">
                        {member.role === 'chef' ? '👨‍🍳 Head Line Chef' : member.role === 'waiter' ? '🕴️ Corridor Attendant' : '🤵 Night Director'}
                      </p>
                      
                      <div className="flex items-center gap-1.5 mt-2">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span className="text-xs font-mono font-bold">{member.rating ? member.rating.toFixed(1) : "5.0"} Score</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-900 text-xs">
                    <div>
                      <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">Today's Load</span>
                      <p className="font-mono mt-0.5">{member.assignedOrdersCount || 0} claimed items</p>
                    </div>

                    <button
                      onClick={() => handleToggleStaffAvailability(member)}
                      className={`px-3 py-1.5 rounded-lg border font-mono text-[9px] font-bold uppercase cursor-pointer transition-all ${
                        member.status === 'active' || member.status === 'busy'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/15'
                          : 'bg-slate-100 dark:bg-black/40 text-slate-400 border-slate-200 dark:border-slate-950 hover:bg-rose-500/10 hover:text-rose-500'
                      }`}
                    >
                      {member.status === 'active' || member.status === 'busy' ? "ON DUTY" : "OFF SHIFT"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 5: SYSTEM PREFERENCE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            
            <div className="border-b border-slate-200 dark:border-slate-900 pb-4">
              <h2 className="text-xl font-bold font-display uppercase tracking-widest text-[#c5a880]">
                ⚙️ Hospitality Platform Settings
              </h2>
              <p className="text-[10px] text-slate-400 font-mono tracking-wide">
                Configure hotel names, room count scales, branding, and alert delays.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Box 1: Hotel settings details */}
                <div className="p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-900 space-y-4 text-xs">
                  <h3 className="font-display font-bold text-sm text-slate-800 dark:text-[#c5a880] uppercase tracking-wider block">
                    1. Hotel Info & Locations
                  </h3>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1.5">Hotel Register Name</label>
                      <input
                        type="text"
                        value={settingsForm.name}
                        onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1.5">Shorthand Branding Abbrev Flag Logo</label>
                      <input
                        type="text"
                        value={settingsForm.logo}
                        onChange={(e) => setSettingsForm({ ...settingsForm, logo: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none font-bold text-center font-display uppercase tracking-wider"
                        maxLength={2}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1.5">Core Address</label>
                      <input
                        type="text"
                        value={settingsForm.address}
                        onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1.5">Total registered Rooms keys</label>
                      <input
                        type="number"
                        value={settingsForm.totalRooms}
                        onChange={(e) => setSettingsForm({ ...settingsForm, totalRooms: Number(e.target.value) })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Box 2: System notification/operation metrics thresholds */}
                <div className="p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-900 space-y-4 text-xs">
                  <h3 className="font-display font-bold text-sm text-slate-800 dark:text-[#c5a880] uppercase tracking-wider block">
                    2. Service SLA Threshold Rules
                  </h3>

                  <div className="space-y-4">
                    <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl space-y-1">
                      <p className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 uppercase font-mono text-[9px]">
                        <Clock className="w-3.5 h-3.5 text-amber-500" /> Active Delay Alarm System
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed font-sans">
                        If preparation of dining orders takes more than **25 Minutes** in the KDS, the system highlights tickets in crimson and prompts alerts in supervisor terminals instantly.
                      </p>
                    </div>

                    <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl space-y-1">
                      <p className="font-bold text-rose-500 flex items-center gap-1.5 uppercase font-mono text-[9px]">
                        <AlertTriangle className="w-3.5 h-3.5" /> High Risk Nudges Escalations
                      </p>
                      <p className="text-[10px] text-slate-405 mt-0.5 leading-relaxed font-sans">
                        If transiting takes more than **30 Minutes**, supervisors receive priority SMS and visual nudges to override status immediately.
                      </p>
                    </div>

                    {/* Simulated download room QR cards */}
                    <div className="p-3 bg-[#c5a880]/10 border border-[#c5a880]/20 rounded-xl space-y-2">
                      <p className="font-bold text-slate-800 dark:text-[#c5a880] flex items-center gap-1.5 uppercase font-mono text-[9px]">
                        <Smartphone className="w-3.5 h-3.5" /> Room QR Generator
                      </p>
                      <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                        Generate and export high-security desktop standees carrying encrypted deep-links for all {settingsForm.totalRooms} rooms.
                      </p>
                      <button
                        type="button"
                        onClick={() => alert(`Simulated high-res PDF generation for ${settingsForm.totalRooms} dynamic QR code cards...`)}
                        className="py-1.5 px-3 rounded-lg bg-slate-950 dark:bg-white text-white dark:text-black font-bold text-[9px] uppercase tracking-wider cursor-pointer"
                      >
                        Export standee QRs (PDF)
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-amber-550 to-amber-600 dark:from-amber-600 dark:to-amber-500 text-white dark:text-black hover:brightness-110 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer flex items-center gap-1.5 transition-transform hover:scale-[1.01]"
                >
                  <Check className="w-4 h-4 text-black dark:text-amber-800 font-black" /> Make Settings Persistent
                </button>
              </div>

            </form>

          </div>
        )}

      </main>

    </div>
  );
}
