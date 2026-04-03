import React from 'react';
import { ShoppingBag, ChevronLeft, Search, Filter, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Mart() {
  return (
    <div className="min-h-screen bg-background text-text-main pb-24">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 px-6 py-6 flex items-center gap-4">
        <button onClick={() => window.history.back()} className="w-10 h-10 bg-surface rounded-xl border border-border flex items-center justify-center">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-black uppercase tracking-tighter text-primary">Hallomart</h1>
      </header>

      <div className="p-6 space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search groceries..."
            className="w-full bg-surface border border-border rounded-2xl py-4 pl-12 pr-4 text-text-main outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'Fresh Produce', icon: '🍎', color: 'bg-red-500/10' },
            { name: 'Dairy & Eggs', icon: '🥚', color: 'bg-yellow-500/10' },
            { name: 'Meat & Seafood', icon: '🥩', color: 'bg-orange-500/10' },
            { name: 'Snacks', icon: '🍿', color: 'bg-purple-500/10' },
          ].map((cat, i) => (
            <div key={i} className={`${cat.color} p-6 rounded-[2rem] border border-border flex flex-col items-center gap-3 hover:scale-105 transition-transform`}>
              <span className="text-4xl">{cat.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-text-main">{cat.name}</span>
            </div>
          ))}
        </div>

        <section>
          <h2 className="font-black uppercase tracking-widest text-xs text-text-muted mb-4">Popular Stores</h2>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-surface p-4 rounded-[2rem] border border-border flex gap-4">
                <img src={`https://picsum.photos/seed/mart-${i}/200/200`} className="w-20 h-20 rounded-2xl object-cover" referrerPolicy="no-referrer" />
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-black text-sm">Taipei Fresh Mart {i}</h3>
                  <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-2">Groceries • 1.5 km</p>
                  <div className="flex items-center gap-3 text-[10px] font-black text-primary">
                    <span className="flex items-center gap-1"><Star size={12} fill="currentColor" /> 4.9</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> 30-45 min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
