import React, { useState } from 'react';
import { Landmark, Briefcase, KeyRound, ShieldCheck, CookingPot, Smartphone, Users, ArrowRight, Sun, Moon } from 'lucide-react';

interface StaffLoginProps {
  onLoginStaff: (role: 'kitchen' | 'waiter' | 'supervisor', username: string, waiterId?: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

type StaffStation = 'none' | 'kitchen' | 'waiter' | 'supervisor';

export default function StaffLogin({ onLoginStaff, theme, onToggleTheme }: StaffLoginProps) {
  const [station, setStation] = useState<StaffStation>('none');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (station === 'none') {
      setError('Please select an active dispatch desk station.');
      return;
    }

    if (!username.trim()) {
      setError('Please enter your Terminal User ID.');
      return;
    }

    if (!password) {
      setError('Please enter your secure Access Code Passcode.');
      return;
    }

    if (username.trim().length < 3) {
      setError('Terminal User ID must be at least 3 characters.');
      return;
    }

    if (password.length < 3) {
      setError('Access Code Passcode must be at least 3 characters.');
      return;
    }

    // Set designated courier id for Marcus/Sofia if waiter
    const waiterId = station === 'waiter' ? 'st-3' : undefined;
    onLoginStaff(station, username.trim(), waiterId);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#030408] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative select-none font-sans">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 dark:bg-[#c5a880]/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none"></div>

      {/* Header */}
      <header className="max-w-md w-full mx-auto flex items-center justify-between z-10 py-4 border-b border-slate-200 dark:border-slate-900 transition-colors">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 dark:bg-[#c5a880]/10 border border-cyan-500/20 dark:border-[#c5a880]/20 flex items-center justify-center">
            <Landmark className="w-4.5 h-4.5 text-cyan-500 dark:text-[#c5a880]" />
          </div>
          <div className="text-left">
            <span className="font-display font-black text-sm uppercase tracking-widest text-slate-800 dark:text-slate-50 leading-none block">
              RoomServiceOS
            </span>
            <span className="text-[8px] font-mono uppercase tracking-widest font-semibold text-cyan-600 dark:text-[#c5a880]">
              Staff Dispatch Portal
            </span>
          </div>
        </div>

        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 hover:text-cyan-500 hover:dark:bg-black/50 border border-slate-200 dark:border-slate-800 transition-all cursor-pointer flex items-center gap-2 shadow-sm text-xs font-mono font-bold"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-slate-500" />}
            <span className="hidden sm:inline">{theme === 'dark' ? "Light" : "Dark"}</span>
          </button>
        )}
      </header>

      {/* Content */}
      <div className="max-w-md w-full mx-auto space-y-8 z-10 my-10">
        
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider text-cyan-600 dark:text-[#c5a880] bg-cyan-500/10 dark:bg-[#c5a880]/10 border border-cyan-200 dark:border-[#c5a880]/20 font-bold">
            <Briefcase className="w-3.5 h-3.5 animate-pulse" /> Hotel Staff Authentication
          </span>
          <h1 className="text-2xl font-black font-display tracking-tight text-slate-900 dark:text-slate-50">
            Log In to Dispatch Desk
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Select your assigned desk station and enter your PMS active security keys to open direct tower connection links.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-950 rounded-3xl border border-slate-200 dark:border-slate-900 p-6 md:p-8 shadow-xl space-y-6 transition-all duration-300">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/20 text-rose-500 text-xs font-semibold">
                ⚠️ {error}
              </div>
            )}

            {/* Station Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-extrabold">
                Select Active Desk Station
              </label>
              
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => { setStation('kitchen'); setError(''); }}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    station === 'kitchen'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400'
                      : 'border-slate-250 dark:border-slate-800 hover:border-slate-350 bg-slate-50/50 dark:bg-black/30 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <CookingPot className="w-5 h-5 mb-1.5" />
                  <span className="text-[10px] font-bold">Kitchen</span>
                  <span className="text-[8px] opacity-70">Prepare KDS</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setStation('waiter'); setError(''); }}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    station === 'waiter'
                      ? 'bg-cyan-500/10 border-cyan-500 text-cyan-600 dark:text-cyan-405'
                      : 'border-slate-250 dark:border-slate-800 hover:border-slate-350 bg-slate-50/50 dark:bg-black/30 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mb-1.5" />
                  <span className="text-[10px] font-bold">Waiter</span>
                  <span className="text-[8px] opacity-70">Delivery run</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setStation('supervisor'); setError(''); }}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    station === 'supervisor'
                      ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-slate-250 dark:border-slate-800 hover:border-slate-350 bg-slate-50/50 dark:bg-black/30 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <Users className="w-5 h-5 mb-1.5" />
                  <span className="text-[10px] font-bold">Supervisor</span>
                  <span className="text-[8px] opacity-70">Audit Desk</span>
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4 pt-1">
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-extrabold flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-cyan-500" /> Terminal User ID
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Courier Sofia Lin or Chef Thomas Keller"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50/50 dark:bg-black/40 text-sm md:text-xs text-slate-900 dark:text-white transition-colors focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-extrabold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" /> Access Code Passcode
                </label>
                <input 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50/50 dark:bg-black/40 text-sm md:text-xs text-slate-900 dark:text-white transition-colors focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-hidden"
                />
              </div>

            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-widest text-white bg-slate-900 dark:bg-cyan-600 dark:hover:bg-cyan-500 hover:brightness-105 active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <span>Verify Station Credentials</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

        </div>

      </div>

      <footer className="max-w-md w-full mx-auto text-center z-10 py-1">
        <p className="text-[9px] uppercase tracking-widest font-mono text-slate-500">
          Terminal Console PMS-V4 • Protected Session
        </p>
      </footer>

    </div>
  );
}
