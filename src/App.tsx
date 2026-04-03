import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { UserProfile, Language, OperationType } from './types';
import { handleFirestoreError } from './services/firestoreService';
import { ErrorBoundary } from './components/ErrorBoundary';
import Layout from './components/Layout';
import Home from './pages/Home';
import Ride from './pages/Ride';
import Food from './pages/Food';
import Send from './pages/Send';
import Activity from './pages/Activity';
import Mart from './pages/Mart';
import PlaceholderPage from './pages/PlaceholderPage';
import Pay from './pages/Pay';
import Profile from './pages/Profile';
import Login from './pages/Login';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('id');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const profileRef = doc(db, 'users', firebaseUser.uid);
        
        // Real-time listener for profile changes
        const unsubProfile = onSnapshot(profileRef, (doc) => {
          if (doc.exists()) {
            const data = doc.data() as UserProfile;
            setProfile(data);
            setLanguage(data.preferredLanguage || 'en');
            setLoading(false);
          } else {
            // Profile doesn't exist yet, Login.tsx will handle creation
            setProfile(null);
            setLoading(false);
          }
        }, (error) => {
          handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
        });

        return () => unsubProfile();
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-primary">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <h1 className="text-2xl font-black tracking-[0.2em] text-primary">HALLOJEK</h1>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <BrowserRouter>
          <Routes>
            {!user || !profile ? (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            ) : (
              <Route element={<Layout />}>
                <Route path="/" element={<Home profile={profile} />} />
                <Route path="/ride" element={<Ride profile={profile} />} />
                <Route path="/food" element={<Food profile={profile} />} />
                <Route path="/send" element={<Send profile={profile} />} />
                <Route path="/activity" element={<Activity profile={profile} />} />
                <Route path="/mart" element={<Mart />} />
                <Route path="/health" element={<PlaceholderPage title="Hallomed" />} />
                <Route path="/tickets" element={<PlaceholderPage title="Hallotix" />} />
                <Route path="/bills" element={<PlaceholderPage title="Hallobill" />} />
                <Route path="/pay" element={<Pay profile={profile} />} />
                <Route path="/profile" element={<Profile profile={profile} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            )}
          </Routes>
        </BrowserRouter>
      </LanguageContext.Provider>
    </ErrorBoundary>
  );
}
