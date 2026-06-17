import { ArrowRight, Play, Landmark, Star, TrendingUp, Sparkles, Clock } from 'lucide-react';

interface HeroSectionProps {
  onOpenDemo: () => void;
}

export default function HeroSection({ onOpenDemo }: HeroSectionProps) {
  const scrollToDemo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 md:pt-32 pb-16 bg-black overflow-hidden" id="hero">
      
      {/* Absolute Decorative backdrops representing luxury atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-navy-900/60 via-black to-black pointer-events-none"></div>
      
      {/* Decorative Golden Light Ray */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Typographic Columns */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Fine Hotel Crown Badge Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase text-luxury-gold bg-luxury-gold/10 border border-luxury-gold/25 animate-pulse-slow mx-auto lg:mx-0">
              <Landmark className="w-3.5 h-3.5" /> Luxury Hospitality Solutions
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-slate-100 tracking-tight leading-tight">
              The Complete Room Service <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold via-white to-slate-400">
                Operating System
              </span> <br />
              for Modern Luxury Hotels
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Replace rigid old phone order calls with sleek in-room QR digital menus. Streamline kitchen display preparation workflows, expedite delivery timings, and monitor property-wide service level margins in real time from one unified cloud ecosystem.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenDemo}
                className="w-full sm:w-auto bg-linear-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-dark hover:brightness-115 active:scale-[0.98] text-black font-semibold tracking-wide py-3.5 px-8 rounded-xl text-sm transition-all shadow-lg shadow-luxury-gold/15 flex items-center justify-center gap-2 cursor-pointer"
                id="hero-book-demo-btn"
              >
                Book a Free Demo <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => scrollToDemo('interactive-platform')}
                className="w-full sm:w-auto bg-slate-900/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-medium py-3.5 px-8 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="hero-tour-btn"
              >
                <Play className="w-4 h-4 fill-current text-slate-400" /> Watch Live Simulator
              </button>
            </div>

            {/* Micro Validation Badges */}
            <div className="pt-6 flex flex-wrap justify-center lg:justify-start items-center gap-6 border-t border-slate-900/60 mt-8">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-mono text-slate-500">4.92/5.00 Guest Score</span>
              </div>
              <div className="h-4 w-px bg-slate-900 hidden sm:block"></div>
              <div className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Opera & Oracle PMS Compatible
              </div>
              <div className="h-4 w-px bg-slate-900 hidden sm:block"></div>
              <div className="text-xs font-mono text-slate-500">
                PCI Compliance Verified
              </div>
            </div>

          </div>

          {/* Luxury Mockup Device Columns */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[340px] md:max-w-[380px] rounded-3xl border border-slate-900 bg-neutral-950 p-4 shadow-2xl shadow-indigo-950/20 glow-gold overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 blur-xl rounded-full"></div>
              
              {/* Fake Luxury Room Poster Banner */}
              <div className="relative rounded-2xl overflow-hidden h-48 bg-slate-900 border border-slate-850">
                <img 
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80" 
                  alt="Luxury Suite Room Dining" 
                  className="w-full h-full object-cover brightness-[0.6] group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono tracking-widest text-luxury-gold uppercase">
                  Suite 412
                </div>

                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-normal">Welcome to Grand Ritz Resort</span>
                  <h4 className="font-display text-lg font-bold text-white tracking-tight">Imperial Room Dining</h4>
                </div>
              </div>

              {/* Simulated Mobile Mockup Item Menu Grid */}
              <div className="mt-4 space-y-2.5">
                {[
                  { name: "A5 Wagyu Beef Prime Burger", desc: "Served with gold-dusted skin fries", price: "$42.00", badge: "Chef Special" },
                  { name: "Black Truffle Normandy Tagliolini", desc: "Shaved forest Périgord truffles", price: "$48.00" },
                  { name: "Crimson Smoked French Martini", desc: "Premium Woodsmoke cocktail layer", price: "$24.00" }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-[#0a0d14] hover:bg-[#101420] transition-colors rounded-xl border border-slate-900 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-200">{item.name}</span>
                        {item.badge && (
                          <span className="px-1 text-[8px] font-mono font-bold bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/10 rounded">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] text-slate-500 block">{item.desc}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-luxury-gold">{item.price}</span>
                  </div>
                ))}
              </div>

              {/* Fast Checkout QR Trigger simulator button */}
              <button 
                onClick={() => scrollToDemo('interactive-platform')}
                className="mt-4 w-full py-2.5 bg-luxury-gold hover:bg-luxury-gold/90 text-black font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                id="hero-mockup-order-trigger"
              >
                <Sparkles className="w-3.5 h-3.5" /> Order Simulated Wagyu
              </button>
            </div>

            {/* Suspended Dashboard Highlights / Telemetry Ornaments */}
            <div className="absolute -top-6 -left-6 md:-left-12 p-3 bg-black/80 backdrop-blur-md border border-slate-900 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] text-slate-500 uppercase font-mono block">Dining Revenue</span>
                <span className="text-sm font-bold text-emerald-400 font-display">+37% Avg Volume</span>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 md:-right-10 p-3 bg-black/80 backdrop-blur-md border border-slate-900 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] text-slate-500 uppercase font-mono block font-normal">Delivery Cycle</span>
                <span className="text-sm font-bold text-orange-400 font-display">-52% Dispatch Time</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
