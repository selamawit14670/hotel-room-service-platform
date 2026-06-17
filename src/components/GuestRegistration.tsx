import React, { useState } from 'react';
import { Landmark, Sparkles, Sun, Moon, ArrowRight, User, Smartphone, DoorOpen } from 'lucide-react';

interface GuestRegistrationProps {
  onRegister: (roomNumber: string, guestName: string, phoneNumber: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function GuestRegistration({ onRegister, theme, onToggleTheme }: GuestRegistrationProps) {
  const [roomNumber, setRoomNumber] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('room') || '';
  });
  const [guestName, setGuestName] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('name') || params.get('guestName') || '';
  });
  const [phoneNumber, setPhoneNumber] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('phone') || params.get('phoneNumber') || '';
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!roomNumber.trim()) {
      setError('Room or Suite number is required.');
      return;
    }

    if (!guestName.trim()) {
      setError('Please provide your registered guest name.');
      return;
    }

    if (!phoneNumber.trim()) {
      setError('Mobile phone number is required.');
      return;
    }

    // Comprehensive phone format check: must contain at least 7 digits, allow +, spaces, dashes, parentheses
    const cleanPhone = phoneNumber.replace(/[\s\-()]/g, '');
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!phoneRegex.test(cleanPhone)) {
      setError('Please enter a valid phone number (at least 7 digits, e.g., +1 (555) 0199 or 555-0199).');
      return;
    }

    onRegister(roomNumber.trim(), guestName.trim(), phoneNumber.trim());
  };

  return (
    <div className="min-h-screen flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#030408] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative select-none font-sans">
      
      {/* Premium Blur Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/5 dark:bg-[#c5a880]/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"></div>

      {/* Standalone Brand Header */}
      <header className="max-w-md w-full mx-auto flex items-center justify-between z-10 py-4 border-b border-slate-200 dark:border-slate-900 transition-colors">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-[#c5a880]/10 border border-amber-500/20 dark:border-[#c5a880]/20 flex items-center justify-center">
            <Landmark className="w-4.5 h-4.5 text-amber-600 dark:text-[#c5a880]" />
          </div>
          <div className="text-left">
            <span className="font-display font-black text-sm uppercase tracking-widest text-slate-800 dark:text-slate-50 leading-none block">
              RoomServiceOS
            </span>
            <span className="text-[8px] font-mono uppercase tracking-widest font-semibold text-amber-600 dark:text-[#c5a880]">
              Belvedere Collection
            </span>
          </div>
        </div>

        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 hover:text-amber-500 hover:dark:bg-black/50 border border-slate-200 dark:border-slate-800 transition-all cursor-pointer flex items-center gap-2 shadow-sm text-xs font-mono font-bold"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-slate-500" />}
            <span className="hidden sm:inline">{theme === 'dark' ? "Light Mode" : "Dark Mode"}</span>
          </button>
        )}
      </header>

      {/* Main Registration Content */}
      <div className="max-w-md w-full mx-auto space-y-8 z-10 my-10">
        
        {/* Intro Greeting */}
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider text-[#c5a880] bg-[#c5a880]/10 border border-[#c5a880]/20 font-bold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> In-Room Dining & Services
          </span>
          <h1 className="text-2xl font-black font-display tracking-tight text-slate-900 dark:text-slate-50">
            Welcome to the Belvedere Suite Portal
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Please register your active suite reservation details below to instantly explore culinary collections and queue premium service requests directly to your room door.
          </p>
        </div>

        {/* Custom standalone Card form */}
        <div className="bg-white dark:bg-neutral-950 rounded-3xl border border-slate-200 dark:border-slate-900 p-6 md:p-8 shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] space-y-6 transition-all duration-300">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Error alerts pane */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/20 text-rose-500 text-xs font-semibold leading-relaxed font-sans">
                ⚠️ {error}
              </div>
            )}

            {/* Field 1: Room Number */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-extrabold flex items-center gap-1.5">
                <DoorOpen className="w-3.5 h-3.5 text-amber-500" /> Suite / Room Number
              </label>
              <input 
                type="text"
                placeholder="e.g. 412 or Penthouse B"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50/50 dark:bg-black/40 text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 focus:outline-hidden text-slate-900 dark:text-white transition-colors"
              />
            </div>

            {/* Field 2: Guest Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-extrabold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-500" /> Guest Name (Registered)
              </label>
              <input 
                type="text"
                placeholder="e.g. Lady Katherine Sterling"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50/50 dark:bg-black/40 text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 focus:outline-hidden text-slate-900 dark:text-white transition-colors"
                autoComplete="name"
              />
            </div>

            {/* Field 3: Phone Number */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-extrabold flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-amber-500" /> Contact Phone Number
              </label>
              <input 
                type="tel"
                placeholder="e.g. +1 (555) 012-3456"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50/50 dark:bg-black/40 text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 focus:outline-hidden text-slate-900 dark:text-white transition-colors"
                autoComplete="tel"
              />
            </div>

            {/* Submit Reservation Action */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold font-sans text-xs uppercase tracking-widest text-black bg-gradient-to-r from-amber-400 via-[#c5a880] to-amber-400 hover:brightness-105 hover:shadow-lg hover:shadow-[#c5a880]/15 active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <span>Verify & Enter Lounge Menu</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

          </form>

          {/* Privacy & Trust info */}
          <div className="text-[10px] font-mono text-slate-400 text-center leading-relaxed border-t border-slate-100 dark:border-slate-900 pt-4 flex-wrap flex justify-center gap-x-2">
            <span>🛡️ Decentrally Encrypted</span>
            <span>•</span>
            <span>⚡ In-room PMS Sync</span>
          </div>

        </div>

      </div>

      {/* Subtle bottom footer info */}
      <footer className="max-w-md w-full mx-auto text-center z-10 py-1 transition-colors">
        <p className="text-[9px] uppercase tracking-widest font-mono text-slate-500">
          Powered by RoomServiceOS v4.2.1 • Managed Security
        </p>
      </footer>

    </div>
  );
}
