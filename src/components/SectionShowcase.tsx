import { useState } from 'react';
import { 
  QrCode, Smartphone, Sparkles, CheckSquare, Heart, ChefHat, Clock, AlertTriangle, 
  Play, ThumbsUp, ShieldAlert, Truck, Users, Award, Eye, Bell, Activity, 
  TrendingUp, BarChart3, Settings, DollarSign, ArrowRight, CheckCircle2
} from 'lucide-react';

interface ShowcaseProps {
  onOpenDemo: () => void;
}

export default function SectionShowcase({ onOpenDemo }: ShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'guest' | 'kitchen' | 'waiter' | 'supervisor' | 'admin'>('guest');

  const sectionsData = {
    guest: {
      badge: "Section 4 — Guest Experience",
      title: "Elevate the Guest In-Room Dining Experience",
      subtitle: "Replace physical paperwork folders with modern boutique QR ordering. No app downloads required.",
      desc: "Guests scan their personalized room QR code to open an elegant brand-matched mobile web environment showing gorgeous food photography, customization details, and instant digital room charge verification.",
      features: [
        { label: "Seamless scan to browser", desc: "No App Store steps or waiting times" },
        { label: "Bespoke digital menu layout", desc: "Showcase gourmet pictures with item details" },
        { label: "Dietary & allergy adjustments", desc: "Custom instructions direct from guest screen" },
        { label: "Visual automated prep estimating", desc: "Displays timing counters in real time" }
      ],
      benefits: [
        "Surge in average order values (+38%)",
        "Significantly higher guest room dining scores",
        "Zero wait times on front-desk telephone channels"
      ],
      mockTitle: "Guest Room Digital Portal",
      mockBg: "bg-radial from-slate-900 to-black",
      mockContent: (
        <div className="relative mx-auto max-w-[270px] rounded-3xl border border-slate-850 bg-black p-3.5 shadow-xl font-sans text-neutral-200">
          <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-b-xl border-x border-b border-slate-900 z-10"></div>
          
          <div className="text-center pt-2 pb-1.5 border-b border-slate-900">
            <span className="text-[9px] text-slate-500 font-mono tracking-widest uppercase">Suite 412 Order Session</span>
          </div>

          <div className="my-2 p-2 bg-[#080a10] border border-slate-900 rounded-xl space-y-1.5">
            <h5 className="text-[10px] font-bold text-slate-300">Imperial Lobster Tail Roll</h5>
            <p className="text-[8px] text-slate-500 font-normal">Served with handchopped chive butter, hot toasted brioche roll</p>
            
            <div className="flex justify-between items-center pt-1 border-t border-slate-950">
              <span className="text-xs font-mono font-bold text-luxury-gold">$44.00</span>
              <div className="px-1.5 py-0.5 rounded bg-luxury-gold/15 text-[8px] font-mono text-luxury-gold font-bold">In Basket</div>
            </div>
          </div>

          <div className="p-2 border border-[#EF4444]/15 bg-[#EF4444]/5 rounded-xl space-y-1">
            <div className="flex gap-1 items-center text-[9px] text-orange-400 font-medium">
              <Clock className="w-3 h-3 text-orange-400" /> Live Preparation Progress
            </div>
            <p className="text-[8px] text-slate-400">Chef Keller started preparation 6 minutes ago. Estimated arrival in 14 minutes.</p>
          </div>

          <div className="mt-4 pt-1 flex justify-between gap-1">
            <div className="w-full py-1.5 bg-slate-900 hover:bg-slate-850 rounded text-center text-[9px] font-bold tracking-wide text-slate-300">
              Menu Directory
            </div>
            <div className="w-full py-1.5 bg-luxury-gold text-black rounded text-center text-[9px] font-bold tracking-wide">
              Complete Charge
            </div>
          </div>
        </div>
      )
    },
    kitchen: {
      badge: "Section 5 — Kitchen Operations",
      title: "Unify Prep Workflows with Dynamic KDS monitors",
      subtitle: "Eliminate lost paper tickets and disorganized kitchen stations.",
      desc: "Incoming requests route directly to robust Kitchen Display Systems. Chefs sequence preparations logically with color-coded clocks, alerting supervisors and expediting couriers with one-touch completed updates.",
      features: [
        { label: "Automatic delay timers", desc: "No missed timing parameters across shifts" },
        { label: "Dynamic Kanban routing", desc: "Filter by station (Hot grill, drinks, pantry)" },
        { label: "Color alerts (>25 min overdue)", desc: "Tickets color red when preparation lags" },
        { label: "Detailed modifiers", desc: "Allergies highlighted in high-contrast warning bands" }
      ],
      benefits: [
        "Preparation errors plummet by 68%",
        "Drastically improved kitchen efficiency scores",
        "Direct link between chefs and delivery couriers"
      ],
      mockTitle: "Kitchen Display Terminal (KDS)",
      mockBg: "bg-slate-950",
      mockContent: (
        <div className="p-4 rounded-xl bg-neutral-950 border border-red-500/25 max-w-[340px] mx-auto space-y-3 font-mono">
          <div className="flex justify-between items-start border-b border-slate-900 pb-2">
            <div>
              <span className="text-[10px] text-[#EF4444] font-bold animate-pulse">⚠️ ALARM OVERDUE</span>
              <h5 className="text-xs font-bold text-slate-100">ORD-304 &bull; Suite 105</h5>
            </div>
            <span className="text-right text-[10px] text-red-500 font-bold bg-red-950/20 px-1.5 py-0.5 rounded">
              28 Minutes Active
            </span>
          </div>

          <div className="space-y-1.5 text-[10px] text-slate-300">
            <div className="flex justify-between">
              <span>1x Pan-Seared Wagyu Filet Mignon</span>
              <span>Hot Grill</span>
            </div>
            <div className="p-1 px-1.5 rounded bg-red-950/20 text-[#EF4444] text-[9px]">
              🚨 ALLERGY SENSITIVE: Gluten Free Requested
            </div>
          </div>

          <div className="pt-2 border-t border-slate-900 flex justify-between gap-1 text-[9px]">
            <button className="w-full py-1 bg-[#EF4444]/25 hover:bg-[#EF4444]/40 text-red-400 font-bold rounded">
              Escalate Delay
            </button>
            <button className="w-full py-1 bg-emerald-600 text-white font-bold rounded">
              Mark Prepared
            </button>
          </div>
        </div>
      )
    },
    waiter: {
      badge: "Section 6 — Waiter Delivery Management",
      title: "Accelerated In-Room Delivery & Accountability",
      subtitle: "Waiters claim, collect, and dispatch orders directly from their mobile companion app.",
      desc: "No more pacing the hospitality staircase to check if dishes are hot. Couriers check their mobile companion view to instantly claim assignments, retrieve hot boxes, and update delivery completion metrics on corridors.",
      features: [
        { label: "Real-time ready queues", desc: "Instant shelf alerts when cuisine exits KDS checks" },
        { label: "Simple claim-to-courier", desc: "Pinpoint ownership on every dispatched tray" },
        { label: "Frictionless complete log", desc: "Waiters confirm room delivery on hallway walls" },
        { label: "Courier performance ratings", desc: "Calculates transit speeds and guest rating logs" }
      ],
      benefits: [
        "Fulfillment velocity boosted by 45%",
        "Eliminated cold meal delivery complaints",
        "Clear professional work logs for operations teams"
      ],
      mockTitle: "Courier Dispatch Companion",
      mockBg: "bg-neutral-950",
      mockContent: (
        <div className="p-4 rounded-xl border border-slate-900 bg-[#07090f] max-w-[280px] mx-auto space-y-3 font-sans">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-mono">Courier Sofia Lin</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          
          <div className="rounded-xl border border-dashed border-slate-800 p-3 space-y-2 text-[10px] text-slate-400">
            <p className="text-slate-200 font-bold">READY ON SHELF FOR DISPATCH</p>
            <div className="p-2 rounded-lg bg-black border border-slate-900 flex justify-between items-center">
              <div>
                <span className="text-indigo-400 font-bold font-mono">ORD-305</span>
                <span className="block font-bold text-slate-300">Penthouse 801</span>
              </div>
              <button className="px-2 py-1 bg-indigo-600 text-white font-bold rounded text-[8px]">
                Claim Dispatch
              </button>
            </div>
          </div>
        </div>
      )
    },
    supervisor: {
      badge: "Section 7 — Supervisor Oversight Center",
      title: "Real-Time Oversight & Active Delay Alerts",
      subtitle: "Maintain strict luxury dining compliance across thousands of keys.",
      desc: "Supervisors track live performance levels from a central control hub. When any order timers approach warning intervals (e.g. 25 minutes), alerts propagate to the dashboard immediately, allowing direct kitchen nudges and courier relocations.",
      features: [
        { label: "Birds-eye floor monitoring", desc: "Track active room service counts per corridor" },
        { label: "Automated staff assignments", desc: "Distribute delivery tickets seamlessly to idle couriers" },
        { label: "One-click kitchen nudges", desc: "Escalate prep tickets inside kitchens dynamically" },
        { label: "Delay risk alerts", desc: "Pre-empt negative review logs before dishes leave cooking bays" }
      ],
      benefits: [
        "Dramatically reduced guest dispute cases",
        "Full transparent property performance levels",
        "Perfect brand-standard alignment for resort teams"
      ],
      mockTitle: "Supervisor Operations Console",
      mockBg: "bg-radial from-slate-900 to-black",
      mockContent: (
        <div className="p-3.5 rounded-xl bg-black border border-slate-900 max-w-[310px] mx-auto text-xs font-mono space-y-3">
          <div className="flex justify-between items-center border-b border-slate-900 pb-2">
            <span className="text-[10px] text-slate-400">OPERATIONAL FLIGHT MATRIX</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          </div>

          <div className="space-y-2">
            <div className="p-2 rounded bg-neutral-950 border border-red-500/20 text-[9px] text-[#EF4444] flex justify-between items-center">
              <span>⚠️ Room 105: Delayed 28m</span>
              <button className="px-1.5 py-0.5 bg-[#EF4444]/20 hover:bg-[#EF4444]/40 rounded text-[8px] font-bold">
                Nudge Chef
              </button>
            </div>

            <div className="p-2 rounded bg-neutral-950 border border-slate-900 text-[9px] text-slate-400 flex justify-between items-center">
              <span>🍽️ Suite 412: Prep 14m</span>
              <span className="text-slate-600 font-bold">In-Time</span>
            </div>
          </div>
        </div>
      )
    },
    admin: {
      badge: "Section 8 — Admin Analytics Dashboard",
      title: "Data-Driven Culinary Metrics & PMS Sync",
      subtitle: "Turn room dining from a cost center into a premium profit channel.",
      desc: "Unlock extensive business analysis, PMS integrations (Opera, Toast), category yield evaluations, menu adjustment controls, tax configurations, and staff accountability rosters inside one beautiful management desktop hub.",
      features: [
        { label: "PMS ledger integration", desc: "Zero manual billing steps for receptionist teams" },
        { label: "Category yield metrics", desc: "Identify popular high-margin steaks and cocktails" },
        { label: "Staff evaluation matrices", desc: "Track chef cooking timers and waiter delivery metrics" },
        { label: "Bespoke digital design suite", desc: "Alters prices and translations dynamically in seconds" }
      ],
      benefits: [
        "Inherent average revenue expansion (+37%)",
        "Complete automated hospitality auditing capabilities",
        "Substantial reduction in kitchen food wastage parameters"
      ],
      mockTitle: "Admin Financial Suite",
      mockBg: "bg-slate-950",
      mockContent: (
        <div className="p-4 rounded-xl bg-[#090b11] border border-slate-900 max-w-[325px] mx-auto font-sans space-y-3.5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Revenue Ledger</span>
            <span className="px-2 py-0.5 bg-emerald-500/15 text-emerald-400 text-[9px] font-mono rounded">+37.5%</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 rounded-lg bg-black border border-slate-900">
              <span className="text-[8px] font-mono text-slate-600 block">Today&apos;s Sales</span>
              <span className="text-sm font-bold text-slate-200">$1,842.00</span>
            </div>
            <div className="p-2 rounded-lg bg-black border border-slate-900">
              <span className="text-[8px] font-mono text-slate-600 block">Avg Order Value</span>
              <span className="text-sm font-bold text-luxury-gold">$61.40</span>
            </div>
          </div>

          <div className="h-1 bg-slate-900 rounded-full overflow-hidden flex">
            <div className="bg-luxury-gold w-2/3"></div>
            <div className="bg-indigo-600 w-1/3"></div>
          </div>
          <div className="flex justify-between text-[8px] font-mono text-slate-500">
            <span>Main Course (66%)</span>
            <span>Cocktails (33%)</span>
          </div>
        </div>
      )
    }
  };

  const activeSec = sectionsData[activeTab];

  return (
    <section className="relative py-12 md:py-24 bg-neutral-950/20 border-t border-slate-950" id="showcase-features">
      {/* Decorative Ornaments */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-indigo-950/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Tab Switcher */}
        <div className="mb-12 flex flex-wrap justify-center gap-2 border-b border-slate-900 pb-4">
          {[
            { id: 'guest', label: 'Guest Experience' },
            { id: 'kitchen', label: 'Kitchen KDS' },
            { id: 'waiter', label: 'Waiter Delivery' },
            { id: 'supervisor', label: 'Supervisor Control' },
            { id: 'admin', label: 'Admin Analytics' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveTab(btn.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer tracking-wide transition-all ${
                activeTab === btn.id 
                  ? 'bg-luxury-gold text-black shadow-lg shadow-luxury-gold/10' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Dynamic Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="showcase-content-grid">
          
          {/* Text/Details Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold block font-semibold">
                {activeSec.badge}
              </span>
              <h3 className="font-display text-2xl md:text-4xl font-black text-slate-100 tracking-tight leading-tight">
                {activeSec.title}
              </h3>
              <p className="text-slate-400 text-sm md:text-base font-medium">
                {activeSec.subtitle}
              </p>
            </div>

            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              {activeSec.desc}
            </p>

            {/* Features Sub-Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {activeSec.features.map((feat, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <div className="mt-1 flex-shrink-0 w-4 h-4 rounded bg-luxury-gold/15 border border-luxury-gold/30 flex items-center justify-center text-[10px] text-luxury-gold font-bold font-mono">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">{feat.label}</h5>
                    <p className="text-[10px] text-slate-500">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits Banner */}
            <div className="p-4 rounded-xl bg-[#080a13] border border-slate-900 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500 block">SaaS Business Outcomes</span>
              <div className="flex flex-wrap gap-x-6 gap-y-1.5 pt-1">
                {activeSec.benefits.map((ben, i) => (
                  <span key={i} className="text-xs text-slate-300 flex items-center gap-1.5 font-sans font-medium">
                    <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" /> {ben}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenDemo}
                className="inline-flex items-center gap-2 font-mono text-xs text-luxury-gold hover:text-white transition-colors group cursor-pointer"
                id="showcase-cta"
              >
                <span>Request Custom Property Demo</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

          {/* Interactive UI Display Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Ambient luxury backdrop shadow */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/20 to-indigo-950/20 rounded-3xl blur-2xl pointer-events-none"></div>

            <div className="w-full max-w-[400px] rounded-3xl border border-slate-900 bg-neutral-950 p-6 md:p-8 shadow-2xl relative overflow-hidden">
              
              {/* Decorative gold header badge inside panel container */}
              <div className="flex justify-between items-center mb-6 pl-1 border-b border-slate-900 pb-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500">Live Component Preview</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[9px] font-mono text-luxury-gold font-bold">
                  {activeSec.mockTitle}
                </span>
              </div>

              {/* Component Canvas */}
              <div className={`p-4 rounded-2xl border border-slate-900 flex items-center justify-center min-h-[220px] ${activeSec.mockBg}`}>
                {activeSec.mockContent}
              </div>

              <p className="text-center text-[10px] text-slate-600 font-mono mt-4 leading-normal">
                🔐 Fully responsive UI optimized for low-latency tablet KDS and mobile browser grids.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
