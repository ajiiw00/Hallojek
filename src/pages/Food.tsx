import React, { useState } from 'react';
import { UserProfile } from '../types';
import { TRANSLATIONS } from '../constants';
import { useLanguage } from '../App';
import { Search, Filter, Star, Clock, ShoppingBag, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Food({ profile }: { profile: UserProfile | null }) {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const [category, setCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: '🍽️' },
    { id: 'halal', label: t.halal, icon: '☪️' },
    { id: 'indonesian', label: t.indonesian, icon: '🇮🇩' },
    { id: 'taiwanese', label: t.taiwanese, icon: '🇹🇼' },
    { id: 'drinks', label: 'Drinks', icon: '🧋' },
  ];

  return (
    <div className="p-4 space-y-6 bg-background text-text-main">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center border border-orange-500/20">
            <ShoppingBag size={24} />
          </div>
          <h1 className="text-xl font-bold">Hallofood</h1>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-text-muted uppercase font-black tracking-widest">Deliver to</p>
          <p className="text-xs font-bold flex items-center gap-1 text-text-main">
            Home <ChevronRight size={12} className="text-primary" />
          </p>
        </div>
      </header>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search food or restaurant"
            className="w-full bg-surface border border-border rounded-2xl py-3 pl-12 pr-4 text-text-main placeholder:text-text-muted focus:ring-2 focus:ring-orange-500/50 outline-none transition-all text-sm"
          />
        </div>
        <button className="w-12 h-12 bg-surface border border-border rounded-2xl flex items-center justify-center text-text-muted hover:text-text-main transition-colors">
          <Filter size={20} />
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`flex flex-col items-center gap-2 min-w-[70px] transition-all ${category === cat.id ? 'scale-110' : 'opacity-40'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg border ${category === cat.id ? 'bg-orange-500 border-orange-400 text-white' : 'bg-surface border-border'}`}>
              {cat.icon}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-wider ${category === cat.id ? 'text-orange-500' : 'text-text-muted'}`}>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Featured Promo */}
      <div className="bg-orange-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-orange-500/10">
        <div className="relative z-10">
          <h2 className="text-2xl font-black mb-1">Free Delivery!</h2>
          <p className="text-orange-100 text-sm mb-4">For your first 3 orders in Taipei</p>
          <button className="bg-white text-orange-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
            Claim Now
          </button>
        </div>
        <div className="absolute -right-4 -bottom-4 text-7xl opacity-20 rotate-12">🍔</div>
      </div>

      {/* Restaurant List */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="font-black uppercase tracking-widest text-xs text-text-muted">Recommended for You</h2>
          <button className="text-orange-500 text-[10px] font-black uppercase tracking-widest">See All</button>
        </div>
        
        {[
          { name: 'Bakso Beranak Taipei', type: 'Indonesian • Halal', rating: 4.9, time: '15-25 min', img: 'bakso' },
          { name: 'Mei Er Mei Breakfast', type: 'Taiwanese • Local', rating: 4.7, time: '10-20 min', img: 'breakfast' },
          { name: 'Nasi Padang Sederhana', type: 'Indonesian • Halal', rating: 4.8, time: '20-30 min', img: 'padang' },
        ].map((res, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface rounded-3xl overflow-hidden border border-border hover:border-orange-500/30 transition-colors"
          >
            <div className="h-40 relative">
              <img 
                src={`https://picsum.photos/seed/restaurant-${res.img}/600/300`} 
                alt={res.name} 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-[10px] font-black text-orange-500 border border-orange-500/20">
                <Star size={12} className="fill-current" />
                {res.rating}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg mb-1 text-text-main">{res.name}</h3>
              <p className="text-xs text-text-muted mb-4">{res.type}</p>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-text-muted">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-orange-500" />
                  {res.time}
                </div>
                <div className="flex items-center gap-1.5">
                  <ShoppingBag size={14} className="text-orange-500" />
                  NT$ 15 Admin Fee
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
