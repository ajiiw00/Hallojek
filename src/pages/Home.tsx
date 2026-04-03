import React, { useState } from 'react';
import { UserProfile } from '../types';
import { TRANSLATIONS } from '../constants';
import { useLanguage } from '../App';
import { Car, Utensils, Send, Wallet, MapPin, Search, Bell, Bike, Store, Power, TrendingUp, Package, Clock, Star, ShoppingBag, HeartPulse, Ticket, Receipt, ChevronRight, Sparkles, History } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function Home({ profile }: { profile: UserProfile | null }) {
  const { language } = useLanguage();
  const [isOnline, setIsOnline] = useState(false);
  const t = TRANSLATIONS[language];

  const services = [
    { to: '/ride', icon: Car, label: t.ride, color: 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' },
    { to: '/food', icon: Utensils, label: t.food, color: 'bg-orange-500/10 text-orange-500 border border-orange-500/20' },
    { to: '/send', icon: Send, label: t.send, color: 'bg-blue-500/10 text-blue-500 border border-blue-500/20' },
    { to: '/mart', icon: ShoppingBag, label: 'Mart', color: 'bg-pink-500/10 text-pink-500 border border-pink-500/20' },
    { to: '/health', icon: HeartPulse, label: 'Health', color: 'bg-red-500/10 text-red-500 border border-red-500/20' },
    { to: '/tickets', icon: Ticket, label: 'Tickets', color: 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20' },
    { to: '/bills', icon: Receipt, label: 'Bills', color: 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20' },
    { to: '/pay', icon: Wallet, label: t.pay, color: 'bg-purple-500/10 text-purple-500 border border-purple-500/20' },
  ];

  const renderCustomerHome = () => (
    <div className="space-y-8">
      {/* Search Bar - Floating Style */}
      <div className="relative z-20 -mt-4">
        <div className="bg-surface border border-border rounded-2xl shadow-2xl p-1 flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder={t.whereTo}
              className="w-full bg-transparent py-4 pl-12 pr-4 text-text-main placeholder:text-text-muted font-bold text-sm outline-none"
            />
          </div>
          <button className="bg-primary text-background p-3 rounded-xl shadow-lg shadow-primary/20">
            <MapPin size={20} />
          </button>
        </div>
      </div>

      {/* Wallet Card - Premium Style */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary rounded-[2.5rem] p-6 text-background shadow-2xl shadow-primary/30 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl"></div>
        
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                <Wallet size={14} />
              </div>
              <span className="font-black uppercase tracking-[0.2em] text-[10px] opacity-80">Hallopay Balance</span>
            </div>
            <div className="text-4xl font-black tracking-tighter">
              NT$ {profile?.balance.toLocaleString() || 0}
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/pay" className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-2xl transition-all">
              <TrendingUp size={20} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 relative z-10">
          {[
            { icon: Wallet, label: 'Pay' },
            { icon: TrendingUp, label: 'Top Up' },
            { icon: History, label: 'History' },
            { icon: Sparkles, label: 'Rewards' }
          ].map((action, i) => (
            <button key={i} className="flex flex-col items-center gap-2 py-2 rounded-2xl hover:bg-white/10 transition-all">
              <action.icon size={20} />
              <span className="text-[9px] font-black uppercase tracking-widest">{action.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Services Grid - 4x2 */}
      <div className="grid grid-cols-4 gap-y-8 gap-x-4">
        {services.map((service) => (
          <Link key={service.to} to={service.to} className="flex flex-col items-center gap-3 group">
            <div className={`w-16 h-16 ${service.color} rounded-[1.5rem] flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}>
              <service.icon size={28} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted group-hover:text-primary transition-colors">{service.label}</span>
          </Link>
        ))}
      </div>

      {/* AI Recommendations Section */}
      <section className="bg-surface/50 rounded-[2.5rem] p-6 border border-border relative overflow-hidden">
        <div className="absolute top-4 right-4 text-primary/20">
          <Sparkles size={40} />
        </div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
            <Sparkles size={18} />
          </div>
          <h2 className="font-black uppercase tracking-widest text-xs text-text-main">AI Recommendations for You</h2>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {[
            { title: 'Best Halal Food', desc: 'Warung Indo Taipei', img: 'food-1' },
            { title: 'Fastest Ride', desc: 'Halloride Express', img: 'ride-1' },
            { title: 'Send Package', desc: 'Same-day Delivery', img: 'send-1' }
          ].map((rec, i) => (
            <div key={i} className="min-w-[200px] bg-background border border-border rounded-3xl p-4 space-y-3 hover:border-primary/50 transition-all">
              <img 
                src={`https://picsum.photos/seed/${rec.img}/400/300`} 
                alt={rec.title}
                className="w-full h-24 object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">{rec.title}</div>
                <div className="text-xs font-bold text-text-main line-clamp-1">{rec.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section>
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="font-black uppercase tracking-widest text-xs text-text-muted">Hot Promos</h2>
          <button className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            See All <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {[1, 2, 3].map((i) => (
            <div key={i} className="min-w-[300px] h-44 bg-surface rounded-[2rem] overflow-hidden relative border border-border group">
              <img 
                src={`https://picsum.photos/seed/hallojek-promo-${i}/800/500`} 
                alt="Promo" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent p-6 flex flex-col justify-end">
                <div className="bg-primary text-background text-[8px] font-black px-2 py-1 rounded-full w-fit mb-2 uppercase tracking-widest">Limited Offer</div>
                <h3 className="text-text-main text-lg font-black leading-tight mb-1">Discount 50% for Hallofood</h3>
                <p className="text-text-muted text-xs font-medium">Valid until end of April in Taipei City</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nearby Restaurants */}
      <section>
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="font-black uppercase tracking-widest text-xs text-text-muted">{t.nearby} Restaurants</h2>
          <button className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            See All <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface p-4 rounded-[2rem] border border-border flex gap-5 hover:bg-surface-light transition-all group">
              <div className="relative">
                <img 
                  src={`https://picsum.photos/seed/food-${i}/300/300`} 
                  alt="Food" 
                  className="w-24 h-24 rounded-2xl object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-2 -right-2 bg-primary text-background text-[8px] font-black px-2 py-1 rounded-lg shadow-lg">
                  ⭐ 4.8
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-black text-base text-text-main mb-1">Warung Indo Taipei {i}</h3>
                <p className="text-xs text-text-muted font-medium mb-3">Indonesian • Halal • 1.2 km</p>
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                  <div className="flex items-center gap-1 text-primary">
                    <Clock size={12} /> 20-30 min
                  </div>
                  <div className="flex items-center gap-1 text-emerald-500">
                    <Car size={12} /> Free Delivery
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="pb-8">
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="font-black uppercase tracking-widest text-xs text-text-muted">Recent Activity</h2>
          <button className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            View History <ChevronRight size={14} />
          </button>
        </div>
        <div className="bg-surface rounded-[2rem] border border-border divide-y divide-border overflow-hidden">
          {[
            { type: 'Ride', title: 'Taipei Main Station', date: 'Today, 10:30 AM', price: 'NT$ 150', icon: Car, color: 'text-emerald-500' },
            { type: 'Food', title: 'Warung Indo Taipei', date: 'Yesterday, 7:15 PM', price: 'NT$ 320', icon: Utensils, color: 'text-orange-500' }
          ].map((activity, i) => (
            <div key={i} className="p-5 flex items-center gap-4 hover:bg-surface-light transition-colors">
              <div className={`w-12 h-12 bg-background rounded-2xl flex items-center justify-center border border-border ${activity.color}`}>
                <activity.icon size={20} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-black text-text-main mb-0.5">{activity.title}</div>
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{activity.date}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-text-main">{activity.price}</div>
                <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Completed</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderRiderHome = () => (
    <div className="space-y-6">
      {/* Status Toggle */}
      <div className={`p-6 rounded-3xl border transition-all duration-500 ${isOnline ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-zinc-900/50 border-border'}`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className={`text-2xl font-black italic uppercase tracking-tighter ${isOnline ? 'text-emerald-500' : 'text-text-muted'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </h2>
            <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Ready to accept orders</p>
          </div>
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-2xl ${isOnline ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-surface border border-border text-text-muted'}`}
          >
            <Power size={32} />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-surface p-4 rounded-2xl border border-border text-center">
            <TrendingUp size={18} className="mx-auto mb-2 text-emerald-500" />
            <div className="text-lg font-black tracking-tighter">NT$ 1,250</div>
            <div className="text-[8px] font-black uppercase text-text-muted tracking-widest">Today</div>
          </div>
          <div className="bg-surface p-4 rounded-2xl border border-border text-center">
            <Star size={18} className="mx-auto mb-2 text-orange-500" />
            <div className="text-lg font-black tracking-tighter">4.9</div>
            <div className="text-[8px] font-black uppercase text-text-muted tracking-widest">Rating</div>
          </div>
          <div className="bg-surface p-4 rounded-2xl border border-border text-center">
            <Clock size={18} className="mx-auto mb-2 text-blue-500" />
            <div className="text-lg font-black tracking-tighter">8.5h</div>
            <div className="text-[8px] font-black uppercase text-text-muted tracking-widest">Online</div>
          </div>
        </div>
      </div>

      {/* Available Jobs */}
      <section>
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="font-black uppercase tracking-widest text-xs text-text-muted">Available Jobs</h2>
          <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-black">3 Nearby</span>
        </div>
        <div className="space-y-4">
          {[
            { type: 'Ride', from: 'Taipei 101', to: 'Ximending', fare: 180, dist: '0.5 km' },
            { type: 'Food', from: 'Warung Indo', to: 'NTU Dorm', fare: 120, dist: '1.2 km' },
          ].map((job, i) => (
            <div key={i} className="bg-surface p-5 rounded-3xl border border-border space-y-4 hover:border-primary/50 transition-all">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${job.type === 'Ride' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                    {job.type === 'Ride' ? <Car size={16} /> : <Utensils size={16} />}
                  </div>
                  <span className="font-black uppercase tracking-widest text-[10px]">{job.type}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-primary">NT$ {job.fare}</div>
                  <div className="text-[8px] font-black text-text-muted uppercase tracking-widest">Est. Earning</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-text-main font-bold">{job.from}</span>
                </div>
                <div className="flex items-center gap-3 text-xs opacity-60">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-text-main font-bold">{job.to}</span>
                </div>
              </div>
              <button className="w-full bg-primary text-background py-3 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20">
                Accept Job
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderSellerHome = () => (
    <div className="space-y-6">
      {/* Store Overview */}
      <div className="bg-surface rounded-3xl p-6 border border-border space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-text-main">Warung Indo Taipei</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Open for Orders</span>
            </div>
          </div>
          <div className="w-16 h-16 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center border border-orange-500/20">
            <Store size={32} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background p-4 rounded-2xl border border-border">
            <div className="text-2xl font-black tracking-tighter text-text-main">NT$ 4,850</div>
            <div className="text-[8px] font-black uppercase text-text-muted tracking-widest">Sales Today</div>
          </div>
          <div className="bg-background p-4 rounded-2xl border border-border">
            <div className="text-2xl font-black tracking-tighter text-text-main">12</div>
            <div className="text-[8px] font-black uppercase text-text-muted tracking-widest">Orders Today</div>
          </div>
        </div>
      </div>

      {/* Active Orders */}
      <section>
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="font-black uppercase tracking-widest text-xs text-text-muted">Active Orders</h2>
          <span className="bg-orange-500/20 text-orange-500 text-[10px] px-2 py-0.5 rounded-full font-black">2 New</span>
        </div>
        <div className="space-y-4">
          {[
            { id: '#ORD-9921', items: '2x Nasi Goreng, 1x Es Teh', total: 350, time: '5 min ago' },
            { id: '#ORD-9920', items: '1x Ayam Bakar, 1x Soda', total: 220, time: '12 min ago' },
          ].map((order, i) => (
            <div key={i} className="bg-surface p-5 rounded-3xl border border-border space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-black text-xs text-primary">{order.id}</span>
                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{order.time}</span>
              </div>
              <div className="text-sm font-bold text-text-main">{order.items}</div>
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <div className="text-lg font-black text-text-main">NT$ {order.total}</div>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-xl font-black uppercase tracking-widest text-[10px]">
                  Prepare
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  return (
    <div className="bg-background text-text-main min-h-screen pb-24">
      {/* Header - Floating Top */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Bike size={24} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <MapPin size={12} className="text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-text-main">Taipei, Taiwan</span>
            </div>
            <h1 className="text-lg font-black italic uppercase tracking-tighter text-primary leading-none">HALLOJEK</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 bg-surface rounded-xl border border-border flex items-center justify-center relative text-text-main hover:bg-surface-light transition-all">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background animate-pulse"></span>
          </button>
          <Link to="/profile" className="w-10 h-10 rounded-xl overflow-hidden border border-border hover:scale-105 transition-transform">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.uid}`} 
              alt="Avatar" 
              className="w-full h-full object-cover bg-surface"
            />
          </Link>
        </div>
      </header>

      <div className="p-6 space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={profile?.role}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {profile?.role === 'rider' ? renderRiderHome() : 
             profile?.role === 'seller' ? renderSellerHome() : 
             renderCustomerHome()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
