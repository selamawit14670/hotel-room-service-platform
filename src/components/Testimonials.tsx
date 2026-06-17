import { Star, Landmark } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section className="relative py-12 md:py-24 bg-[#030408]" id="testimonials">
      {/* Absolute Decorative backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-mono text-luxury-gold bg-luxury-gold/10 border border-luxury-gold/25 mb-3">
            <Landmark className="w-3.5 h-3.5" /> Luxury Hotel Case Studies
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-slate-100 tracking-tight leading-tight">
            Loved by Elite Hoteliers <br />and Operations Directors
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base">
            Discover how five-star resorts and premium serviced penthouses optimize room service yields, save valuable kitchen hours, and refine their luxury guest score ratings.
          </p>
        </div>

        {/* Testimonials Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test) => (
            <div 
              key={test.id} 
              className="p-6 md:p-8 rounded-3xl bg-neutral-950 border border-slate-900 flex flex-col justify-between hover:border-luxury-gold/20 transition-luxury relative group overflow-hidden"
              id={`testimonial-${test.id}`}
            >
              <div>
                {/* Visual Outcome token header */}
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 rounded bg-luxury-gold/10 border border-luxury-gold/15 text-xs font-mono font-bold text-luxury-gold">
                    {test.impactMetrics}
                  </span>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Main Quote block */}
                <p className="text-slate-300 text-sm leading-relaxed font-serif italic font-light">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>

              {/* Author Info footer inside card */}
              <div className="mt-8 pt-6 border-t border-slate-900 flex items-center gap-3.5">
                <img 
                  src={test.imgUrl} 
                  alt={test.author} 
                  className="w-11 h-11 rounded-full object-cover border border-slate-800 flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-200 truncate">{test.author}</h4>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">{test.role}</p>
                  <p className="text-[10px] text-luxury-gold font-mono truncate mt-0.5 uppercase tracking-wide">
                    {test.hotelBrand}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Quick outcome metric ribbons banner */}
        <div className="mt-16 p-4 rounded-2xl border border-slate-900 bg-neutral-950/40 text-xs text-slate-400 text-center font-mono">
          🏆 Trusted across <span className="text-slate-200 font-bold">14,000+ premium keys worldwide</span> to serve luxury dining compliance.
        </div>

      </div>
    </section>
  );
}
