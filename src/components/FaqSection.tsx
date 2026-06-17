import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../data';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-12 md:py-24 bg-slate-50 dark:bg-[#030408] transition-colors duration-300" id="faqs">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-navy-900/10 dark:bg-navy-900/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-mono text-luxury-gold bg-luxury-gold/10 border border-luxury-gold/25 mb-4">
            <HelpCircle className="w-4 h-4" /> Operational Intelligence
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm">
            Answers concerning integrations, local restaurant printers, setup intervals, and staff coaching programs.
          </p>
        </div>

        {/* Dynamic Accordion list */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen 
                    ? 'bg-white dark:bg-neutral-950 border-luxury-gold/25 shadow-lg shadow-slate-200/50 dark:shadow-black/40' 
                    : 'bg-white/50 dark:bg-neutral-950/40 border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-display font-bold text-sm text-slate-850 dark:text-slate-200 hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer"
                  id={`faq-btn-${idx}`}
                >
                  <span className="pr-4">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  )}
                </button>

                {/* Animated Drawer revealing answer */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-[250px] border-t border-slate-100 dark:border-slate-900' : 'max-h-0'
                  }`}
                  id={`faq-answer-container-${idx}`}
                >
                  <p className="p-6 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-normal">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
