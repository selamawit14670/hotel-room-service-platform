import { useState } from 'react';
import { TrendingUp, Clock, AlertTriangle, ShieldCheck, Zap, Coins } from 'lucide-react';

export default function BusinessImpact() {
  // Calculator state
  const [roomKeys, setRoomKeys] = useState(120);
  const [avgOrderVal, setAvgOrderVal] = useState(48);
  const [ordersPerDay, setOrdersPerDay] = useState(35);

  // Constants based on Section 10 metrics
  const revGrowthPct = 0.37; // 37% increase
  const timeReductionPct = 0.52; // 52% reduction
  const errorReductionPct = 0.68; // 68% fewer errors
  const deliveryFulfillmentSpeedPct = 0.45; // 45% faster deliveries
  const staffAdoptionPct = 0.92; // 92% staff adoption rate

  // Calculations
  const currentMonthlyRevenue = ordersPerDay * avgOrderVal * 30;
  const growthMonthlyRevenue = currentMonthlyRevenue * revGrowthPct;
  const growthAnnualRevenue = growthMonthlyRevenue * 12;

  // Saved monthly prep & transcription hours (assuming 8 minutes saved per order)
  const savedPrepMinutesPerOrder = 8;
  const monthlySavedHours = (ordersPerDay * savedPrepMinutesPerOrder * 30 * timeReductionPct) / 60;

  // Prevented errors per year (assuming 4% error rate baseline)
  const annualOrdersCount = ordersPerDay * 365;
  const baselineAnnualErrors = annualOrdersCount * 0.04;
  const preventedAnnualErrors = baselineAnnualErrors * errorReductionPct;

  return (
    <section className="relative py-12 md:py-24 bg-slate-50 dark:bg-black overflow-hidden transition-colors duration-300" id="business-impact">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-slate-100/30 dark:bg-slate-950/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-mono text-luxury-gold bg-luxury-gold/10 border border-luxury-gold/20 mb-3">
            <Coins className="w-4 h-4" /> SaaS ROI Analytics
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            Measurable Outcomes for <br />Hospitality Bottom Lines
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm md:text-base">
            Configure your property details inside our interactive financial model below to estimate the annual revenue growth and labor hours saved by transitioning to RoomServiceOS.
          </p>
        </div>

        {/* Interactive ROI Calculator Cockpit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-[#090b11] border border-slate-200 dark:border-slate-900 p-6 flex flex-col justify-between transition-colors duration-300">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase font-mono tracking-wider mb-6 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                <Zap className="w-4.5 h-4.5 text-luxury-gold" /> Property Parameters
              </h3>

              <div className="space-y-6">
                {/* Sliders 1: Keys */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Hotel Key Count (Rooms):</span>
                    <span className="font-mono font-bold text-luxury-gold">{roomKeys} keys</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="600" 
                    value={roomKeys} 
                    onChange={(e) => {
                      const keys = Number(e.target.value);
                      setRoomKeys(keys);
                      // scale orders per day roughly based on keys with conservative 30% occupancy order rate
                      setOrdersPerDay(Math.max(2, Math.round(keys * 0.3)));
                    }}
                    className="w-full accent-luxury-gold bg-slate-200 dark:bg-slate-950 rounded-lg cursor-pointer h-1.5"
                  />
                </div>

                {/* Slider 2: Average Order Value */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Average Order Spend:</span>
                    <span className="font-mono font-bold text-luxury-gold">${avgOrderVal} USD</span>
                  </div>
                  <input 
                    type="range" 
                    min="15" 
                    max="150" 
                    value={avgOrderVal} 
                    onChange={(e) => setAvgOrderVal(Number(e.target.value))}
                    className="w-full accent-luxury-gold bg-slate-200 dark:bg-slate-950 rounded-lg cursor-pointer h-1.5"
                  />
                </div>

                {/* Slider 3: Orders Per Day */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Orders Placed Per Day:</span>
                    <span className="font-mono font-bold text-luxury-gold">{ordersPerDay} orders</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="200" 
                    value={ordersPerDay} 
                    onChange={(e) => setOrdersPerDay(Number(e.target.value))}
                    className="w-full accent-luxury-gold bg-slate-200 dark:bg-slate-950 rounded-lg cursor-pointer h-1.5"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 p-3.5 bg-slate-50 dark:bg-black/60 border border-slate-100 dark:border-slate-950 rounded-xl text-[10px] text-slate-500 font-mono leading-relaxed">
              *Calculations are formulated in compliance with audited B2B client outcomes (50 keys to 500 keys) across our active premium hotel networks.
            </div>
          </div>

          {/* ROI Outputs Column */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Added Annual revenue card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#090b11] border border-slate-200 dark:border-slate-900 flex flex-col justify-between hover:border-luxury-gold/25 transition-colors duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-505 dark:text-slate-500 block">Annual Dining Surge</span>
                <h4 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-display mt-1">
                  +${growthAnnualRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-4 leading-normal font-sans">
                Equivalent to a <b className="text-luxury-gold">37% net increase</b> in room dining profits, driven by high-margin upsells and visual food photo menus.
              </p>
            </div>

            {/* Saved labor hours */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#090b11] border border-slate-200 dark:border-slate-900 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-800 transition-colors duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-550 dark:text-orange-400 mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-550 dark:text-slate-500 block">Saved Operation Hours</span>
                <h4 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-display mt-1">
                  {monthlySavedHours.toFixed(0)} Hours Saved
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-4 leading-normal font-sans">
                A massive <b className="text-orange-500 dark:text-orange-400">52% recovery of work</b> for front-desk receptionists and kitchen coordinators by automating order intake routines.
              </p>
            </div>

            {/* Averted order mistakes */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#090b11] border border-slate-200 dark:border-slate-900 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-800 transition-colors duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 mb-4">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-550 dark:text-slate-500 block">Prevented Meal Errors</span>
                <h4 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-display mt-1">
                  {preventedAnnualErrors.toFixed(0)} Mistakes Avoided
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-4 leading-normal font-sans">
                Frictionless option customizers bypass handwritten transcription slips, preventing returned meals by a staggering <b className="text-red-500 dark:text-red-400">68% margin</b>.
              </p>
            </div>

            {/* Staff adoption metrics */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#090b11] border border-slate-200 dark:border-slate-900 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-800 transition-colors duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 dark:text-emerald-400 mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-550 dark:text-slate-500 block">Adoption Score</span>
                <h4 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-display mt-1">
                  92% Staff Adoption
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-4 leading-normal font-sans">
                Highly intuitive visual interfaces require <b className="text-emerald-550 dark:text-emerald-400">less than 15 minutes</b> of induction training for cook lists and couriers alike.
              </p>
            </div>

          </div>

        </div>

        {/* Business Impact Statistics Dashboard Grid */}
        <div className="p-1 px-4 rounded-3xl border border-slate-200 dark:border-slate-920 bg-white/40 dark:bg-neutral-950/20 grid grid-cols-2 md:grid-cols-5 gap-6 text-center py-8 transition-colors duration-300">
          {[
            { metric: "+37%", label: "Room Dining Revenue" },
            { metric: "-52%", label: "Order Lead Times" },
            { metric: "-68%", label: "Kitchen Ticket Errors" },
            { metric: "45%", label: "Faster Deliveries" },
            { metric: "92%", label: "Staff Adoption Rate" }
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <span className="text-2xl md:text-4xl font-black font-display text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 block">{stat.metric}</span>
              <span className="text-[10px] uppercase tracking-widest font-mono text-slate-500 block">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
