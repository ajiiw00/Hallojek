import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, History, Wallet, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { TRANSLATIONS } from '../constants';
import { useLanguage } from '../App';

export default function Layout() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  const navItems = [
    { to: '/', icon: Home, label: t.home },
    { to: '/activity', icon: History, label: 'Activity' },
    { to: '/pay', icon: Wallet, label: t.pay },
    { to: '/profile', icon: User, label: t.profile },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-main font-sans">
      {/* Main Content */}
      <main className="flex-1 pb-20 overflow-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border px-2 py-1 flex justify-around items-center z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }: { isActive: boolean }) =>
              cn(
                'flex flex-col items-center justify-center p-2 transition-colors',
                isActive ? 'text-primary' : 'text-text-muted hover:text-primary'
              )
            }
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
