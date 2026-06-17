import { useState } from 'react';
import { 
  Menu, X, Landmark, Briefcase, Mail, Phone, ExternalLink, 
  MapPin, Clock, ShieldCheck, ArrowRight, Video, Sparkles, HelpCircle 
} from 'lucide-react';

// Components
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import LiveInteractiveDemo from './components/LiveInteractiveDemo';
import SectionShowcase from './components/SectionShowcase';
import BusinessImpact from './components/BusinessImpact';
import Testimonials from './components/Testimonials';
import PricingSection from './components/PricingSection';
import FaqSection from './components/FaqSection';
import DemoModal from './components/DemoModal';

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedPlanForDemo, setSelectedPlanForDemo] = useState<string | undefined>(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenDemo = (planName?: string) => {
    setSelectedPlanForDemo(planName);
    setIsDemoModalOpen(true);
  };

  const handleCloseDemo = () => {
    setIsDemoModalOpen(false);
    setSelectedPlanForDemo(undefined);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-[#030408] text-slate-100 min-h-screen relative font-sans leading-normal selection:bg-luxury-gold selection:text-black antialiased">
      
      {/* 1. Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/70 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <div className="w-8.5 h-8.5 rounded-lg bg-gradient-to-br from-luxury-gold to-luxury-gold-dark flex items-center justify-center text-black font-semibold shadow-inner">
                <span className="font-display font-extrabold text-sm tracking-tight">R</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-sm tracking-widest text-[#f8fafc] leading-none uppercase">RoomServiceOS</span>
                <span className="text-[8px] font-mono text-luxury-gold uppercase tracking-widest leading-none mt-1">B2B HOSPITALITY</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-slate-400">
              <button onClick={() => scrollToSection('hero')} className="hover:text-luxury-gold transition-colors cursor-pointer">Start</button>
              <button onClick={() => scrollToSection('problem-solutions')} className="hover:text-luxury-gold transition-colors cursor-pointer">Pain Points</button>
              <button onClick={() => scrollToSection('interactive-platform')} className="hover:text-luxury-gold transition-colors cursor-pointer">Live Demo</button>
              <button onClick={() => scrollToSection('showcase-features')} className="hover:text-luxury-gold transition-colors cursor-pointer">Features</button>
              <button onClick={() => scrollToSection('business-impact')} className="hover:text-luxury-gold transition-colors cursor-pointer">ROI Metrics</button>
              <button onClick={() => scrollToSection('pricing')} className="hover:text-luxury-gold transition-colors cursor-pointer">Pricing</button>
              <button onClick={() => scrollToSection('faqs')} className="hover:text-luxury-gold transition-colors cursor-pointer">FAQ</button>
            </nav>

            {/* Header Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => handleOpenDemo()}
                className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-mono font-medium py-2 px-5 rounded-lg transition-colors cursor-pointer"
                id="header-demo-sec-btn"
              >
                Watch Tour
              </button>
              <button
                onClick={() => handleOpenDemo()}
                className="bg-luxury-gold hover:bg-luxury-gold/90 text-black text-xs font-bold py-2 px-5 rounded-lg transition-colors cursor-pointer shadow-md shadow-luxury-gold/10"
                id="header-demo-main-btn"
              >
                Book Free Demo
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-luxury-gold transition-colors"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#07090e] border-b border-slate-900 px-4 pt-2 pb-6 space-y-3.5 text-xs font-mono text-slate-400 animate-slide-in">
            <button onClick={() => scrollToSection('hero')} className="block w-full text-left py-2 hover:text-luxury-gold">Start</button>
            <button onClick={() => scrollToSection('problem-solutions')} className="block w-full text-left py-2 hover:text-luxury-gold">Pain Points</button>
            <button onClick={() => scrollToSection('interactive-platform')} className="block w-full text-left py-2 hover:text-luxury-gold">Live Demo</button>
            <button onClick={() => scrollToSection('showcase-features')} className="block w-full text-left py-2 hover:text-luxury-gold">Features</button>
            <button onClick={() => scrollToSection('business-impact')} className="block w-full text-left py-2 hover:text-luxury-gold">ROI Metrics</button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left py-2 hover:text-luxury-gold">Pricing</button>
            <button onClick={() => scrollToSection('faqs')} className="block w-full text-left py-2 hover:text-luxury-gold">FAQ</button>
            
            <div className="pt-4 flex flex-col gap-2.5">
              <button
                onClick={() => handleOpenDemo()}
                className="w-full bg-slate-900 border border-slate-800 text-slate-300 py-2 rounded-lg text-center"
              >
                Watch Tour
              </button>
              <button
                onClick={() => handleOpenDemo()}
                className="w-full bg-luxury-gold text-black font-bold py-2 rounded-lg text-center"
              >
                Book Free Demo
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Sections flow */}
      <main className="relative">
        
        {/* Section 1: Hero */}
        <HeroSection onOpenDemo={() => handleOpenDemo()} />

        {/* Section 2: Problem statement */}
        <ProblemSection />

        {/* Sections 3 & 9: Dynamic Multi-Portal Simulator Sandbox */}
        <LiveInteractiveDemo />

        {/* Sections 4-8: Category bento showcases */}
        <SectionShowcase onOpenDemo={() => handleOpenDemo()} />

        {/* Section 10: Financial Outcomes & ROI Calculator */}
        <BusinessImpact />

        {/* Section 11: Real Case Studies */}
        <Testimonials />

        {/* Section 12: Pricing grids & Feature comparison lists */}
        <PricingSection onOpenDemo={handleOpenDemo} />

        {/* Section 13: Accordion FAQs */}
        <FaqSection />

        {/* Section 14: Final Call To Action (Visual Hotel Backdrop) */}
        <section className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center bg-black" id="final-cta">
          {/* Visual Backdrop with luxury hotel facade at night */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80" 
              alt="Luxury hotel building facade" 
              className="w-full h-full object-cover brightness-[0.22] saturate-50"
              referrerPolicy="no-referrer"
            />
            {/* Absolute overlay color filtering */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase text-luxury-gold bg-luxury-gold/10 border border-luxury-gold/25 animate-pulse-slow">
              <Sparkles className="w-3.5 h-3.5" /> Modernize Your Operation Today
            </span>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-slate-100 tracking-tight leading-tight">
              Ready to Transform Your <br />
              Hotel Room Service Experience?
            </h2>

            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-normal leading-relaxed">
              Deliver unmatched luxury dining experiences, accelerate delivery fulfillment speeds, and generate up to 37% more in-room culinary profit margin immediately.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => handleOpenDemo()}
                className="w-full sm:w-auto bg-linear-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-dark hover:brightness-110 text-black font-semibold tracking-wide py-3.5 px-8 rounded-xl text-xs transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-lg"
                id="cta-bottom-demo-btn"
              >
                Book a Free Demo
              </button>
              <button
                onClick={() => handleOpenDemo('Enterprise Consultation')}
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-100 font-medium py-3.5 px-8 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                id="cta-bottom-consult-btn"
              >
                <Video className="w-4 h-4 text-slate-400" /> Schedule Consultation
              </button>
            </div>

            <div className="pt-6 flex flex-wrap justify-center gap-8 text-[11px] font-mono text-slate-500">
              <span>🚀 24-Hour Digital Onboarding</span>
              <span>•</span>
              <span>💡 Over-the-air System Upgrades</span>
              <span>•</span>
              <span>🤝 Full PMS API Compatibilities</span>
            </div>

          </div>
        </section>

      </main>

      {/* 15. Footer */}
      <footer className="bg-[#030408] border-t border-slate-900 pt-16 pb-12 relative z-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            
            {/* Column 1: Brand Info */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-luxury-gold flex items-center justify-center text-black font-bold text-sm">
                  <span>R</span>
                </div>
                <span className="font-display font-black text-sm tracking-widest text-slate-200">RoomServiceOS</span>
              </div>
              <p className="text-[11px] text-slate-500 max-w-sm leading-relaxed">
                The premier B2B hospitality dining operating system built specifically for five-star hotels, golf clubs, private serviced suites, and global resort chains to increase average basket values.
              </p>
              <p className="text-[10px] font-mono">
                📧 contact@roomserviceos.com &bull; 📞 +33 1 79 01 44
              </p>
            </div>

            {/* Column 2: Solutions */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">Solutions</span>
              <ul className="space-y-2 text-[11px]">
                <li><button onClick={() => scrollToSection('showcase-features')} className="hover:text-luxury-gold transition-colors">Digital Guest Ordering</button></li>
                <li><button onClick={() => scrollToSection('showcase-features')} className="hover:text-luxury-gold transition-colors">Kitchen Display Monitors</button></li>
                <li><button onClick={() => scrollToSection('showcase-features')} className="hover:text-luxury-gold transition-colors">Courier Dispatch Apps</button></li>
                <li><button onClick={() => scrollToSection('showcase-features')} className="hover:text-luxury-gold transition-colors">Supervisor oversight panel</button></li>
              </ul>
            </div>

            {/* Column 3: Platform */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">Platform</span>
              <ul className="space-y-2 text-[11px]">
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-luxury-gold transition-colors">Pricing Structure</button></li>
                <li><button onClick={() => scrollToSection('business-impact')} className="hover:text-luxury-gold transition-colors">ROI Calculator</button></li>
                <li><button onClick={() => scrollToSection('testimonials')} className="hover:text-luxury-gold transition-colors">Luxury Case Studies</button></li>
                <li><button onClick={() => scrollToSection('faqs')} className="hover:text-luxury-gold transition-colors">Technical FAQs</button></li>
              </ul>
            </div>

            {/* Column 4: Legals */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">Corporate</span>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#Privacy" className="hover:text-luxury-gold transition-colors">Privacy Policy</a></li>
                <li><a href="#Terms" className="hover:text-luxury-gold transition-colors">Terms of Use</a></li>
                <li><a href="#SLA" className="hover:text-luxury-gold transition-colors">SLA Compliance</a></li>
                <li><a href="#Status" className="hover:text-luxury-gold transition-colors">System Status</a></li>
              </ul>
            </div>

          </div>

          {/* Copyright Divider */}
          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px]">
            <span>
              &copy; {new Date().getFullYear()} RoomServiceOS Inc. All Luxury Rights Reserved.
            </span>
            <div className="flex gap-4">
              <a href="#github" className="hover:text-slate-300">Twitter (X)</a>
              <span>•</span>
              <a href="#linkedin" className="hover:text-slate-300">LinkedIn Hospitality</a>
              <span>•</span>
              <a href="#instagram" className="hover:text-slate-300">Instagram Luxury</a>
            </div>
          </div>

        </div>
      </footer>

      {/* 16. Booking Consultation Demo Form Modal pop-up */}
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={handleCloseDemo} 
        selectedPlan={selectedPlanForDemo}
      />

    </div>
  );
}
