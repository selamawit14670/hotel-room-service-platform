import React, { useState } from 'react';
import { 
  KeyRound, Landmark, Shield, HelpCircle, ArrowRight, Sparkles, Smile, 
  Moon, Sun, ChevronLeft, CookingPot, Smartphone, ShieldCheck, Users, Settings 
} from 'lucide-react';

interface LoginScreenProps {
  onLoginGuest: (roomNumber: string, guestName: string, phoneNumber: string) => void;
  onLoginStaff: (role: 'kitchen' | 'waiter' | 'supervisor' | 'admin', username: string, waiterId?: string) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export default function LoginScreen({ onLoginGuest, onLoginStaff, theme = 'dark', onToggleTheme }: LoginScreenProps) {
  const [activeTab, setActiveTab] = useState<'guest' | 'staff'>('guest');

  // Selected station inside the Staff Station tab
  const [selectedStation, setSelectedStation] = useState<'none' | 'kitchen' | 'waiter' | 'supervisor' | 'admin'>('none');

  // Guest inputs (Empty by default)
  const [roomNum, setRoomNum] = useState('');
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [guestError, setGuestError] = useState('');

  // Staff inputs (Empty by default)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [staffError, setStaffError] = useState('');
  
  // Custom dialog notifications
  const [forgotAlert, setForgotAlert] = useState<string | null>(null);

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomNum.trim()) {
      setGuestError('Room number is required.');
      return;
    }
    if (!guestName.trim()) {
      setGuestError('Guest name is required.');
      return;
    }
    if (!phone.trim()) {
      setGuestError('Phone number is required.');
      return;
    }
    setGuestError('');
    onLoginGuest(roomNum.trim(), guestName.trim(), phone.trim());
  };

  const handleStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStaffError('');

    if (selectedStation === 'none') return;

    // Secure mock validation
    // Requires both fields to have content of at least 3 characters
    if (!username.trim()) {
      setStaffError('Please enter your terminal ID.');
      return;
    }
    if (!password) {
      setStaffError('Please enter your access key.');
      return;
    }

    if (username.trim().length < 3) {
      setStaffError('Terminal User ID must be at least 3 characters.');
      return;
    }
    if (password.length < 3) {
      setStaffError('Access Key Passcode must be at least 3 characters.');
      return;
    }

    // Assign specific waiter ID for testing Sofia (st-3) or Marcus (st-4) if waiter
    const waiterId = selectedStation === 'waiter' ? 'st-3' : undefined;
    onLoginStaff(selectedStation, username.trim(), waiterId);
  };

  const handleForgotCredentials = () => {
    setForgotAlert(
      `Credential recovery dispatched. An encrypted verification ticket has been sent to the IT Front-Desk on PMS Channel 4.`
    );
    setTimeout(() => {
      setForgotAlert(null);
    }, 6000);
  };

  const resetStaffPanel = () => {
    setSelectedStation('none');
    setUsername('');
    setPassword('');
    setStaffError('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#030408] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative select-none">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-amber-500/5 dark:bg-[#c5a880]/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"></div>

      {/* Header with quick branding and theme toggle */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between z-10 py-2 border-b border-slate-200/50 dark:border-slate-900">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-[#c5a880]/10 border border-amber-500/20 dark:border-[#c5a880]/20 flex items-center justify-center">
            <Landmark className="w-4 h-4 text-amber-600 dark:text-[#c5a880]" />
          </div>
          <span className="font-display font-black text-xs uppercase tracking-widest text-slate-800 dark:text-slate-100">
            RoomServiceOS
          </span>
        </div>

        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className="p-2.2 rounded-xl bg-white dark:bg-neutral-900 hover:text-amber-500 hover:dark:bg-black/50 border border-slate-200 dark:border-slate-800 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm text-xs font-mono font-bold"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-500" />}
            <span className="hidden sm:inline">{theme === 'dark' ? "Light Mode" : "Dark Mode"}</span>
          </button>
        )}
      </header>

      {/* Centered Auth Card Container */}
      <div className="max-w-md w-full mx-auto space-y-6 z-10 my-8">
        
        {/* Brand Header Text */}
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[9px] font-mono uppercase text-[#c5a880] bg-[#c5a880]/10 border border-[#c5a880]/20 font-bold">
            <Sparkles className="w-3 h-3 animate-pulse" /> Unified Operations Login
          </span>
          <h1 className="text-xl font-bold font-display tracking-tight text-slate-900 dark:text-slate-50">
            Select Your Workspace Station
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
            Register as a penthouse roomguest or authenticate securely into professional staff delivery terminals.
          </p>
        </div>

        {/* Global Level 1 Tab Selector: Guest vs Staff */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-200/60 dark:bg-neutral-900/80 border border-slate-300/40 dark:border-slate-800/40 shadow-inner">
          <button
            onClick={() => {
              setActiveTab('guest');
              resetStaffPanel();
            }}
            className={`py-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'guest'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-md font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Smile className="w-4 h-4" /> Guest Portal Entrance
          </button>
          
          <button
            onClick={() => {
              setActiveTab('staff');
              resetStaffPanel();
            }}
            className={`py-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'staff'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-md font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Shield className="w-4 h-4" /> Professional Station
          </button>
        </div>

        {/* Guest Registration Segment */}
        {activeTab === 'guest' && (
          <div className="bg-white dark:bg-neutral-950/80 border border-slate-200 dark:border-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-900 pb-4">
              <span className="text-[10px] font-mono tracking-widest text-[#c5a880] font-bold uppercase block">
                IN-ROOM DINING DIRECT PORTAL
              </span>
              <h2 className="text-lg font-bold font-display text-slate-800 dark:text-slate-200 mt-0.5">
                Register Room Suite
              </h2>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                All fields are fully editable. Please enter your room details to browse.
              </p>
            </div>

            <form onSubmit={handleGuestSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 font-bold">
                  Room or Suite Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 304"
                  value={roomNum}
                  onChange={(e) => setRoomNum(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-205 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 dark:text-white"
                  maxLength={6}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 font-bold">
                  Primary Guest Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lord Julian Sterling"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-205 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 font-bold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +33 6 40 12"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-205 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 dark:text-white"
                />
              </div>

              {guestError && (
                <p className="text-xs text-rose-500 text-center font-medium">
                  ⚠️ {guestError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-105 active:scale-[0.99] font-bold text-xs text-white dark:text-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/10 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Browse Culinary Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Staff Operations Tab Option selection */}
        {activeTab === 'staff' && (
          <div className="space-y-4">
            {selectedStation === 'none' ? (
              // STEP 1: Choose which specific Staff Portal to login to
              <div className="bg-white dark:bg-neutral-950/80 border border-slate-200 dark:border-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#c5a880] font-bold uppercase block">
                    ACTIVE HOSPITALITY CONCENTRIC
                  </span>
                  <h2 className="text-lg font-bold font-display text-slate-800 dark:text-slate-200 mt-0.5">
                    Terminal Console Selection
                  </h2>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                    Choose your designated operations station below to verify credentials.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
                  <button
                    onClick={() => setSelectedStation('kitchen')}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-900 hover:border-amber-500 text-left transition-all cursor-pointer bg-slate-50 dark:bg-black/20 group hover:shadow-md"
                  >
                    <div className="p-2 w-8 h-8 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 mb-3 group-hover:scale-105 transition-transform">
                      <CookingPot className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Kitchen KDS</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Chef Dashboard</p>
                  </button>

                  <button
                    onClick={() => setSelectedStation('waiter')}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-900 hover:border-amber-500 text-left transition-all cursor-pointer bg-slate-50 dark:bg-black/20 group hover:shadow-md"
                  >
                    <div className="p-2 w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Waiter Dispatch</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Courier Mobile</p>
                  </button>

                  <button
                    onClick={() => setSelectedStation('supervisor')}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-900 hover:border-amber-500 text-left transition-all cursor-pointer bg-slate-50 dark:bg-black/20 group hover:shadow-md"
                  >
                    <div className="p-2 w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-3 group-hover:scale-105 transition-transform">
                      <Users className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Supervisor Hub</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Service Rectifier</p>
                  </button>

                  <button
                    onClick={() => setSelectedStation('admin')}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-900 hover:border-amber-500 text-left transition-all cursor-pointer bg-slate-50 dark:bg-black/20 group hover:shadow-md"
                  >
                    <div className="p-2 w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 mb-3 group-hover:scale-105 transition-transform">
                      <Settings className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100">IT Admin Console</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Enterprise Control</p>
                  </button>
                </div>
              </div>
            ) : (
              // STEP 2: Dedicated login screen for the selected station! Empty fields by default!
              <div className="bg-white dark:bg-neutral-950/80 border border-slate-200 dark:border-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                
                {/* Visual Header displaying active station details */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-900 pb-4">
                  <div>
                    <button 
                      onClick={resetStaffPanel}
                      className="text-[10px] font-mono font-bold text-amber-600 dark:text-luxury-gold hover:underline flex items-center gap-1 cursor-pointer mb-2.5"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Back to Stations
                    </button>
                    <h2 className="text-base font-extrabold font-display uppercase tracking-wider text-slate-800 dark:text-slate-150 leading-tight">
                      {selectedStation.toUpperCase()} STATION LOGIN
                    </h2>
                    <p className="text-[10.5px] text-slate-400 mt-0.5">
                      Please sign in with your credential tokens.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-100 dark:bg-neutral-900 border border-slate-205 dark:border-slate-900 rounded-xl text-amber-500 font-bold text-sm">
                    {selectedStation === 'kitchen' && '👨‍🍳'}
                    {selectedStation === 'waiter' && '🕴️'}
                    {selectedStation === 'supervisor' && '🤵'}
                    {selectedStation === 'admin' && '⚙️'}
                  </div>
                </div>

                <form onSubmit={handleStaffSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 font-bold">
                      Terminal User ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your terminal ID"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-205 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 dark:text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 font-bold">
                      Access Key Passcode
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Enter your access key"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-205 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 dark:text-white font-mono"
                      />
                    </div>
                  </div>

                  {staffError && (
                    <p className="text-xs text-rose-500 border border-rose-550/10 bg-rose-500/5 p-2 rounded-lg text-center font-medium">
                      ⚠️ {staffError}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-3 px-4 bg-slate-900 dark:bg-white text-white dark:text-black hover:brightness-110 active:scale-[0.99] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <KeyRound className="w-4 h-4 text-amber-500" />
                      <span>Sign In</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleForgotCredentials}
                      className="py-3 px-4 border border-slate-205 dark:border-slate-800 hover:border-rose-500/50 hover:bg-rose-500/5 text-slate-500 hover:text-rose-500 transition-all font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                    >
                      Forgot Credentials
                    </button>
                  </div>
                </form>

                {forgotAlert && (
                  <div className="p-3 border border-red-500/25 bg-red-500/5 text-slate-500 dark:text-slate-400 text-[10.5px] font-mono leading-relaxed rounded-xl text-center">
                    📢 {forgotAlert}
                  </div>
                )}

                <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-[10px] font-mono leading-relaxed text-slate-500 dark:text-slate-400 text-center">
                  💡 **Staff Test Guidance**: Type any name/passcode (minimum of 3 characters) to test. Emulating live backend APIs securely.
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Persistent System Info Footer */}
      <footer className="max-w-md w-full mx-auto text-center font-mono text-[9.5px] text-slate-400 pt-6">
        🏨 Suite Services Integration Subsystem Active &bull; Multi-Role
      </footer>

    </div>
  );
}
