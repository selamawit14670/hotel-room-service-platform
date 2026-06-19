import React, { useState } from 'react';
import { Landmark, Briefcase, KeyRound, ShieldCheck, CookingPot, Smartphone, Users, ArrowRight, Sun, Moon } from 'lucide-react';
import { AuthService } from '../services/authService';

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
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

    try {
      setLoading(true);
      const result = await AuthService.login(username.trim(), password);
      const serverRole = result.user.role.toLowerCase();

      // Check role assignment boundaries
      if (serverRole !== station) {
        AuthService.clearSession();
        setError(`Access Restriction: Account assigned role (${result.user.role}) is designated for the ${result.user.role} station, not ${station.toUpperCase()}.`);
        return;
      }

      // Set designated courier id for Marcus/Sofia if waiter
      const waiterId = station === 'waiter' ? result.user.id : undefined;
      onLoginStaff(station, result.user.name, waiterId);
    } catch (err: any) {
      setError(err.message || 'Verification on the dispatched station failed. Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 bg-brand-bg-light dark:bg-brand-bg-dark text-brand-text-light dark:text-brand-text-dark transition-colors duration-300 relative select-none font-sans">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-luxury-gold/5 dark:bg-luxury-gold/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-luxury-gold-dark/5 blur-3xl pointer-events-none"></div>

      {/* Header */}
      <header className="max-w-md w-full mx-auto flex items-center justify-between z-10 py-4 border-b border-brand-border-light dark:border-brand-border-dark transition-colors">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-luxury-gold/10 dark:bg-luxury-gold/15 border border-luxury-gold/20 flex items-center justify-center">
            <Landmark className="w-4.5 h-4.5 text-luxury-gold-dark dark:text-luxury-gold" />
          </div>
          <div className="text-left">
            <span className="font-display font-bold text-sm uppercase tracking-widest text-[#1E2A25] dark:text-[#F5F1E8] leading-none block">
              RoomServiceOS
            </span>
            <span className="text-[8px] font-mono uppercase tracking-widest font-bold text-luxury-gold-dark dark:text-luxury-gold">
              Staff Dispatch Portal
            </span>
          </div>
        </div>

        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl bg-brand-surface-light dark:bg-brand-surface-dark hover:text-luxury-gold hover:dark:bg-brand-surface-dark/90 border border-brand-border-light dark:border-brand-border-dark transition-all cursor-pointer flex items-center gap-2 shadow-xs text-xs font-mono font-bold"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-luxury-gold" /> : <Moon className="w-4.5 h-4.5 text-luxury-gold-dark" />}
            <span className="hidden sm:inline">{theme === 'dark' ? "Light" : "Dark"}</span>
          </button>
        )}
      </header>

      {/* Content */}
      <div className="max-w-md w-full mx-auto space-y-8 z-10 my-10">
        
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider text-luxury-gold-dark dark:text-luxury-gold bg-luxury-gold/10 dark:bg-[#122B24] border border-[#B38B4D]/25 dark:border-[#C8A86B]/25 font-bold">
            <Briefcase className="w-3.5 h-3.5" /> Hotel Staff Authentication
          </span>
          <h1 className="text-2xl font-medium font-display tracking-tight text-[#1E2A25] dark:text-[#F5F1E8]">
            Log In to Dispatch Desk
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-sans">
            Select your assigned desk station and enter your PMS active security keys to open direct tower connection links.
          </p>
        </div>

        <div className="bg-brand-surface-light dark:bg-brand-surface-dark rounded-3xl border border-brand-border-light dark:border-brand-border-dark p-6 md:p-8 shadow-xl space-y-6 transition-all duration-300">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/20 text-rose-500 text-xs font-semibold">
                ⚠️ {error}
              </div>
            )}

            {/* Station Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#B38B4D] dark:text-[#C8A86B] font-bold">
                Select Active Desk Station
              </label>
              
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => { setStation('kitchen'); setError(''); }}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    station === 'kitchen'
                      ? 'bg-luxury-gold/15 border-luxury-gold text-luxury-gold-dark dark:text-luxury-gold font-bold'
                      : 'border-brand-border-light dark:border-brand-border-dark hover:border-luxury-gold bg-brand-bg-light/50 dark:bg-[#122B24]/20 text-slate-500 dark:text-slate-400'
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
                      ? 'bg-luxury-gold/15 border-luxury-gold text-luxury-gold-dark dark:text-luxury-gold font-bold'
                      : 'border-brand-border-light dark:border-brand-border-dark hover:border-luxury-gold bg-brand-bg-light/50 dark:bg-[#122B24]/20 text-slate-500 dark:text-slate-400'
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
                      ? 'bg-luxury-gold/15 border-luxury-gold text-luxury-gold-dark dark:text-luxury-gold font-bold'
                      : 'border-brand-border-light dark:border-brand-border-dark hover:border-luxury-gold bg-brand-bg-light/50 dark:bg-[#122B24]/20 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <Users className="w-5 h-5 mb-1.5" />
                  <span className="text-[10px] font-bold">Supervisor</span>
                  <span className="text-[8px] opacity-70">Audit Desk</span>
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4 pt-1 font-sans">
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#B38B4D] dark:text-[#C8A86B] font-bold flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" /> Terminal User ID
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Courier Sofia Lin or Chef Keller"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-light dark:bg-[#122B24]/40 text-sm md:text-xs text-brand-text-light dark:text-brand-text-dark transition-colors focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#B38B4D] dark:text-[#C8A86B] font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Access Code Passcode
                </label>
                <input 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-light dark:bg-[#122B24]/40 text-sm md:text-xs text-brand-text-light dark:text-brand-text-dark transition-colors focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold focus:outline-hidden"
                />
              </div>

            </div>

            <button
              id="staff-login-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl font-bold font-display text-xs uppercase tracking-widest text-white dark:text-[#0B1F1A] bg-brand-text-light hover:bg-[#2c3d35] dark:bg-luxury-gold dark:hover:bg-luxury-gold/90 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer mt-2 shadow-md disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"></span>
                  <span>Verifying Terminal Keys...</span>
                </>
              ) : (
                <>
                  <span>Verify Station Credentials</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

        </div>

      </div>

      <footer className="max-w-md w-full mx-auto text-center z-10 py-1 font-mono">
        <p className="text-[9px] uppercase tracking-widest text-[#B38B4D] dark:text-[#C8A86B] font-bold">
          Terminal Console PMS-V4 • Protected Session
        </p>
      </footer>

    </div>
  );
}
