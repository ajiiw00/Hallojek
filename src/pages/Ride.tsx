import React, { useState } from 'react';
import { UserProfile } from '../types';
import { TRANSLATIONS } from '../constants';
import { useLanguage } from '../App';
import { MapPin, Search, Navigation, ChevronRight, Clock, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function Ride({ profile }: { profile: UserProfile | null }) {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const [step, setStep] = useState<'search' | 'booking' | 'tracking'>('search');

  return (
    <div className="flex flex-col h-full bg-background text-text-main">
      {/* Map Placeholder */}
      <div className="flex-1 bg-surface relative overflow-hidden">
        <img 
          src="https://picsum.photos/seed/taipei-map/1200/1600" 
          alt="Map" 
          className="w-full h-full object-cover opacity-40 grayscale contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-primary rounded-full border-4 border-background shadow-lg animate-pulse flex items-center justify-center">
            <Navigation size={14} className="text-background fill-current" />
          </div>
        </div>
        
        {/* Floating Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="absolute top-4 left-4 w-10 h-10 bg-surface rounded-full shadow-lg flex items-center justify-center text-text-main border border-border"
        >
          <ChevronRight className="rotate-180" size={20} />
        </button>
      </div>

      {/* Bottom Sheet */}
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        className="bg-surface rounded-t-3xl p-6 shadow-2xl -mt-8 z-10 border-t border-border"
      >
        <div className="w-12 h-1.5 bg-border rounded-full mx-auto mb-6"></div>
        
        {step === 'search' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">{t.whereTo}</h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-background rounded-2xl border border-border">
                <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="flex-1 text-sm text-text-muted">Current Location</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-surface-light rounded-2xl border-2 border-primary shadow-lg shadow-primary/5">
                <MapPin className="text-primary" size={18} />
                <input 
                  type="text" 
                  placeholder="Enter destination" 
                  className="flex-1 text-sm font-bold focus:outline-none bg-transparent text-text-main placeholder:text-text-muted"
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Recent Destinations</h3>
              {[
                { name: 'Taipei Main Station', address: 'No. 3, Beiping W Rd, Zhongzheng' },
                { name: 'Taipei 101', address: 'No. 7, Section 5, Xinyi Rd' },
              ].map((loc, i) => (
                <button 
                  key={i} 
                  onClick={() => setStep('booking')}
                  className="w-full flex items-center gap-4 text-left p-2 hover:bg-surface-light rounded-xl transition-colors"
                >
                  <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-text-muted border border-border">
                    <Clock size={18} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-text-main">{loc.name}</h4>
                    <p className="text-xs text-text-muted">{loc.address}</p>
                  </div>
                  <ChevronRight size={16} className="text-border" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'booking' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Select Vehicle</h2>
              <button onClick={() => setStep('search')} className="text-primary text-[10px] font-black uppercase tracking-widest underline">Change</button>
            </div>

            <div className="space-y-3">
              {[
                { type: 'Motorcycle', price: 65, time: '3 min', icon: '🏍️' },
                { type: 'Car (4 Seats)', price: 120, time: '5 min', icon: '🚗' },
                { type: 'Car (6 Seats)', price: 180, time: '8 min', icon: '🚐' },
              ].map((v, i) => (
                <button 
                  key={i} 
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${i === 0 ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/30'}`}
                >
                  <span className="text-3xl">{v.icon}</span>
                  <div className="flex-1 text-left">
                    <h4 className={`font-bold text-sm ${i === 0 ? 'text-primary' : 'text-text-main'}`}>{v.type}</h4>
                    <p className="text-xs text-text-muted">{v.time} away</p>
                  </div>
                  <div className="text-right">
                    <div className={`font-black ${i === 0 ? 'text-primary' : 'text-text-main'}`}>NT$ {v.price + 15}</div>
                    <div className="text-[8px] text-text-muted uppercase tracking-wider font-bold">Incl. NT$ 15 Fee</div>
                  </div>
                </button>
              ))}
            </div>

            <button 
              onClick={() => setStep('tracking')}
              className="w-full bg-primary text-background py-4 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 uppercase tracking-widest"
            >
              Book Halloride
            </button>
          </div>
        )}

        {step === 'tracking' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-2xl border border-primary/20">
              <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center text-2xl shadow-sm border border-border">
                👨🏻‍✈️
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-text-main">Asep Kurniawan</h4>
                <div className="flex items-center gap-1 text-[10px] text-text-muted font-bold">
                  <Star size={12} className="text-primary fill-current" />
                  <span>4.9</span>
                  <span className="mx-1">•</span>
                  <span>Yamaha NMAX (ABC-123)</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black text-primary uppercase tracking-widest">Arriving in</div>
                <div className="text-lg font-black text-text-main">2 min</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-surface-light text-text-main py-3 rounded-xl font-black uppercase tracking-widest text-[10px] border border-border">Message</button>
              <button className="flex-1 bg-surface-light text-text-main py-3 rounded-xl font-black uppercase tracking-widest text-[10px] border border-border">Call</button>
              <button 
                onClick={() => setStep('search')}
                className="flex-1 bg-red-500/10 text-red-500 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] border border-red-500/20"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
