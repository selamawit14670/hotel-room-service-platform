import React, { useState } from 'react';
import { Landmark, Shield, KeyRound, ArrowRight, Sun, Moon, Sparkles } from 'lucide-react';

interface AdminLoginProps {
  onLoginAdmin: (username: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function AdminLogin({ onLoginAdmin, theme, onToggleTheme }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Administrator Username ID is required.');
      return;
    }

    if (!password) {
      setError('Secure Administrative Passcode is required.');
      return;
    }

    if (username.trim().length < 3) {
      setError('Admin Username ID must be at least 3 characters.');
      return;
    }

    if (password.length < 3) {
      setError('Admin Safety Lock Passcode must be at least 3 characters.');
      return;
    }

    onLoginAdmin(username.trim());
  };

  return (
    <div className="min-h-screen flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#030408] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative select-none font-sans">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#c5a880]/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-slate-500/5 blur-3xl pointer-events-none"></div>

      {/* Header */}
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
              Belvedere Executive Office
            </span>
          </div>
        </div>

        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 hover:text-amber-500 hover:dark:bg-black/50 border border-slate-200 dark:border-slate-800 transition-all cursor-pointer flex items-center gap-2 shadow-sm text-xs font-mono font-bold"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-slate-500" />}
            <span className="hidden sm:inline">{theme === 'dark' ? "Light" : "Dark"}</span>
          </button>
        )}
      </header>

      {/* Content */}
      <div className="max-w-md w-full mx-auto space-y-8 z-10 my-10">
        
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider text-[#c5a880] bg-[#c5a880]/10 border border-[#c5a880]/20 font-bold">
            <Shield className="w-3.5 h-3.5 animate-pulse" /> Corporate Administration Lock
          </span>
          <h1 className="text-2xl font-black font-display tracking-tight text-slate-900 dark:text-slate-50">
            Manager Control Gatehouse
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Please present your physical administrator workspace token identity and safety passcode to access key audits, dashboards, and inventories.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-950 rounded-3xl border border-slate-200 dark:border-slate-900 p-6 md:p-8 shadow-xl space-y-6 transition-all duration-300">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/20 text-rose-500 text-xs font-semibold">
                ⚠️ {error}
              </div>
            )}

            <div className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-extrabold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-luxury-gold" /> Administrator ID
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Executive Director Vane"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50/50 dark:bg-black/40 text-sm md:text-xs text-slate-900 dark:text-white transition-colors focus:ring-1 focus:ring-[#c5a880] focus:border-[#c5a880] focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-extrabold flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-luxury-gold" /> Administrative Safety Passcode
                </label>
                <input 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50/50 dark:bg-black/40 text-sm md:text-xs text-slate-900 dark:text-white transition-colors focus:ring-1 focus:ring-[#c5a880] focus:border-[#c5a880] focus:outline-hidden"
                />
              </div>

            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-widest text-black bg-gradient-to-r from-[#c5a880] via-amber-400 to-[#c5a880] hover:brightness-105 active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <span>Unlock Admin Desk</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

          </form>

        </div>

      </div>

      <footer className="max-w-md w-full mx-auto text-center z-10 py-1">
        <p className="text-[9px] uppercase tracking-widest font-mono text-slate-500">
          Authorized Terminal Section • Strictly Managed Access • Root Console
        </p>
      </footer>

    </div>
  );
}
