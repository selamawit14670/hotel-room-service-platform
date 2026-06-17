import React, { useState } from 'react';
import { KeyRound, Landmark, UserCheck, Shield, HelpCircle, ArrowRight, Sparkles, Smile, Tv } from 'lucide-react';
import { PortalType } from '../lib/state';

interface LoginScreenProps {
  onLoginGuest: (roomNumber: string, guestName: string, phoneNumber: string) => void;
  onLoginStaff: (role: 'kitchen' | 'waiter' | 'supervisor' | 'admin', username: string, waiterId?: string) => void;
}

export default function LoginScreen({ onLoginGuest, onLoginStaff }: LoginScreenProps) {
  const [activeTab, setActiveTab] = useState<'guest' | 'staff'>('guest');

  // Guest inputs
  const [roomNum, setRoomNum] = useState('');
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [guestError, setGuestError] = useState('');

  // Staff inputs
  const [staffRole, setStaffRole] = useState<'kitchen' | 'waiter' | 'supervisor' | 'admin'>('kitchen');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [staffError, setStaffError] = useState('');

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
    // Validate credentials
    const validRoles = {
      kitchen: { user: 'kitchen', pass: 'kitchen' },
      waiter: { user: 'waiter', pass: 'waiter' },
      supervisor: { user: 'supervisor', pass: 'supervisor' },
      admin: { user: 'admin', pass: 'admin' }
    };

    const targetUser = username.trim() || staffRole;
    const targetPass = password.trim() || staffRole;

    if (targetUser.toLowerCase() === staffRole && targetPass === staffRole) {
      setStaffError('');
      // Assign specific waiter ID for testing Sofia (st-3) or Marcus (st-4) if waiter
      const waiterId = staffRole === 'waiter' ? 'st-3' : undefined;
      onLoginStaff(staffRole, `staff_${staffRole}`, waiterId);
    } else {
      setStaffError(`Invalid login. Use "${staffRole}" as username and password for testing.`);
    }
  };

  const prefillGuest = (num: string, name: string, ph: string) => {
    setRoomNum(num);
    setGuestName(name);
    setPhone(ph);
    setGuestError('');
  };

  const quickLoginStaff = (role: 'kitchen' | 'waiter' | 'supervisor' | 'admin') => {
    setStaffRole(role);
    setUsername(role);
    setPassword(role);
    setStaffError('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#030408] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative select-none">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/5 dark:bg-[#c5a880]/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 z-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/20 border border-amber-500/20 animate-pulse-slow">
            <Landmark className="w-8 h-8 text-amber-600 dark:text-[#c5a880]" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-widest font-display text-slate-900 dark:text-slate-50 uppercase leading-none">
              RoomServiceOS
            </h1>
            <p className="text-[10px] uppercase font-mono tracking-widest text-amber-600 dark:text-[#c5a880] mt-1.5 font-bold">
              Luxury Hospitality Platform
            </p>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto text-center leading-relaxed font-sans mt-2">
            Experience the real-time operational engine trusted by five-star resorts to synchronize orders, kitchens, and couriers.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-200/60 dark:bg-neutral-900/80 border border-slate-300/40 dark:border-slate-800/40 shadow-inner">
          <button
            onClick={() => setActiveTab('guest')}
            className={`py-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'guest'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-md font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Smile className="w-4 h-4" /> Guest QR Scan
          </button>
          
          <button
            onClick={() => {
              setActiveTab('staff');
              quickLoginStaff('kitchen');
            }}
            className={`py-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'staff'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-md font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Shield className="w-4 h-4" /> Staff Station
          </button>
        </div>

        {/* Guest Tab Room Onboarding */}
        {activeTab === 'guest' ? (
          <div className="bg-white dark:bg-neutral-950/80 border border-slate-200 dark:border-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-900 pb-4">
              <span className="text-[10px] font-mono tracking-widest text-[#c5a880] font-bold uppercase block">
                IN-ROOM DIRECT CONSOLE
              </span>
              <h2 className="text-lg font-bold font-display text-slate-800 dark:text-slate-200 mt-1">
                Guest Room Registration
              </h2>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                Register with your active penthouse or suite room key to browse room service dining.
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
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:text-white"
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
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:text-white"
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
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:text-white"
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
                <span>Browse Dining Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Simulated Live Scan Assist */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-900">
              <span className="text-[10px] font-mono font-bold text-slate-400 block mb-2.5 uppercase">
                ⚙️ Quick Simulator Pre-fills (One-Tap Test)
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => prefillGuest("304", "Lord Julian Sterling", "+33 6 40 12")}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-black/20 hover:border-amber-500 text-left transition-all cursor-pointer"
                >
                  <p className="text-[9px] font-mono text-slate-400">PENTHOUSE</p>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">Room 304</p>
                  <p className="text-[9px] text-[#c5a880] truncate font-sans">Julian Sterling</p>
                </button>
                <button
                  onClick={() => prefillGuest("512", "Lady Elizabeth Windsor", "+44 79 11 02")}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-black/20 hover:border-amber-500 text-left transition-all cursor-pointer"
                >
                  <p className="text-[9px] font-mono text-slate-400">PRESIDENTIAL</p>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">Room 512</p>
                  <p className="text-[9px] text-[#c5a880] truncate font-sans">Lady Elizabeth</p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Staff Operations Station Tab */
          <div className="bg-white dark:bg-neutral-950/80 border border-slate-200 dark:border-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-900 pb-4">
              <span className="text-[10px] font-mono tracking-widest text-[#c5a880] font-bold uppercase block">
                SECURE CREDENTIALS PANEL
              </span>
              <h2 className="text-lg font-bold font-display text-slate-800 dark:text-slate-200 mt-1">
                Staff Terminals Login
              </h2>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                Staff members authentication terminal. Select role and enter details.
              </p>
            </div>

            {/* Fast Role Clicker tabs */}
            <div className="grid grid-cols-4 gap-1.5">
              {(['kitchen', 'waiter', 'supervisor', 'admin'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => quickLoginStaff(r)}
                  className={`py-2 rounded-lg text-[10px] uppercase font-mono tracking-wide transition-all cursor-pointer ${
                    staffRole === r
                      ? 'bg-amber-500 text-white dark:text-black font-bold'
                      : 'bg-slate-100 dark:bg-black/40 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border border-slate-200 dark:border-slate-900'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <form onSubmit={handleStaffSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 font-bold">
                  Terminal User ID
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 font-bold">
                  Access Key Passcode
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-black/40 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:text-white font-mono"
                />
              </div>

              {staffError && (
                <p className="text-xs text-rose-500 text-center font-medium">
                  ⚠️ {staffError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-slate-900 dark:bg-white text-white dark:text-black hover:brightness-110 active:scale-[0.99] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4 text-amber-500" />
                <span>Enter Terminal Console</span>
              </button>
            </form>

            <div className="p-3 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-[10px] font-mono leading-relaxed text-slate-500 dark:text-slate-400 text-center">
              💡 **Staff Test Pro-Tip**: Try selecting role button, which pre-fills credentials (e.g. `kitchen`/`kitchen`), then click **"Enter Terminal Console"**.
            </div>
          </div>
        )}

        <div className="text-center font-mono text-[9px] text-slate-400">
          🏨 System Sync Module Active - Multi-portal synchronized simulation
        </div>

      </div>
    </div>
  );
}
