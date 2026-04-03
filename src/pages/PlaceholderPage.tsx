import React from 'react';
import { ChevronLeft, Construction } from 'lucide-react';

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-background text-text-main pb-24 flex flex-col">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 px-6 py-6 flex items-center gap-4">
        <button onClick={() => window.history.back()} className="w-10 h-10 bg-surface rounded-xl border border-border flex items-center justify-center">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-black uppercase tracking-tighter text-primary">{title}</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
        <div className="w-24 h-24 bg-primary/10 text-primary rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-primary/20">
          <Construction size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-text-main">Under Construction</h2>
          <p className="text-sm text-text-muted font-medium">We're working hard to bring you the best {title} experience in Taiwan. Stay tuned!</p>
        </div>
        <button 
          onClick={() => window.history.back()}
          className="bg-primary text-background px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
