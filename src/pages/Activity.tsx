import React, { useState } from 'react';
import { UserProfile } from '../types';
import { TRANSLATIONS } from '../constants';
import { useLanguage } from '../App';
import { Car, Utensils, Send, Clock, ChevronRight, MapPin, Star, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Activity({ profile }: { profile: UserProfile | null }) {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const [tab, setTab] = useState<'ongoing' | 'history'>('ongoing');

  const activities = {
    ongoing: [
      { 
        id: '1', 
        type: 'Ride', 
        title: 'Taipei Main Station', 
        status: 'Driver Arriving', 
        time: '2 min', 
        icon: Car, 
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20'
      },
      { 
        id: '2', 
        type: 'Food', 
        title: 'Warung Indo Taipei', 
        status: 'Preparing', 
        time: '15 min', 
        icon: Utensils, 
        color: 'text-orange-500',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20'
      }
    ],
    history: [
      { 
        id: '3', 
        type: 'Ride', 
        title: 'Taipei 101', 
        date: 'Yesterday, 10:30 AM', 
        price: 'NT$ 150', 
        icon: Car, 
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20'
      },
      { 
        id: '4', 
        type: 'Send', 
        title: 'Package to Xinyi', 
        date: '2 Apr, 2:45 PM', 
        price: 'NT$ 85', 
        icon: Send, 
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20'
      },
      { 
        id: '5', 
        type: 'Food', 
        title: 'Mei Er Mei Breakfast', 
        date: '1 Apr, 8:15 AM', 
        price: 'NT$ 120', 
        icon: Utensils, 
        color: 'text-orange-500',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-text-main pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 px-6 py-6">
        <h1 className="text-2xl font-black uppercase tracking-tighter text-primary mb-6">Activity</h1>
        
        {/* Tabs */}
        <div className="flex bg-surface p-1 rounded-2xl border border-border">
          <button 
            onClick={() => setTab('ongoing')}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${tab === 'ongoing' ? 'bg-primary text-background shadow-lg' : 'text-text-muted hover:text-text-main'}`}
          >
            Ongoing
          </button>
          <button 
            onClick={() => setTab('history')}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${tab === 'history' ? 'bg-primary text-background shadow-lg' : 'text-text-muted hover:text-text-main'}`}
          >
            History
          </button>
        </div>
      </header>

      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {tab === 'ongoing' ? (
              activities.ongoing.length > 0 ? (
                activities.ongoing.map((item) => (
                  <div key={item.id} className={`p-5 rounded-[2rem] border ${item.border} ${item.bg} flex gap-5 group hover:scale-[1.02] transition-all`}>
                    <div className={`w-14 h-14 bg-background rounded-2xl flex items-center justify-center shadow-lg ${item.color}`}>
                      <item.icon size={28} />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-black text-base text-text-main">{item.title}</h3>
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">{item.time}</span>
                      </div>
                      <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">{item.type} • {item.status}</p>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-background py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border border-border hover:border-primary transition-colors">Track</button>
                        <button className="flex-1 bg-background py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border border-border hover:border-primary transition-colors">Contact</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center text-text-muted border border-border">
                    <Clock size={40} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-text-main">No ongoing activity</h3>
                    <p className="text-sm text-text-muted">When you book a service, it will appear here.</p>
                  </div>
                </div>
              )
            ) : (
              activities.history.map((item) => (
                <div key={item.id} className="p-5 bg-surface rounded-[2rem] border border-border flex gap-5 hover:bg-surface-light transition-colors group">
                  <div className={`w-14 h-14 bg-background rounded-2xl flex items-center justify-center border border-border ${item.color}`}>
                    <item.icon size={24} />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-black text-base text-text-main">{item.title}</h3>
                      <span className="text-sm font-black text-text-main">{item.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{item.type} • {item.date}</p>
                      <button className="text-primary text-[9px] font-black uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Details <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
