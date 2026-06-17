import { useState, Fragment } from 'react';
import { Check, X, ShieldAlert, Award, Star, Landmark, HelpCircle } from 'lucide-react';
import { PRICING_PLANS } from '../data';

interface PricingProps {
  onOpenDemo: (planName?: string) => void;
}

export default function PricingSection({ onOpenDemo }: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  // Matrix categories
  const comparisonMatrix = [
    {
      category: "GUEST EXP MODULE",
    features: [
        { name: "Dynamic QR Guest Menu Builder", starter: "✓ Included", pro: "✓ Included", enterprise: "✓ Custom Brand CSS" },
        { name: "Dietary Modifications & Allergy Alerts", starter: "✓ Included", pro: "✓ Included", enterprise: "✓ Unlimited" },
        { name: "Automatic In-Room Verifications", starter: "Manual Approval required", pro: "✓ Auto Room Match", enterprise: "✓ PMS Database Match" },
        { name: "Custom Typography & Color Overlays", starter: "✘ Not Available", pro: "✓ Co-Branded", enterprise: "✓ Bespoke Custom design" }
      ]
    },
    {
      category: "KITCHEN KDS CONSOLE",
      features: [
        { name: "Kitchen Display System (KDS) access", starter: "1 Terminal", pro: "Up to 5 Terminals", enterprise: "✓ Unlimited Terminals" },
        { name: "Delay Escalation Alarms (>25 min)", starter: "✘ Not Available", pro: "✓ Included", enterprise: "✓ Real-Time Multi-Alert" },
        { name: "Automated Prep Countdown Clocks", starter: "✓ Standard Timers", pro: "✓ Analytics Backed", enterprise: "✓ Fully Automated" },
        { name: "Peak Hour Auto-Counter Adjustment", starter: "✘ Not Available", pro: "✓ Included", enterprise: "✓ Machine Learning Model" }
      ]
    },
    {
      category: "COURIER & STAFF SYSTEMS",
      features: [
        { name: "Fulfillment companion simple tracking", starter: "✓ Included", pro: "✓ Included", enterprise: "✓ Custom Devices Integration" },
        { name: "GPS Corridor Dispatcher", starter: "✘ Not Available", pro: "✓ Corridor Guided", enterprise: "✓ Full GPS Floor Mapping" },
        { name: "Supervisor Real-Time Console Hub", starter: "✘ Not Available", pro: "✓ Included", enterprise: "✓ Central Multi-Resort Hub" }
      ]
    },
    {
      category: "PMS INTEGRATIONS",
      features: [
        { name: "Opera & Oracle PMS Ledger Integration", starter: "✘ Not Available", pro: "✓ Standard Sync", enterprise: "✓ Custom Implementation" },
        { name: "Multi-Hotel Central Management Hub", starter: "✘ Not Available", pro: "✘ Not Available", enterprise: "✓ Central command console" },
        { name: "Onsite Launch Support & Staff Bootcamps", starter: "✘ Not Available", pro: "✓ Digital Videos only", enterprise: "✓ Onsite Teams Setup" }
      ]
    }
  ];

  return (
    <section className="relative py-12 md:py-24 bg-slate-50 dark:bg-black overflow-hidden transition-colors duration-300" id="pricing">
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-navy-950/10 dark:bg-navy-900/40 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-mono text-luxury-gold bg-luxury-gold/10 border border-luxury-gold/25 mb-4">
            <Award className="w-4 h-4" /> Transparent Enterprise Licensing
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            Plans Matched to Your Property Size
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm md:text-base">
            No complex hidden commissions. Choose an straightforward subscription baseline based on your key counts and active operational modules.
          </p>
        </div>

        {/* Annual billing Cycle Toggle switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-slate-900 transition-colors">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-md shadow-slate-200/50 dark:shadow-black/50'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
              }`}
            >
              Bill Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer relative flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-luxury-gold text-black font-bold shadow-md shadow-luxury-gold/20'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
              }`}
            >
              <span>Bill Yearly</span>
              <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono leading-none ${
                billingCycle === 'yearly' ? 'bg-black text-luxury-gold font-bold' : 'bg-luxury-gold/20 text-luxury-gold'
              }`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isPro = plan.badge !== undefined;
            const finalPrice = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;

            return (
              <div
                key={plan.name}
                className={`p-6 md:p-8 rounded-3xl flex flex-col justify-between transition-luxury relative group overflow-hidden ${
                  isPro 
                    ? 'border border-luxury-gold/30 gold-panel glass-panel-gold glow-gold shadow-2xl bg-white dark:bg-neutral-950' 
                    : 'border border-slate-200 dark:border-slate-900 bg-white dark:bg-neutral-950/60 hover:border-slate-300 dark:hover:border-slate-850 shadow-sm dark:shadow-none'
                }`}
                id={`price-card-${plan.name.toLowerCase().replace(/ /g, '-')}`}
              >
                {/* Visual Accent for Recommended Pro option */}
                {isPro && (
                  <div className="absolute top-5 right-5 bg-luxury-gold text-black font-mono font-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded">
                    ⭐ Recommended
                  </div>
                )}

                <div>
                  <span className="text-xs font-mono font-bold uppercase text-slate-500 block">Licensing Package</span>
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">{plan.name}</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-400 text-xs min-h-[42px] leading-relaxed">{plan.description}</p>

                  <div className="my-6 border-y border-slate-100 dark:border-slate-900 py-5">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl md:text-5xl font-black font-display ${isPro ? 'text-luxury-gold' : 'text-slate-900 dark:text-slate-100'}`}>
                        ${finalPrice}
                      </span>
                      <span className="text-slate-500 text-xs font-mono">/ Month</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono block mt-1">
                      Billed {billingCycle === 'yearly' ? 'annually' : 'monthly'} ($
                      {(finalPrice * 12).toLocaleString()} / Property Year)
                    </span>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3.5 mb-8">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block">Operational Scope</span>
                    <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex gap-2.5">
                          <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}

                      {plan.notIncluded.map((feat, idx) => (
                        <li key={idx} className="flex gap-2.5 text-slate-400 dark:text-slate-600">
                          <X className="w-4 h-4 text-slate-400 dark:text-slate-700 mt-0.5 flex-shrink-0" />
                          <span className="line-through leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => onOpenDemo(plan.name)}
                  className={`w-full py-3 text-center font-bold text-xs rounded-xl transition-all cursor-pointer ${
                    isPro 
                      ? 'bg-linear-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-dark hover:brightness-115 text-black' 
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                  id={`cta-btn-${plan.name.toLowerCase().replace(/ /g, '-')}`}
                >
                  Request {plan.name} Setup
                </button>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table Matrix */}
        <div className="mt-20 border border-slate-200 dark:border-slate-900 rounded-3xl bg-white dark:bg-neutral-950 overflow-hidden shadow-md dark:shadow-xl transition-colors duration-300" id="feature-matrix-table">
          <div className="px-6 py-4 bg-slate-50 dark:bg-[#0a0d14] border-b border-slate-200 dark:border-slate-900">
            <h4 className="font-display font-black text-sm text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-2">
              <Landmark className="w-4.5 h-4.5 text-luxury-gold" /> Comprehensive Module Comparison Matrix
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-900 bg-slate-100/50 dark:bg-black/50 text-[10px] font-mono tracking-widest uppercase text-slate-500">
                  <th className="p-4 pl-6 font-semibold">Service Module Feature</th>
                  <th className="p-4 font-semibold">Boutique Starter</th>
                  <th className="p-4 text-luxury-gold font-bold">Luxury Professional</th>
                  <th className="p-4 font-semibold">Resort Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-850/60">
                {comparisonMatrix.map((cat, groupIdx) => (
                  <Fragment key={groupIdx}>
                    <tr className="bg-slate-50 dark:bg-slate-950/70 border-y border-slate-200 dark:border-slate-900">
                      <td colSpan={4} className="p-3 pl-6 font-mono text-[9px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold bg-slate-100 dark:bg-[#080b12]">
                        {cat.category}
                      </td>
                    </tr>
                    {cat.features.map((feat, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
                        <td className="p-4 pl-6 font-medium text-slate-700 dark:text-slate-300">{feat.name}</td>
                        <td className="p-4 text-slate-500 dark:text-slate-400">{feat.starter}</td>
                        <td className="p-4 text-luxury-gold font-semibold">{feat.pro}</td>
                        <td className="p-4 text-indigo-650 dark:text-indigo-300 font-medium">{feat.enterprise}</td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
