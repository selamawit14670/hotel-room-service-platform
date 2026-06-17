import React, { useState } from 'react';
import { X, Calendar, Building2, User, Mail, Phone, Clock, Landmark, ShieldCheck } from 'lucide-react';
import { DemoRequest } from '../types';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

export default function DemoModal({ isOpen, onClose, selectedPlan }: DemoModalProps) {
  const [formData, setFormData] = useState<Partial<DemoRequest>>({
    fullName: '',
    email: '',
    hotelName: '',
    hotelSize: '51-200 rooms',
    phone: '',
    preferredDate: '',
    notes: selectedPlan ? `Interested in the ${selectedPlan} tier.` : ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [ticketDetails, setTicketDetails] = useState<DemoRequest | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate luxury API call to process enterprise booking request
    setTimeout(() => {
      const finalRequest = {
        fullName: formData.fullName || 'Valued Partner',
        email: formData.email || '',
        hotelName: formData.hotelName || 'Luxury Resort Associate',
        hotelSize: formData.hotelSize || '51-200 rooms',
        phone: formData.phone || '',
        preferredDate: formData.preferredDate || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notes: formData.notes
      } as DemoRequest;
      
      const prevBookings = JSON.parse(localStorage.getItem('roomservice_demos') || '[]');
      localStorage.setItem('roomservice_demos', JSON.stringify([...prevBookings, finalRequest]));
      
      setTicketDetails(finalRequest);
      setSubmitting(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" id="demo-modal">
      <div 
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 dark:border-luxury-gold/20 bg-white dark:bg-neutral-950 p-6 md:p-8 transition-all duration-300 shadow-2xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-luxury-gold transition-colors hover:bg-slate-100 dark:hover:bg-white/5 rounded-full"
          id="close-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {!ticketDetails ? (
          <div>
            {/* Header */}
            <div className="mb-6 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] uppercase tracking-widest font-mono text-luxury-gold bg-luxury-gold/10 border border-luxury-gold/20 mb-3">
                <Landmark className="w-3.5 h-3.5" /> Private Consultation
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight text-center">
                Secure Your RoomServiceOS Demo
              </h3>
              <p className="mt-1.5 text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">
                Schedule a 25-minute interactive platform demonstration modeled after your brand structure.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jean-Luc Coste"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 text-slate-950 dark:text-slate-100 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>
                </div>

                {/* Corporate email */}
                <div>
                  <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">Corporate Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. director@luxehavenhotel.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 text-slate-950 dark:text-slate-100 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Hotel Name */}
                <div>
                  <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">Hotel or Brand Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Grand Chalet Courchevel"
                      value={formData.hotelName}
                      onChange={(e) => setFormData({...formData, hotelName: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 text-slate-950 dark:text-slate-100 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>
                </div>

                {/* Hotel Size */}
                <div>
                  <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">Property Keys (Size)</label>
                  <div className="relative">
                    <Landmark className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <select
                      value={formData.hotelSize}
                      onChange={(e) => setFormData({...formData, hotelSize: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-luxury-gold transition-colors appearance-none"
                    >
                      <option value="1-50 rooms">Boutique (1 - 50 keys)</option>
                      <option value="51-200 rooms">Premium (51 - 200 keys)</option>
                      <option value="201+ rooms">Grand Resort (200+ keys)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">Direct Contact Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +33 (0)4 79 01..."
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 text-slate-950 dark:text-slate-100 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">Preferred Consultation Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 text-slate-950 dark:text-slate-100 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">Integration Requests / Custom Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Currently running Opera PMS. Interested in QR dynamic menu setups."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-3 py-2 text-slate-950 dark:text-slate-100 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                />
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-linear-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-dark hover:brightness-110 active:scale-[0.99] text-black font-semibold tracking-wide py-3 px-4 rounded-lg text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-luxury-gold/10"
                id="submit-demo-form"
              >
                {submitting ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    Verifying Calendar Slots...
                  </>
                ) : (
                  <>
                    Register Priority Demo Spot
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-slate-500 font-mono">
                🔒 Confidentially managed in alignment with standard hospitality privacy mandates.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 animate-scale-up">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-luxury-gold/10 border border-luxury-gold/30 rounded-full text-luxury-gold mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            
            <h4 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100 text-center">
              Demo Slot Reserved Successfully
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mt-2">
              Welcome, <span className="text-luxury-gold font-medium">{ticketDetails.fullName}</span>. We are holding a personalized VIP room simulation for <span className="text-slate-800 dark:text-slate-200 underline decoration-luxury-gold">{ticketDetails.hotelName}</span>.
            </p>

            {/* Simulated Printed Pass Ticket */}
            <div className="my-8 max-w-sm mx-auto border border-dashed border-luxury-gold/30 bg-slate-50 dark:bg-neutral-900/40 p-5 rounded-xl text-left font-mono relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-gold/5 blur-xl rounded-full"></div>
              
              <div className="text-[10px] text-luxury-gold uppercase tracking-widest font-bold mb-2 border-b border-luxury-gold/10 pb-2">
                RoomServiceOS • VIP DEMO PASS
              </div>

              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div>
                  <span className="text-slate-400 dark:text-slate-500">PARTNER:</span> {ticketDetails.fullName}
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500">ORGANIZATION:</span> {ticketDetails.hotelName} ({ticketDetails.hotelSize})
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500">PROPOSED DATE:</span> {ticketDetails.preferredDate}
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500">PLATFORM SCOPE:</span> Full 5-Portal Suite Included
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500">CONFIRMATION ID:</span> RM-{(Math.random() * 100000).toFixed(0)}-OS
                </div>
              </div>

              <div className="mt-4 border-t border-slate-200 dark:border-slate-800 pt-3 text-[10px] text-slate-400 text-center uppercase tracking-wider">
                Our Corporate Office will reach out in less than 4 hours.
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-900 hover:bg-slate-850 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer"
              id="close-success-btn"
            >
              Continue Exploring Platform
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
