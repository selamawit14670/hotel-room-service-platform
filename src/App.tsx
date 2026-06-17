import React, { useState } from 'react';
import { 
  Menu, X, Landmark, Briefcase, Mail, Phone, ExternalLink, 
  MapPin, Clock, ShieldCheck, ArrowRight, Video, Sparkles, HelpCircle, 
  Tv, MonitorPlay, Building2, Server, ShieldAlert, Sun, Moon 
} from 'lucide-react';

// Shared State Layer
import { useSharedSystem } from './lib/state';

// Portals and Login
import LoginScreen from './components/LoginScreen';
import GuestPortal from './components/GuestPortal';
import KitchenPortal from './components/KitchenPortal';
import WaiterPortal from './components/WaiterPortal';
import SupervisorPortal from './components/SupervisorPortal';
import AdminPortal from './components/AdminPortal';

// Landing Page Sections
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import LiveInteractiveDemo from './components/LiveInteractiveDemo';
import SectionShowcase from './components/SectionShowcase';
import BusinessImpact from './components/BusinessImpact';
import Testimonials from './components/Testimonials';
import PricingSection from './components/PricingSection';
import FaqSection from './components/FaqSection';
import DemoModal from './components/DemoModal';

export default function App() {
  const {
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
  } = useSharedSystem();

  // 'app' (the live operational hotel system) vs 'marketing' (the B2B SaaS Pitch Site)
  const [viewMode, setViewMode] = useState<'app' | 'marketing'>('app');

  // Landing page utility states
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedPlanForDemo, setSelectedPlanForDemo] = useState<string | undefined>(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Notifications helper
  const [syncAlert, setSyncAlert] = useState<string | null>(null);

  const showSyncNotification = (msg: string) => {
    setSyncAlert(msg);
    setTimeout(() => {
      setSyncAlert(null);
    }, 4000);
  };

  const handleOpenDemo = (planName?: string) => {
    setSelectedPlanForDemo(planName);
    setIsDemoModalOpen(true);
  };

  const handleCloseDemo = () => {
    setIsDemoModalOpen(false);
    setSelectedPlanForDemo(undefined);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleLoginGuestWithNotification = (roomNumber: string, guestName: string, phoneNumber: string) => {
    loginGuest(roomNumber, guestName, phoneNumber);
    showSyncNotification(`Logged in as Guest for Suite ${roomNumber}!`);
  };

  const handleLoginStaffWithNotification = (role: 'kitchen' | 'waiter' | 'supervisor' | 'admin', name: string, waiterId?: string) => {
    loginStaff(role, name, waiterId);
    showSyncNotification(`Staff Terminal Authenticated: ${role.toUpperCase()} Console Active.`);
  };

  return (
    <div className={`transition-colors duration-300 ${theme === 'dark' ? 'dark bg-[#030408]' : 'bg-slate-50'}`}>
      
      {/* -------------------- VIEWPORT MODE 1: LIVE OPERATIONAL HOTEL SYSTEM -------------------- */}
      {viewMode === 'app' && (
        <div className="relative min-h-screen">
          
          {/* Quick Hub & Custom Real-Time WebSocket Connection Control Bar */}
          <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-white/5 py-2.5 px-4 shadow-sm select-none z-50 transition-colors duration-300 text-slate-900 dark:text-slate-100">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 items-center justify-between font-mono text-[11px]">
              
              <div className="flex flex-wrap items-center gap-2.5 text-slate-700 dark:text-slate-300 justify-center">
                <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full flex items-center justify-center relative">
                    <span className={`w-2.5 h-2.5 rounded-full absolute ${
                      connectionStatus === 'connected' ? 'bg-emerald-500' :
                      connectionStatus === 'reconnecting' ? 'bg-amber-500 animate-ping' : 'bg-rose-500'
                    }`}></span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      connectionStatus === 'connected' ? 'bg-emerald-650' :
                      connectionStatus === 'reconnecting' ? 'bg-amber-600' : 'bg-rose-600'
                    }`}></span>
                  </span>
                  RoomServiceOS Terminal
                </span>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                
                {/* Connection Simulator Buttons */}
                <div className="inline-flex gap-1 items-center bg-slate-200/50 dark:bg-black/40 p-0.5 rounded-lg border border-slate-300/30 dark:border-slate-800">
                  <span className="px-1.5 text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400">WS Connection:</span>
                  <button
                    onClick={() => setConnectionStatus('connected')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                      connectionStatus === 'connected'
                        ? 'bg-emerald-500 text-white'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-250'
                    }`}
                  >
                    Online
                  </button>
                  <button
                    onClick={() => setConnectionStatus('reconnecting')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                      connectionStatus === 'reconnecting'
                        ? 'bg-amber-500 text-black'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-250'
                    }`}
                  >
                    Reconnecting
                  </button>
                  <button
                    onClick={() => setConnectionStatus('offline')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                      connectionStatus === 'offline'
                        ? 'bg-rose-500 text-white'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-250'
                    }`}
                  >
                    Offline
                  </button>
                </div>

                {offlineQueue.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold border border-amber-500/20 animate-pulse">
                     📡 {offlineQueue.length} Pending Actions Queued
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setViewMode('marketing');
                    broadcastWSMessage("Switched viewport to presentation landing deck.");
                  }}
                  className="px-3 py-1 rounded-lg bg-amber-500 hover:brightness-105 active:scale-[0.98] text-black font-extrabold uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-sm text-[10px]"
                >
                  <MonitorPlay className="w-3.5 h-3.5" />
                  <span>Show B2B Marketing Pitch Site</span>
                </button>
              </div>

            </div>
          </div>

          {/* Real-time WebSockets Sync alerts floating Toast */}
          {(systemAlert || syncAlert) && (
            <div className="fixed top-14 right-4 z-50 max-w-sm w-full bg-slate-900 border border-amber-500/35 text-white rounded-2xl shadow-2xl p-4 animate-slide-in font-sans">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-500 border border-amber-500/20">
                  <Sparkles className="w-4 h-4 animate-pulse text-amber-500" />
                </div>
                <div className="flex-1 space-y-0.5">
                  <p className="text-[10px] font-mono tracking-widest text-amber-400 font-extrabold uppercase">
                    Live System Synchroniser 📡
                  </p>
                  <p className="text-xs text-slate-100 font-semibold leading-relaxed">
                    {systemAlert || syncAlert}
                  </p>
                  <p className="text-[9px] font-mono text-slate-500">
                    Propagated via websocket broadcast channel.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Render corresponding portal depending on checked guest user session */}
          {session.role === 'none' && (
            <LoginScreen 
              onLoginGuest={handleLoginGuestWithNotification} 
              onLoginStaff={handleLoginStaffWithNotification} 
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          )}

          {session.role === 'guest' && (
            <GuestPortal
              session={session}
              menuItems={menuItems}
              orders={orders}
              theme={theme}
              onToggleTheme={toggleTheme}
              onLogout={logout}
              onPlaceOrder={placeOrder}
            />
          )}

          {session.role === 'kitchen' && (
            <KitchenPortal
              orders={orders}
              theme={theme}
              onToggleTheme={toggleTheme}
              onLogout={logout}
              onUpdateStatus={updateOrderStatus}
            />
          )}

          {session.role === 'waiter' && (
            <WaiterPortal
              session={session}
              orders={orders}
              theme={theme}
              onToggleTheme={toggleTheme}
              onLogout={logout}
              onUpdateStatus={updateOrderStatus}
            />
          )}

          {session.role === 'supervisor' && (
            <SupervisorPortal
              orders={orders}
              staff={staff}
              theme={theme}
              onToggleTheme={toggleTheme}
              onLogout={logout}
              onUpdateOrderStatus={updateOrderStatus}
              onUpdateStaffStatus={updateStaffStatus}
            />
          )}

          {session.role === 'admin' && (
            <AdminPortal
              orders={orders}
              menuItems={menuItems}
              staff={staff}
              settings={settings}
              theme={theme}
              onToggleTheme={toggleTheme}
              onLogout={logout}
              onSaveMenuItem={saveMenuItem}
              onDeleteMenuItem={deleteMenuItem}
              onUpdateStaffMember={updateStaffMember}
              onUpdateHotelSettings={updateHotelSettings}
              onUpdateOrderStatus={updateOrderStatus}
            />
          )}

        </div>
      )}

      {/* -------------------- VIEWPORT MODE 2: B2B PRODUCT MARKETING LANDING PAGE -------------------- */}
      {viewMode === 'marketing' && (
        <div className="bg-slate-50 dark:bg-[#030408] text-slate-900 dark:text-slate-100 min-h-screen relative font-sans leading-normal selection:bg-luxury-gold selection:text-black antialiased transition-colors duration-300">
          
          {/* Header Navigation for Pitch Site */}
          <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-black/70 backdrop-blur-md border-b border-slate-200 dark:border-white/5 select-none transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16 md:h-20">
                
                {/* Brand Logo */}
                <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollToSection('hero')}>
                  <div className="w-8.5 h-8.5 rounded-lg bg-gradient-to-br from-luxury-gold to-luxury-gold-dark flex items-center justify-center text-black font-semibold shadow-inner">
                    <span className="font-display font-extrabold text-sm tracking-tight">R</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-black text-sm tracking-widest text-slate-900 dark:text-[#f8fafc] leading-none uppercase">RoomServiceOS</span>
                    <span className="text-[8px] font-mono text-luxury-gold uppercase tracking-widest leading-none mt-1">B2B HOSPITALITY</span>
                  </div>
                </div>

                {/* Navigation links */}
                <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-slate-600 dark:text-slate-400">
                  <button onClick={() => scrollToSection('hero')} className="hover:text-luxury-gold transition-colors cursor-pointer">Start</button>
                  <button onClick={() => scrollToSection('problem-solutions')} className="hover:text-luxury-gold transition-colors cursor-pointer">Pain Points</button>
                  <button onClick={() => scrollToSection('interactive-platform')} className="hover:text-luxury-gold transition-colors cursor-pointer">Connected Demo</button>
                  <button onClick={() => scrollToSection('showcase-features')} className="hover:text-luxury-gold transition-colors cursor-pointer">Features</button>
                  <button onClick={() => scrollToSection('business-impact')} className="hover:text-luxury-gold transition-colors cursor-pointer">ROI Metrics</button>
                  <button onClick={() => scrollToSection('pricing')} className="hover:text-luxury-gold transition-colors cursor-pointer">Pricing</button>
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                  {/* Global Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-neutral-900 hover:text-amber-500 transition-colors cursor-pointer border border-slate-200 dark:border-slate-850"
                    title="Toggle Theme"
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
                  </button>

                  <button
                    onClick={() => setViewMode('app')}
                    className="bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-900 border border-slate-250 dark:border-slate-800 text-slate-850 dark:text-[#c5a880] text-xs font-mono font-bold py-2 px-5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Server className="w-3.5 h-3.5" /> Launch Operational App
                  </button>
                  <button
                    onClick={() => handleOpenDemo()}
                    className="bg-luxury-gold hover:bg-luxury-gold/90 text-black text-xs font-bold py-2 px-5 rounded-lg transition-colors cursor-pointer shadow-md shadow-luxury-gold/10"
                  >
                    Book Free Demo
                  </button>
                </div>

                {/* Mobile Hamburger toggle */}
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-slate-400 hover:text-luxury-gold transition-colors"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

              </div>
            </div>

            {/* Mobile Navigation Panel */}
            {mobileMenuOpen && (
              <div className="md:hidden bg-[#07090e] border-b border-slate-900 px-4 pt-2 pb-6 space-y-3.5 text-xs font-mono text-slate-400 animate-slide-in">
                <button onClick={() => scrollToSection('hero')} className="block w-full text-left py-2 hover:text-luxury-gold">Start</button>
                <button onClick={() => scrollToSection('problem-solutions')} className="block w-full text-left py-2 hover:text-luxury-gold">Pain Points</button>
                <button onClick={() => scrollToSection('interactive-platform')} className="block w-full text-left py-2 hover:text-luxury-gold">Connected Demo</button>
                <button onClick={() => scrollToSection('showcase-features')} className="block w-full text-left py-2 hover:text-luxury-gold">Features</button>
                <button onClick={() => scrollToSection('business-impact')} className="block w-full text-left py-2 hover:text-luxury-gold">ROI Metrics</button>
                <button onClick={() => scrollToSection('pricing')} className="block w-full text-left py-2 hover:text-luxury-gold">Pricing</button>
                
                <div className="pt-4 flex flex-col gap-2.5">
                  <button
                    onClick={() => {
                      setViewMode('app');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] py-2 rounded-lg text-center font-bold"
                  >
                    Launch Operational App
                  </button>
                  <button
                    onClick={() => handleOpenDemo()}
                    className="w-full bg-luxury-gold text-black font-bold py-2 rounded-lg text-center"
                  >
                    Book Free Demo
                  </button>
                </div>
              </div>
            )}
          </header>

          <main className="relative">
            
            {/* Section 1: Hero Pitch */}
            <HeroSection onOpenDemo={() => handleOpenDemo()} />

            {/* Section 2: Problem statement */}
            <ProblemSection />

            {/* Section 3: Connected Demo warning/redirect section */}
            <section className="relative py-20 bg-black/60 border-y border-slate-900" id="interactive-platform">
              <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase text-[#c5a880] bg-[#c5a880]/10 border border-[#c5a880]/25">
                  <Server className="w-3.5 h-3.5" /> High-Consequences Sandbox Console
                </span>
                
                <h2 className="font-display text-2xl sm:text-3.5xl font-black text-slate-100 tracking-tight leading-snug">
                  Experience The Multi-Role Operational App Directly
                </h2>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
                  To provide the highest-fidelity real-world experience, we have decoupled the simple interactive selector. 
                  You can now operate identical system terminals as an active Room Guest, Chef, Butler, or IT Admin with multi-screen syncs.
                </p>

                <button
                  onClick={() => {
                    setViewMode('app');
                    showSyncNotification("Launching Live Operational Terminals...");
                  }}
                  className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Launch Operations App</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* Section 4: Features categories */}
            <SectionShowcase onOpenDemo={() => handleOpenDemo()} />

            {/* Section 5: Financial Metrics & ROI */}
            <BusinessImpact />

            {/* Section 6: Testimonials */}
            <Testimonials />

            {/* Section 7: Pricing grids */}
            <PricingSection onOpenDemo={handleOpenDemo} />

            {/* Section 8: FAQs */}
            <FaqSection />

            {/* Section 9: Final Call to Action */}
            <section className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center bg-black" id="final-cta">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80" 
                  alt="Luxury hotel facade" 
                  className="w-full h-full object-cover brightness-[0.22] saturate-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
              </div>

              <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase text-[#c5a880] bg-[#c5a880]/10 border border-[#c5a880]/25">
                  <Sparkles className="w-3.5 h-3.5" /> Modernize Your Operation Today
                </span>

                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-slate-101 tracking-tight leading-tight">
                  Ready to Transform Your <br />
                  Hotel Room Service Experience?
                </h2>

                <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                  Deliver unmatched luxury dining experiences, accelerate delivery fulfillment speeds, and generate up to 37% more in-room culinary profit margin immediately.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => handleOpenDemo()}
                    className="w-full sm:w-auto bg-luxury-gold hover:bg-luxury-gold/95 leading-normal text-black font-bold tracking-wide py-3.5 px-8 rounded-xl text-xs cursor-pointer shadow-lg"
                  >
                    Book a Free Demo
                  </button>
                  <button
                    onClick={() => setViewMode('app')}
                    className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100 font-medium py-3.5 px-8 rounded-xl text-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Server className="w-4 h-4 text-[#c5a880]" /> Launch Sandbox Terminals
                  </button>
                </div>
              </div>
            </section>

          </main>

          {/* Footer */}
          <footer className="bg-[#030408] border-t border-slate-900 pt-16 pb-12 relative z-10 text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                <div className="col-span-2 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-luxury-gold flex items-center justify-center text-black font-bold text-sm">
                      <span>R</span>
                    </div>
                    <span className="font-display font-black text-sm tracking-widest text-slate-200">RoomServiceOS</span>
                  </div>
                  <p className="text-[11px] text-slate-500 max-w-sm leading-relaxed font-sans">
                    The premier B2B hospitality dining operating system built specifically for five-star hotels, golf clubs, private serviced suites, and global resort chains to increase average basket values.
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">Solutions</span>
                  <ul className="space-y-2 text-[11px]">
                    <li><button onClick={() => setViewMode('app')} className="hover:text-luxury-gold transition-colors block text-left">Digital Guest Ordering</button></li>
                    <li><button onClick={() => setViewMode('app')} className="hover:text-luxury-gold transition-colors block text-left">Kitchen Display Monitors</button></li>
                    <li><button onClick={() => setViewMode('app')} className="hover:text-luxury-gold transition-colors block text-left">Courier Dispatch Apps</button></li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">Platform</span>
                  <ul className="space-y-2 text-[11px]">
                    <li><button onClick={() => scrollToSection('pricing')} className="hover:text-luxury-gold transition-colors">Pricing Structure</button></li>
                    <li><button onClick={() => scrollToSection('business-impact')} className="hover:text-luxury-gold transition-colors">ROI Calculator</button></li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">Corporate</span>
                  <ul className="space-y-2 text-[11px]">
                    <li><a href="#Privacy" className="hover:text-luxury-gold transition-colors">Privacy Policy</a></li>
                    <li><a href="#Terms" className="hover:text-luxury-gold transition-colors">Terms of Use</a></li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px]">
                <span>&copy; {new Date().getFullYear()} RoomServiceOS Inc. All Luxury Rights Reserved.</span>
              </div>
            </div>
          </footer>

          <DemoModal 
            isOpen={isDemoModalOpen} 
            onClose={handleCloseDemo} 
            selectedPlan={selectedPlanForDemo}
          />

        </div>
      )}

      {/* GLOBAL SYSTEM STATE SYNC ALERT CARD */}
      {syncAlert && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4.5 py-3.5 rounded-2xl border border-amber-500/30 bg-slate-900 text-slate-100 shadow-2xl max-w-md animate-slide-in select-none">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping absolute -top-0.5 -left-0.5" />
          <p className="text-xs font-mono leading-relaxed font-bold">{syncAlert}</p>
        </div>
      )}

    </div>
  );
}
