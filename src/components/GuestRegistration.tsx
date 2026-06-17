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
    <div className="min-h-screen flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 bg-brand-bg-light dark:bg-brand-bg-dark text-brand-text-light dark:text-brand-text-dark transition-colors duration-300 relative select-none font-sans">
      
      {/* Premium Blur Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-luxury-gold/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-luxury-gold-dark/5 blur-3xl pointer-events-none"></div>

      {/* Standalone Brand Header */}
      <header className="max-w-md w-full mx-auto flex items-center justify-between z-10 py-4 border-b border-brand-border-light dark:border-brand-border-dark transition-colors">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-luxury-gold/15 border border-luxury-gold/20 flex items-center justify-center">
            <Landmark className="w-4.5 h-4.5 text-luxury-gold-dark dark:text-luxury-gold" />
          </div>
          <div className="text-left font-display">
            <span className="font-bold text-sm uppercase tracking-widest text-[#1E2A25] dark:text-[#F5F1E8] leading-none block font-display">
              RoomServiceOS
            </span>
            <span className="text-[8px] font-mono uppercase tracking-widest font-bold text-luxury-gold-dark dark:text-luxury-gold mt-1 block">
              Belvedere Collection
            </span>
          </div>
        </div>

        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl bg-brand-surface-light dark:bg-brand-surface-dark hover:text-luxury-gold border border-brand-border-light dark:border-brand-border-dark transition-all cursor-pointer flex items-center gap-2 shadow-xs text-xs font-mono font-bold"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-luxury-gold" /> : <Moon className="w-4.5 h-4.5 text-luxury-gold-dark" />}
            <span className="hidden sm:inline">{theme === 'dark' ? "Light Mode" : "Dark Mode"}</span>
          </button>
        )}
      </header>

      {/* Main Registration Content */}
      <div className="max-w-md w-full mx-auto space-y-8 z-10 my-10">
        
        {/* Intro Greeting */}
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider text-luxury-gold-dark dark:text-luxury-gold bg-luxury-gold/10 dark:bg-[#122B24] border border-[#B38B4D]/25 dark:border-[#C8A86B]/25 font-bold">
            <Sparkles className="w-3.5 h-3.5" /> In-Room Dining & Services
          </span>
          <h1 className="text-2xl font-medium font-display tracking-tight text-[#1E2A25] dark:text-[#F5F1E8]">
            Welcome to the Belvedere Suite Portal
          </h1>
          <p className="text-xs text-slate-550 dark:text-slate-455 leading-relaxed font-sans">
            Please register your active suite reservation details below to explore culinary collections and queue premium service requests directly to your room door.
          </p>
        </div>

        {/* Custom standalone Card form */}
        <div className="bg-brand-surface-light dark:bg-brand-surface-dark rounded-3xl border border-brand-border-light dark:border-brand-border-dark p-6 md:p-8 shadow-xl space-y-6 transition-all duration-300">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Error alerts pane */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/20 text-rose-500 text-xs font-semibold leading-relaxed font-sans">
                ⚠️ {error}
              </div>
            )}

            {/* Field 1: Room Number */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#B38B4D] dark:text-[#C8A86B] font-bold flex items-center gap-1.5">
                <DoorOpen className="w-3.5 h-3.5" /> Suite / Room Number
              </label>
              <input 
                type="text"
                placeholder="e.g. 412 or Penthouse B"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-light dark:bg-[#122B24]/40 text-sm focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold focus:outline-hidden text-brand-text-light dark:text-brand-text-dark transition-colors font-sans"
              />
            </div>

            {/* Field 2: Guest Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#B38B4D] dark:text-[#C8A86B] font-bold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Guest Name (Registered)
              </label>
              <input 
                type="text"
                placeholder="e.g. Lady Katherine Sterling"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-light dark:bg-[#122B24]/40 text-sm focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold focus:outline-hidden text-brand-text-light dark:text-brand-text-dark transition-colors font-sans"
                autoComplete="name"
              />
            </div>

            {/* Field 3: Phone Number */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#B38B4D] dark:text-[#C8A86B] font-bold flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" /> Contact Phone Number
              </label>
              <input 
                type="tel"
                placeholder="e.g. +1 (555) 012-3456"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-light dark:bg-[#122B24]/40 text-sm focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold focus:outline-hidden text-brand-text-light dark:text-brand-text-dark transition-colors font-sans"
                autoComplete="tel"
              />
            </div>

            {/* Submit Reservation Action */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold font-display text-xs uppercase tracking-widest text-white dark:text-[#0B1F1A] bg-brand-text-light hover:bg-[#2c3d35] dark:bg-luxury-gold dark:hover:bg-luxury-gold/90 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer mt-2 shadow-md"
            >
              <span>Verify & Enter Lounge Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Privacy & Trust info */}
          <div className="text-[10px] font-mono text-[#B38B4D] dark:text-[#C8A86B] text-center leading-relaxed border-t border-brand-border-light dark:border-brand-border-dark pt-4 flex-wrap flex justify-center gap-x-2 font-bold">
            <span>🛡️ Decentrally Encrypted</span>
            <span>•</span>
            <span>⚡ In-room PMS Sync</span>
          </div>

        </div>

      </div>

      {/* Subtle bottom footer info */}
      <footer className="max-w-md w-full mx-auto text-center z-10 py-1 transition-colors font-mono">
        <p className="text-[9px] uppercase tracking-widest text-[#B38B4D] dark:text-[#C8A86B] font-bold">
          Powered by RoomServiceOS v4.2.1 • Managed Security
        </p>
      </footer>

    </div>
  );
}
