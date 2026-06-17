import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Landmark, Briefcase, Mail, Phone, ExternalLink, 
  MapPin, Clock, ShieldCheck, ArrowRight, Video, Sparkles, HelpCircle, 
  Tv, MonitorPlay, Building2, Server, ShieldAlert, Sun, Moon 
} from 'lucide-react';

// Shared State Layer
import { useSharedSystem } from './lib/state';

// Portals and Login
import GuestRegistration from './components/GuestRegistration';
import StaffLogin from './components/StaffLogin';
import AdminLogin from './components/AdminLogin';
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

function StaffRedirect({ target }: { target: string }) {
  React.useEffect(() => {
    window.history.pushState({}, '', target);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, [target]);

  return (
    <div className="min-h-screen flex items-center justify-center font-sans bg-slate-50 dark:bg-[#030408] text-slate-800 dark:text-slate-100">
      <div className="text-center space-y-3">
        <span className="h-6 w-6 rounded-full border-2 border-amber-500 border-t-transparent animate-spin inline-block"></span>
        <p className="font-mono text-xs text-slate-550">Authenticating terminal workspace, please wait...</p>
      </div>
    </div>
  );
}

function NotFoundPage({ theme, onNavigate }: { theme: 'light' | 'dark'; onNavigate: (to: string) => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center font-sans bg-slate-50 dark:bg-[#030408] text-slate-800 dark:text-slate-100 p-6">
      <div className="max-w-md w-full text-center space-y-5 p-8 rounded-3xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-900 shadow-xl">
        <span className="text-4xl text-amber-500 block">🔍</span>
        <h2 className="font-display font-black text-lg uppercase tracking-wide">404 - Station Not Found</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          The requested operational workspace station could not be resolved or found.
        </p>
        <button
          onClick={() => onNavigate('/')}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-[#c5a880] text-white dark:text-black font-bold text-xs rounded-xl cursor-pointer"
        >
          Return to Guest Landing
        </button>
      </div>
    </div>
  );
}

function AccessDeniedRedirect({ requiredRole, target }: { requiredRole: string; target: string }) {
  const [countdown, setCountdown] = React.useState(3);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    if (countdown <= 0) {
      window.history.pushState({}, '', target);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, [countdown, target]);

  return (
    <div className="min-h-screen flex items-center justify-center font-sans bg-slate-50 dark:bg-[#030408] text-slate-955 dark:text-slate-100 p-6">
      <div className="max-w-md w-full text-center space-y-4 p-8 rounded-3xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-slate-900 shadow-xl">
        <span className="text-4xl text-rose-500 block">⚠️</span>
        <h2 className="font-display font-black text-lg text-rose-500 uppercase tracking-wide">Access Restricted</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Your active browser session does not have the workspace clearance key to view this protected station ({requiredRole.toUpperCase()} Console).
        </p>
        <p className="text-[10px] text-slate-400 font-mono">
          Redirecting to operational gateway desk in {countdown} seconds...
        </p>
        <button
          onClick={() => {
            window.history.pushState({}, '', target);
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}
          className="mt-2 w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-[#c5a880] text-white dark:text-black font-bold text-xs rounded-xl cursor-pointer"
        >
          Go to Sign In
        </button>
      </div>
    </div>
  );
}

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

  // Simple client-side router for clean URL routing
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname || '/';
  });

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setCurrentPath(to);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
    showSyncNotification(`Workspace registered: Welcome to Suite ${roomNumber}! Opening Belvedere Dining Menu...`);
    navigate('/guest');
  };

  const handleLoginStaffWithNotification = (role: 'kitchen' | 'waiter' | 'supervisor' | 'admin', username: string, waiterId?: string) => {
    loginStaff(role, username, waiterId);
    showSyncNotification(`Terminal Connected: ${role.toUpperCase()} Workspace Active.`);
    if (role === 'kitchen') navigate('/kitchen');
    else if (role === 'waiter') navigate('/waiter');
    else if (role === 'supervisor') navigate('/supervisor');
    else if (role === 'admin') navigate('/admin');
  };

  const handleLogoutWithNotification = (role: string) => {
    logout();
    showSyncNotification(`Session cleared from ${role.toUpperCase()} workspace.`);
    if (role === 'guest') {
      navigate('/guest');
    } else if (role === 'admin') {
      navigate('/admin/login');
    } else {
      navigate('/staff/login');
    }
  };

  // Check if current flow is the guest ordering app
  const isGuestFlow = currentPath === '/guest' || currentPath.startsWith('/guest/');

  // Main Route Switch block
  const renderActiveRouteContent = () => {
    // 1. Guest flow
    if (isGuestFlow) {
      if (session.role === 'guest') {
        return (
          <GuestPortal
            session={session}
            menuItems={menuItems}
            orders={orders}
            theme={theme}
            onToggleTheme={toggleTheme}
            onLogout={() => handleLogoutWithNotification('guest')}
            onPlaceOrder={placeOrder}
          />
        );
      } else {
        return (
          <GuestRegistration
            onRegister={handleLoginGuestWithNotification}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        );
      }
    }

    // 2. Staff Login gate (No automatic redirects on visiting login page)
    if (currentPath === '/staff/login') {
      return (
        <StaffLogin
          onLoginStaff={handleLoginStaffWithNotification}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      );
    }

    // 3. Admin Login gate (No automatic redirects on visiting login page)
    if (currentPath === '/admin/login') {
      return (
        <AdminLogin
          onLoginAdmin={(username) => handleLoginStaffWithNotification('admin', username)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      );
    }

    // Legacy Routing Redirect Support
    if (currentPath === '/staff/kitchen') {
      return <StaffRedirect target="/kitchen" />;
    }
    if (currentPath === '/staff/waiter') {
      return <StaffRedirect target="/waiter" />;
    }
    if (currentPath === '/staff/supervisor') {
      return <StaffRedirect target="/supervisor" />;
    }

    // 4. Kitchen Portal - Protected
    if (currentPath === '/kitchen') {
      if (session.role !== 'kitchen') {
        return <AccessDeniedRedirect requiredRole="kitchen" target="/staff/login" />;
      }
      return (
        <KitchenPortal
          orders={orders}
          theme={theme}
          onToggleTheme={toggleTheme}
          onLogout={() => handleLogoutWithNotification('kitchen')}
          onUpdateStatus={updateOrderStatus}
        />
      );
    }

    // 5. Waiter Portal - Protected
    if (currentPath === '/waiter') {
      if (session.role !== 'waiter') {
        return <AccessDeniedRedirect requiredRole="waiter" target="/staff/login" />;
      }
      return (
        <WaiterPortal
          session={session}
          orders={orders}
          theme={theme}
          onToggleTheme={toggleTheme}
          onLogout={() => handleLogoutWithNotification('waiter')}
          onUpdateStatus={updateOrderStatus}
        />
      );
    }

    // 6. Supervisor Portal - Protected
    if (currentPath === '/supervisor') {
      if (session.role !== 'supervisor') {
        return <AccessDeniedRedirect requiredRole="supervisor" target="/staff/login" />;
      }
      return (
        <SupervisorPortal
          orders={orders}
          staff={staff}
          theme={theme}
          onToggleTheme={toggleTheme}
          onLogout={() => handleLogoutWithNotification('supervisor')}
          onUpdateOrderStatus={updateOrderStatus}
          onUpdateStaffStatus={updateStaffStatus}
        />
      );
    }

    // 7. Admin Portal - Protected
    if (currentPath === '/admin') {
      if (session.role !== 'admin') {
        return <AccessDeniedRedirect requiredRole="admin" target="/admin/login" />;
      }
      return (
        <AdminPortal
          orders={orders}
          menuItems={menuItems}
          staff={staff}
          settings={settings}
          theme={theme}
          onToggleTheme={toggleTheme}
          onLogout={() => handleLogoutWithNotification('admin')}
          onSaveMenuItem={saveMenuItem}
          onDeleteMenuItem={deleteMenuItem}
          onUpdateStaffMember={updateStaffMember}
          onUpdateHotelSettings={updateHotelSettings}
          onUpdateOrderStatus={updateOrderStatus}
        />
      );
    }

    // 8. 404 Fallback page for unknown routes
    return <NotFoundPage theme={theme} onNavigate={navigate} />;
  };

  return (
    <div className={`transition-colors duration-300 ${theme === 'dark' ? 'dark bg-[#030408]' : 'bg-slate-50'}`}>
      
      {/* -------------------- VIEWPORT MODE 1: OPERATIONAL APP VIEWPORTS -------------------- */}
      {currentPath !== '/' && (
        <div className="relative min-h-screen">
          
          {/* Quick Hub Terminal Simulator Header (Hidden STRICTLY on guest portal for a pure customer experience) */}
          {!isGuestFlow && (
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
                      navigate('/');
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
          )}

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

          {renderActiveRouteContent()}

        </div>
      )}
      {/* -------------------- VIEWPORT MODE 2: B2B PRODUCT MARKETING LANDING PAGE -------------------- */}
      {currentPath === '/' && (
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
                    onClick={() => navigate('/guest')}
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
                      navigate('/guest');
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
              <div className="max-w-5xl mx-auto px-4 text-center space-y-12">
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase text-[#c5a880] bg-[#c5a880]/10 border border-[#c5a880]/25">
                    <Server className="w-3.5 h-3.5" /> High-Consequences Sandbox Console
                  </span>
                  
                  <h2 className="font-display text-2xl sm:text-3.5xl font-black text-slate-100 tracking-tight">
                    Experience Unified Hotel Terminals in Action
                  </h2>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
                    Evaluate three distinct specialized operating portals simulated with full 2-way server WebSocket updates. Open them in separate tabs to witness real-time order lifecycle synchronization!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  
                  {/* Card 1: Standalone Guest Portal */}
                  <div className="p-6 rounded-2xl bg-neutral-950 border border-slate-900 text-left flex flex-col justify-between space-y-5 hover:border-amber-500/30 transition-all group">
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#c5a880] font-bold">Standalone Customer-Facing</span>
                      <h3 className="text-base font-bold text-slate-200 font-display">Simulated Guest QR Access</h3>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Pure standalone guest flow. Requires Room, Name, and Phone Registration, before letting guests browse, cart, and track orders safely.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigate('/guest');
                        showSyncNotification("Loading Guest Registration Page...");
                      }}
                      className="w-full py-2.5 rounded-xl bg-amber-500 text-black font-extrabold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer hover:brightness-105"
                    >
                      <span>Simulate QR Scan</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card 2: Staff Dispatch Gate */}
                  <div className="p-6 rounded-2xl bg-neutral-950 border border-slate-905 text-left flex flex-col justify-between space-y-5 hover:border-cyan-500/30 transition-all group">
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#93c5fd] font-bold fill-cyan-400">Operational Desks</span>
                      <h3 className="text-base font-bold text-slate-200 font-display">Staff Terminals Login</h3>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Enforce role-based staff routes. Authorize and switch between Kitchen (KDS), Waiter Mobile Dispatch, or Supervisor monitoring desks.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigate('/staff/login');
                        showSyncNotification("Routing to Staff dispatch login desk...");
                      }}
                      className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Staff Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card 3: Administrative Control Hub */}
                  <div className="p-6 rounded-2xl bg-neutral-950 border border-slate-900 text-left flex flex-col justify-between space-y-5 hover:border-indigo-500/35 transition-all group">
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-400 font-bold">Executive Office</span>
                      <h3 className="text-base font-bold text-slate-200 font-display">Executive Manager Gate</h3>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Audit PMS records, modify active cuisine menu pricing list, update operational parameters, and manage employee allocations.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigate('/admin/login');
                        showSyncNotification("Routing to secure Executive gatehouse...");
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#c5a880]/15 hover:bg-[#c5a880]/30 border border-[#c5a880]/20 text-[#c5a880] font-extrabold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Manager Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

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

                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-slate-100 tracking-tight leading-tight">
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
                    onClick={() => navigate('/guest')}
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
                    <div className="w-8.5 h-8.5 rounded-lg bg-luxury-gold flex items-center justify-center text-black font-bold text-sm">
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
                    <li><button onClick={() => navigate('/guest')} className="hover:text-luxury-gold transition-colors block text-left">Digital Guest Ordering</button></li>
                    <li><button onClick={() => navigate('/staff/login')} className="hover:text-luxury-gold transition-colors block text-left">Kitchen Display Monitors</button></li>
                    <li><button onClick={() => navigate('/staff/login')} className="hover:text-luxury-gold transition-colors block text-left">Courier Dispatch Apps</button></li>
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
