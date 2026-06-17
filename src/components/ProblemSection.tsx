import { useState } from 'react';
import { 
  PhoneOff, UtensilsCrossed, ClipboardCheck, Users, BarChart3, 
  AlertTriangle, ChevronRight, CheckCircle2, QrCode, Sparkles, Clock, AlertCircle
} from 'lucide-react';
import { PROBLEM_WORKFLOWS } from '../data';

export default function ProblemSection() {
  const [activeTab, setActiveTab] = useState<'traditional' | 'digital'>('traditional');

  const traditionalPainPoints = [
    {
      num: "01",
      title: "Guests Dread Dialing Reception",
      desc: "Busy queues, static paper menus, language slips, and waiting on hold mean high-end guests simply order food from external delivery riders instead.",
      stat: "83% of guests ignore paper folders"
    },
    {
      num: "02",
      title: "Recurrent Order Mistakes",
      desc: "Receptionists hand-write custom instructions and run them to kitchen pegs. Missing details or dietary allergies translates to returned dishes.",
      stat: "38% of manual tickets have errors"
    },
    {
      num: "03",
      title: "Incoherent Kitchen Workflows",
      desc: "Chefs cook blind without standard sequence timers or notifications. Delays are only detected once angry guests place follow-up calls.",
      stat: "No timing controls for chefs"
    },
    {
      num: "04",
      title: "Fractured Courier Despatches",
      desc: "Waiter staff climb back up stairs simply to check preparation plates. No clear delivery order tracking, leading to cold meals on pathways.",
      stat: "+45% slower fulfillment speeds"
    },
    {
      num: "05",
      title: "Blind Spot Management",
      desc: "Stacking hand-signed restaurant bills. Directors cannot monitor peak ordering periods, popular desserts, or courier response metrics.",
      stat: "0 actionable data insights"
    }
  ];

  const digitalSolutions = [
    {
      num: "01",
      title: "Frictionless Instant QR Menus",
      desc: "Guests scan their bespoke in-room acrylic stand to review a high-resolution menu with real photos and auto-calculated room details.",
      stat: "330% surge in menu clicks"
    },
    {
      num: "02",
      title: "Exact Direct Kitchen Pipelines",
      desc: "Selected options, side substitutions, and custom allergies are routed straight to KDS monitors with clear visual highlights.",
      stat: "Zero transcription errors"
    },
    {
      num: "03",
      title: "Timed KDS Sequence Boards",
      desc: "Every item displays specific prep counters, with automatic, glowing visual flags indicating tickets delayed past 25 minutes.",
      stat: "Auto-escalations for tardiness"
    },
    {
      num: "04",
      title: "Preloaded Courier Notifications",
      desc: "When dishes clear KDS checks, couriers receive automatic sensory notifications to collect meals with optimized building path maps.",
      stat: "Fulfillment cuts by half"
    },
    {
      num: "05",
      title: "Centrally Integrated Analytics",
      desc: "Managers monitor hourly performance, average delivery minutes, highest-selling items, and individual staff ratings instantly.",
      stat: "Fully printable sales reports"
    }
  ];

  const activePoints = activeTab === 'traditional' ? traditionalPainPoints : digitalSolutions;

  return (
    <section className="relative py-12 md:py-24 bg-[#030408]" id="problem-solutions">
      {/* Absolute Gradient Accents */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-red-950/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-cyan-950/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header containing large stat counters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono uppercase text-red-400 bg-red-500/10 border border-red-500/20 mb-3">
              <AlertCircle className="w-3.5 h-3.5" /> Operations Reality Check
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
              Hotels Lose Substantial Revenue <br />
              Through Outdated Room Service
            </h2>
            <p className="mt-4 text-slate-400 text-sm md:text-base max-w-2xl font-normal leading-relaxed">
              Paper guest directories are ignored, dial-in calls create ordering bottlenecks, and kitchen miscommunications waste chef effort. RoomServiceOS replaces legacy manual steps with an instantaneous unified system.
            </p>
          </div>

          {/* Quick Statistic highlight blocks */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-900 bg-neutral-950 text-center">
              <span className="text-3xl font-bold font-sans text-red-500">72%</span>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-mono mt-1.5 leading-tight">Room Service Orders Placed on Paper</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-900 bg-neutral-950 text-center">
              <span className="text-3xl font-bold font-sans text-luxury-gold">+37%</span>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-mono mt-1.5 leading-tight">Rev Surge with QR Menu Engine</p>
            </div>
          </div>
        </div>

        {/* Tab switcher slider */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-xl bg-neutral-950 border border-slate-900">
            <button
              onClick={() => setActiveTab('traditional')}
              className={`px-6 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'traditional'
                  ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              id="tab-traditional"
            >
              Traditional Paper Flow (The Friction)
            </button>
            <button
              onClick={() => setActiveTab('digital')}
              className={`px-6 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'digital'
                  ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              id="tab-digital"
            >
              RoomServiceOS Flow (The Solution)
            </button>
          </div>
        </div>

        {/* Dynamic Comparative Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {activePoints.map((point, i) => (
            <div 
              key={i} 
              className={`p-5 rounded-2xl bg-neutral-955 border ${
                activeTab === 'traditional' 
                  ? 'border-slate-900/40 hover:border-red-500/25 bg-black' 
                  : 'border-slate-900/40 hover:border-luxury-gold/25 bg-[#03060d]'
              } transition-luxury relative group overflow-hidden flex flex-col justify-between`}
            >
              {/* Subtle accent hover lights */}
              <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full blur-xl group-hover:opacity-100 transition-opacity ${
                activeTab === 'traditional' ? 'bg-red-500/5' : 'bg-luxury-gold/5'
              }`}></div>

              <div>
                <span className={`font-mono text-xs font-extrabold tracking-widest block mb-4 ${
                  activeTab === 'traditional' ? 'text-red-500/60' : 'text-luxury-gold/60'
                }`}>
                  {point.num} / STEP
                </span>

                <h3 className="font-display text-sm font-bold text-slate-200 tracking-tight leading-snug">
                  {point.title}
                </h3>
                <p className="mt-2 text-slate-400 text-xs leading-relaxed font-sans">
                  {point.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-900/60 flex items-center justify-between">
                <span className={`text-[10px] font-mono uppercase tracking-wider ${
                  activeTab === 'traditional' ? 'text-red-400' : 'text-emerald-400 font-bold'
                }`}>
                  {point.stat}
                </span>
                
                {activeTab === 'traditional' ? (
                  <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-luxury-gold animate-pulse" />
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
