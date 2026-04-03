import React, { useState } from 'react';
import { UserProfile } from '../types';
import { TRANSLATIONS } from '../constants';
import { useLanguage } from '../App';
import { Send, MapPin, Package, ChevronRight, Info } from 'lucide-react';
import { motion } from 'motion/react';

export default function SendPage({ profile }: { profile: UserProfile | null }) {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  return (
    <div className="p-4 space-y-6 bg-background text-text-main">
      {/* Header */}
      <header className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center border border-blue-500/20">
          <Send size={24} />
        </div>
        <h1 className="text-xl font-bold">Hallosend</h1>
      </header>

      {/* Info Banner */}
      <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4 flex gap-3">
        <Info className="text-blue-500 shrink-0" size={20} />
        <div className="space-y-1">
          <p className="text-[10px] text-blue-200/80 leading-relaxed font-bold uppercase tracking-wider">
            Send packages across Taipei and New Taipei City with same-day delivery guarantee.
          </p>
          <p className="text-[9px] text-primary font-black uppercase tracking-widest">
            Fixed NT$ 15 Admin Fee applies to all shipments
          </p>
        </div>
      </div>

      {/* Delivery Form */}
      <div className="bg-surface rounded-3xl p-6 border border-border space-y-8 shadow-xl">
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className="w-3 h-3 rounded-full border-2 border-blue-500 bg-background"></div>
              <div className="w-0.5 flex-1 bg-border border-dashed border-l"></div>
              <MapPin className="text-red-500" size={16} />
            </div>
            <div className="flex-1 space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Pickup From</label>
                <div className="text-sm font-bold text-text-main">Current Location</div>
                <p className="text-xs text-text-muted">No. 1, Section 1, Chengde Rd, Datong District</p>
              </div>
              <div className="h-px bg-border"></div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Deliver To</label>
                <input 
                  type="text" 
                  placeholder="Where are you sending to?"
                  className="w-full text-sm font-bold focus:outline-none bg-transparent text-text-main placeholder:text-text-muted"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Package Type</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Document', icon: '📄' },
              { label: 'Food', icon: '🍱' },
              { label: 'Box', icon: '📦' },
            ].map((type) => (
              <button key={type.label} className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-background hover:border-blue-500/50 transition-all">
                <span className="text-2xl">{type.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-text-muted">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/10 uppercase tracking-widest">
          Check Price
        </button>
      </div>

      {/* Recent Shipments */}
      <section>
        <h2 className="font-black uppercase tracking-widest text-xs text-text-muted mb-4 px-1">Recent Shipments</h2>
        <div className="bg-surface rounded-3xl p-4 border border-border flex items-center gap-4 hover:bg-surface-light transition-colors">
          <div className="w-12 h-12 bg-background rounded-2xl flex items-center justify-center text-text-muted border border-border">
            <Package size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm text-text-main">Package for Budi</h3>
            <p className="text-xs text-text-muted">Delivered • 2 days ago</p>
          </div>
          <ChevronRight size={16} className="text-border" />
        </div>
      </section>
    </div>
  );
}
