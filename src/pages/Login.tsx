import React, { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';
import { LogIn, Globe, User, Bike, Store, Check, Phone, Mail, Lock, Calendar, ArrowLeft } from 'lucide-react';
import { Language, UserRole, UserProfile, OperationType } from '../types';
import { handleFirestoreError } from '../services/firestoreService';
import { LANGUAGES, TRANSLATIONS } from '../constants';

export default function Login() {
  const [language, setLanguage] = useState<Language>('en');
  const [step, setStep] = useState<'initial' | 'register' | 'email-login' | 'verify-email' | 'role-selection'>('initial');
  const [loading, setLoading] = useState(false);
  const [tempUser, setTempUser] = useState<any>(null);
  
  // Registration Form State
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [regPhone, setRegPhone] = useState('');

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showOtpNotification, setShowOtpNotification] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profileRef = doc(db, 'users', user.uid);
        try {
          const profileSnap = await getDoc(profileRef);
          if (!profileSnap.exists()) {
            setTempUser(user);
            setStep('role-selection');
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail || !regPassword || !fullName || !day || !month || !year || !regPhone) {
      alert('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      const user = userCredential.user;
      
      await updateProfile(user, { displayName: fullName });
      
      // Store temporary profile data
      const dob = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      const tempProfile = {
        uid: user.uid,
        displayName: fullName,
        email: regEmail,
        phoneNumber: regPhone,
        dob: dob,
        preferredLanguage: language,
        createdAt: new Date().toISOString(),
      };
      
      // Save to users collection
      try {
        await setDoc(doc(db, 'users', user.uid), {
          ...tempProfile,
          role: 'customer' // Default role, will be updated in role-selection
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
      }

      setTempUser(user);
      setStep('role-selection');
    } catch (error: any) {
      console.error('Registration failed:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredential.user;
      
      const profileRef = doc(db, 'users', user.uid);
      try {
        const profileSnap = await getDoc(profileRef);
        
        if (!profileSnap.exists()) {
          setTempUser(user);
          setStep('role-selection');
        } else {
          // Profile exists, App.tsx will handle redirect
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      const profileRef = doc(db, 'users', firebaseUser.uid);
      try {
        const profileSnap = await getDoc(profileRef);
        
        if (!profileSnap.exists()) {
          setTempUser(firebaseUser);
          setStep('role-selection');
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = () => {
    if (phoneNumber.length < 9) {
      alert('Please enter a valid Taiwan phone number');
      return;
    }
    
    // Generate a random 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpSent(true);
    setShowOtpNotification(true);
    
    // Auto-hide notification after 10 seconds
    setTimeout(() => setShowOtpNotification(false), 10000);
    
    console.log('OTP generated for +886', phoneNumber, ':', code);
  };

  const handleVerifyOtp = async () => {
    if (otp === generatedOtp) {
      setLoading(true);
      try {
        // Mock a user object for phone login
        const mockPhoneUser = {
          uid: `phone_${phoneNumber}`,
          displayName: `User ${phoneNumber.slice(-4)}`,
          email: `${phoneNumber}@phone.hallojek.com`,
        };
        
        const profileRef = doc(db, 'users', mockPhoneUser.uid);
        try {
          const profileSnap = await getDoc(profileRef);
          
          if (!profileSnap.exists()) {
            setTempUser(mockPhoneUser);
            setStep('role-selection');
          } else {
            // If profile exists, we would normally sign in
            // For this mock, we'll just alert or proceed if we had a real auth state
            alert('Welcome back! (Phone login simulation successful)');
            // In a real app, we'd use signInWithPhoneNumber and the app would react to auth state
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${mockPhoneUser.uid}`);
        }
      } catch (error) {
        console.error('Phone verification failed:', error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    window.open('https://accounts.google.com/signin/recovery', '_blank');
  };

  const handleCompleteProfile = async (role: UserRole) => {
    if (!tempUser) return;
    setLoading(true);
    try {
      const newProfile: UserProfile = {
        uid: tempUser.uid,
        displayName: tempUser.displayName || 'User',
        email: tempUser.email || '',
        role: role,
        balance: 0,
        preferredLanguage: language,
        createdAt: new Date().toISOString(),
      };
      try {
        await setDoc(doc(db, 'users', tempUser.uid), newProfile);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `users/${tempUser.uid}`);
      }
    } catch (error) {
      console.error('Profile creation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (step === 'register') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-text-main relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="w-full max-w-md bg-surface rounded-3xl p-8 shadow-2xl border border-border relative z-10">
          <button onClick={() => setStep('initial')} className="mb-6 text-text-muted hover:text-primary flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all">
            <ArrowLeft size={16} /> {t.backToLogin}
          </button>
          
          <h2 className="text-2xl font-black mb-6 text-primary uppercase tracking-tight">{t.signUp}</h2>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-2">{t.fullName}</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="text" 
                  placeholder={t.fullName}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-2">{t.email}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="email" 
                  placeholder={t.email}
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-2">{t.password}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="password" 
                  placeholder={t.password}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-2">{t.dob}</label>
              <div className="grid grid-cols-3 gap-2">
                <input 
                  type="number" 
                  placeholder={t.day}
                  min="1" max="31"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="bg-background border border-border rounded-2xl py-4 px-4 text-center text-sm font-bold focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  required
                />
                <input 
                  type="number" 
                  placeholder={t.month}
                  min="1" max="12"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="bg-background border border-border rounded-2xl py-4 px-4 text-center text-sm font-bold focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  required
                />
                <input 
                  type="number" 
                  placeholder={t.year}
                  min="1900" max={new Date().getFullYear()}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="bg-background border border-border rounded-2xl py-4 px-4 text-center text-sm font-bold focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="tel" 
                  placeholder="0912345678"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-background py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-primary-light transition-all shadow-xl shadow-primary/20 text-sm mt-4 disabled:opacity-50"
            >
              {loading ? '...' : t.process}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (step === 'email-login') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-text-main relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="w-full max-w-sm bg-surface rounded-3xl p-8 shadow-2xl border border-border relative z-10">
          <button onClick={() => setStep('initial')} className="mb-6 text-text-muted hover:text-primary flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all">
            <ArrowLeft size={16} /> {t.backToLogin}
          </button>
          
          <h2 className="text-2xl font-black mb-6 text-primary uppercase tracking-tight">{t.logIn}</h2>
          
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-2">{t.email}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="email" 
                  placeholder={t.email}
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-2">{t.password}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="password" 
                  placeholder={t.password}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-background py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-primary-light transition-all shadow-xl shadow-primary/20 text-sm mt-4 disabled:opacity-50"
            >
              {loading ? '...' : t.logIn}
            </button>
            
            <div className="text-center mt-4">
              <button 
                type="button"
                onClick={handleForgotPassword}
                className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
              >
                {t.forgotPassword}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (step === 'role-selection') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-text-main">
        <div className="w-full max-w-md bg-surface rounded-3xl p-8 shadow-2xl border border-border">
          <h2 className="text-2xl font-black mb-2 text-center uppercase tracking-tight">{t.selectRole}</h2>
          <p className="text-text-muted text-center mb-8 text-sm">How will you use Hallojek?</p>

          <div className="space-y-4">
            {[
              { id: 'customer', label: t.customer, icon: User, desc: 'Order food, rides, and more' },
              { id: 'rider', label: t.rider, icon: Bike, desc: 'Deliver orders and earn money' },
              { id: 'seller', label: t.seller, icon: Store, desc: 'Sell your products and food' },
            ].map((role) => (
              <button
                key={role.id}
                onClick={() => handleCompleteProfile(role.id as UserRole)}
                className="w-full flex items-center gap-4 p-5 rounded-2xl border border-border bg-background hover:border-primary transition-all group text-left"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <role.icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-text-main">{role.label}</div>
                  <div className="text-xs text-text-muted">{role.desc}</div>
                </div>
                <Check size={16} className="text-primary opacity-0 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'initial') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-text-main relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

        {/* Language Selector */}
        <div className="absolute top-6 right-6 z-50">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 text-[10px] font-black tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-xl border border-primary/20 hover:bg-primary/20 transition-all"
          >
            <Globe size={14} />
            {LANGUAGES.find(l => l.code === language)?.label}
          </button>
          {showLangMenu && (
            <div className="absolute top-full right-0 mt-2 bg-surface border border-border rounded-2xl p-2 shadow-2xl min-w-[120px] overflow-hidden">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-[10px] font-black tracking-widest rounded-xl transition-all ${
                    language === lang.code ? 'text-primary bg-primary/10' : 'text-text-muted hover:text-text-main hover:bg-background'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mb-12 text-center relative z-10">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/20">
            <Bike size={40} className="text-white" />
          </div>
          <h1 className="text-6xl font-black tracking-tighter mb-2 text-primary italic">HALLOJEK</h1>
          <p className="text-text-muted font-bold uppercase tracking-[0.2em] text-xs">{t.welcome}</p>
        </div>

        <div className="w-full max-w-sm bg-surface rounded-3xl p-8 shadow-2xl border border-border relative z-10">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => setStep('register')}
                className="w-full bg-primary text-background py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-primary-light transition-all shadow-xl shadow-primary/20 text-sm flex items-center justify-center gap-3"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                {t.signIn}
              </button>
              <button
                onClick={() => setStep('email-login')}
                className="w-full bg-background border border-border text-text-main py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-surface-light transition-all text-sm flex items-center justify-center gap-3"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                {t.logIn}
              </button>
            </div>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest"><span className="bg-surface px-4 text-text-muted">Or Phone Login</span></div>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-text-muted border-r border-border pr-2">
                <Phone size={16} />
                <span className="text-xs font-bold">+886</span>
              </div>
              <input 
                type="tel" 
                placeholder={t.phonePlaceholder}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-background border border-border rounded-2xl py-4 pl-20 pr-20 text-sm font-bold focus:ring-2 focus:ring-primary/50 outline-none transition-all"
              />
              <button 
                onClick={handleSendOtp}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/10 text-primary text-[10px] font-black px-3 py-2 rounded-xl hover:bg-primary/20 transition-all uppercase tracking-widest"
              >
                Send
              </button>
            </div>

            {otpSent && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-4">
                <input 
                  type="text" 
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-background border border-primary rounded-2xl py-4 px-4 text-center text-lg font-black tracking-[0.5em] focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                />
                <button
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.length < 6}
                  className="w-full bg-primary text-background py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-primary-light transition-all shadow-xl shadow-primary/20 text-sm disabled:opacity-50"
                >
                  Verify & Continue
                </button>
                <p className="text-[10px] text-primary font-bold mt-2 text-center uppercase tracking-widest">OTP Sent to +886 {phoneNumber}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
