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
    <div className="min-h-screen flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 bg-brand-bg-light dark:bg-brand-bg-dark text-brand-text-light dark:text-brand-text-dark transition-colors duration-300 relative select-none font-sans">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-luxury-gold/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-luxury-gold-dark/5 blur-3xl pointer-events-none"></div>

      {/* Header */}
      <header className="max-w-md w-full mx-auto flex items-center justify-between z-10 py-4 border-b border-brand-border-light dark:border-brand-border-dark transition-colors">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-luxury-gold/15 border border-luxury-gold/20 flex items-center justify-center">
            <Landmark className="w-4.5 h-4.5 text-luxury-gold-dark dark:text-luxury-gold" />
          </div>
          <div className="text-left font-display">
            <span className="font-bold text-sm uppercase tracking-widest text-brand-text-light dark:text-brand-text-dark leading-none block font-display">
              RoomServiceOS
            </span>
            <span className="text-[8px] font-mono uppercase tracking-widest font-bold text-luxury-gold-dark dark:text-luxury-gold mt-1 block">
              Belvedere Executive Office
            </span>
          </div>
        </div>

        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl bg-brand-surface-light dark:bg-brand-surface-dark hover:text-luxury-gold border border-brand-border-light dark:border-brand-border-dark transition-all cursor-pointer flex items-center gap-2 shadow-xs text-xs font-mono font-bold"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-luxury-gold" /> : <Moon className="w-4.5 h-4.5 text-luxury-gold-dark" />}
            <span className="hidden sm:inline">{theme === 'dark' ? "Light" : "Dark"}</span>
          </button>
        )}
      </header>

      {/* Content */}
      <div className="max-w-md w-full mx-auto space-y-8 z-10 my-10">
        
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider text-luxury-gold-dark dark:text-luxury-gold bg-luxury-gold/10 dark:bg-[#122B24] border border-luxury-gold/25 font-bold">
            <Shield className="w-3.5 h-3.5" /> Corporate Administration Lock
          </span>
          <h1 className="text-2xl font-medium font-display tracking-tight text-brand-text-light dark:text-brand-text-dark">
            Manager Control Gatehouse
          </h1>
          <p className="text-xs text-slate-550 dark:text-slate-450 leading-relaxed font-sans">
            Please present your physical administrator workspace token identity and safety passcode to access key audits, dashboards, and inventories.
          </p>
        </div>

        <div className="bg-brand-surface-light dark:bg-brand-surface-dark rounded-3xl border border-brand-border-light dark:border-brand-border-dark p-6 md:p-8 shadow-xl space-y-6 transition-all duration-300">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/20 text-rose-500 text-xs font-semibold">
                ⚠️ {error}
              </div>
            )}

            <div className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#B38B4D] dark:text-[#C8A86B] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-luxury-gold" /> Administrator ID
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Executive Director Vane"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-light dark:bg-brand-bg-dark/40 text-sm md:text-xs text-brand-text-light dark:text-brand-text-dark transition-colors focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#B38B4D] dark:text-[#C8A86B] font-bold flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-luxury-gold" /> Administrative Safety Passcode
                </label>
                <input 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-light dark:bg-brand-bg-dark/40 text-sm md:text-xs text-brand-text-light dark:text-brand-text-dark transition-colors focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold focus:outline-hidden"
                />
              </div>

            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold font-display text-xs uppercase tracking-widest text-white dark:text-[#0B1F1A] bg-brand-text-light hover:bg-[#2c3d35] dark:bg-luxury-gold dark:hover:bg-luxury-gold/90 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer mt-2 shadow-md"
            >
              <span>Unlock Admin Desk</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

        </div>

      </div>

      <footer className="max-w-md w-full mx-auto text-center z-10 py-1 font-mono">
        <p className="text-[9px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold leading-normal">
          Authorized Terminal Section • Strictly Managed Access • Root Console
        </p>
      </footer>

    </div>
  );
}
