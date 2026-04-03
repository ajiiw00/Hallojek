import React from 'react';
import { UserProfile, Language } from '../types';
import { TRANSLATIONS, LANGUAGES } from '../constants';
import { useLanguage } from '../App';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { OperationType } from '../types';
import { handleFirestoreError } from '../services/firestoreService';
import { Settings, Shield, HelpCircle, LogOut, Globe, ChevronRight, Camera } from 'lucide-react';

export default function Profile({ profile }: { profile: UserProfile | null }) {
  const { language, setLanguage } = useLanguage();
  const t = TRANSLATIONS[language];

  const handleLanguageChange = async (lang: Language) => {
    if (profile) {
      const userRef = doc(db, 'users', profile.uid);
      try {
        await updateDoc(userRef, { preferredLanguage: lang });
        setLanguage(lang);
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${profile.uid}`);
      }
    }
  };

  const handleLogout = () => signOut(auth);

  const menuItems = [
    { icon: Settings, label: 'Account Settings', color: 'text-text-muted' },
    { icon: Shield, label: 'Security & Privacy', color: 'text-primary' },
    { icon: HelpCircle, label: 'Help Center', color: 'text-blue-400' },
  ];

  return (
    <div className="p-4 space-y-8 bg-background text-text-main">
      {/* Profile Header */}
      <div className="flex flex-col items-center pt-8">
        <div className="relative">
          <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center text-4xl border-4 border-border shadow-lg">
            👤
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-background rounded-full flex items-center justify-center border-2 border-background shadow-sm">
            <Camera size={14} />
          </button>
        </div>
        <h2 className="mt-4 text-xl font-bold">{profile?.displayName}</h2>
        <p className="text-text-muted text-sm">{profile?.email}</p>
        <div className="mt-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
          {profile?.role}
        </div>
      </div>

      {/* Language Selection */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Globe size={18} className="text-primary" />
          <h3 className="font-black uppercase tracking-widest text-xs text-text-muted">Language / 語言</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all ${language === lang.code ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-surface text-text-muted'}`}
            >
              <span className="text-xs font-black">{lang.label}</span>
              <span className="text-[10px] font-black uppercase tracking-tighter">{lang.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Menu Items */}
      <div className="bg-surface rounded-3xl border border-border overflow-hidden">
        {menuItems.map((item, i) => (
          <button 
            key={i} 
            className={`w-full flex items-center gap-4 p-4 hover:bg-surface-light transition-colors ${i !== menuItems.length - 1 ? 'border-b border-border' : ''}`}
          >
            <item.icon size={20} className={item.color} />
            <span className="flex-1 text-left font-bold text-sm text-text-main">{item.label}</span>
            <ChevronRight size={16} className="text-border" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button 
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 p-4 bg-red-500/10 text-red-500 rounded-2xl font-black uppercase tracking-widest text-xs border border-red-500/20 hover:bg-red-500/20 transition-colors"
      >
        <LogOut size={20} />
        <span>Log Out</span>
      </button>

      <div className="text-center text-[10px] text-text-muted font-medium pb-4">
        Hallojek v1.0.0 (MVP) <br />
        A super app for everyone
      </div>
    </div>
  );
}
