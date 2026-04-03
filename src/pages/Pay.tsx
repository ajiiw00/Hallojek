import React, { useState } from 'react';
import { UserProfile } from '../types';
import { TRANSLATIONS } from '../constants';
import { useLanguage } from '../App';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, History, QrCode, CreditCard, Landmark } from 'lucide-react';
import { motion } from 'motion/react';

export default function Pay({ profile }: { profile: UserProfile | null }) {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  const actions = [
    { label: 'Scan QR', icon: QrCode, color: 'bg-emerald-500' },
    { label: 'Top Up', icon: Plus, color: 'bg-blue-500' },
    { label: 'Transfer', icon: ArrowUpRight, color: 'bg-orange-500' },
    { label: 'Request', icon: ArrowDownLeft, color: 'bg-purple-500' },
  ];

  return (
    <div className="p-4 space-y-6 bg-background text-text-main">
      {/* Header */}
      <header className="flex items-center gap-2">
        <div className="w-10 h-10 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center border border-purple-500/20">
          <Wallet size={24} />
        </div>
        <h1 className="text-xl font-bold">Hallopay</h1>
      </header>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-900 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden border border-purple-500/20">
        <div className="relative z-10">
          <p className="text-purple-200/70 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{t.balance}</p>
          <h2 className="text-4xl font-black mb-8 tracking-tighter">NT$ {profile?.balance.toLocaleString() || 0}</h2>
          
          <div className="grid grid-cols-4 gap-2">
            {actions.map((action) => (
              <button key={action.label} className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/10">
                  <action.icon size={22} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider opacity-80">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Top Up Methods */}
      <section>
        <h2 className="font-black uppercase tracking-widest text-xs text-text-muted mb-4 px-1">Top Up Methods</h2>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-surface p-5 rounded-3xl border border-border flex flex-col items-center gap-3 hover:bg-surface-light transition-colors">
            <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center border border-blue-500/20">
              <Landmark size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-text-main">Bank Transfer</span>
          </button>
          <button className="bg-surface p-5 rounded-3xl border border-border flex flex-col items-center gap-3 hover:bg-surface-light transition-colors">
            <div className="w-10 h-10 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center border border-orange-500/20">
              <CreditCard size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-text-main">Convenience Store</span>
          </button>
        </div>
      </section>

      {/* Transaction History */}
      <section>
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="font-black uppercase tracking-widest text-xs text-text-muted">{t.history}</h2>
          <button className="text-purple-500 text-[10px] font-black uppercase tracking-widest">View All</button>
        </div>
        
        <div className="space-y-4">
          {[
            { title: 'Hallofood Order', date: 'Today, 12:30', amount: -150, type: 'payment' },
            { title: 'Top Up via 7-Eleven', date: 'Yesterday, 18:45', amount: 500, type: 'topup' },
            { title: 'Halloride Trip', date: '2 days ago', amount: -85, type: 'payment' },
          ].map((tx, i) => (
            <div key={i} className="bg-surface p-4 rounded-2xl border border-border flex items-center gap-4 hover:bg-surface-light transition-colors">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${tx.type === 'topup' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                {tx.type === 'topup' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-text-main">{tx.title}</h4>
                <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">{tx.date}</p>
              </div>
              <div className={`font-black text-sm ${tx.type === 'topup' ? 'text-emerald-500' : 'text-text-main'}`}>
                {tx.type === 'topup' ? '+' : '-'} NT$ {Math.abs(tx.amount)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
