'use client';

import Link from "next/link";
import { Hammer, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Hammer className="w-6 h-6 text-orange-500 group-hover:rotate-12 transition-transform" />
          <span className="font-bold text-xl bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
            StatForge
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            Analytics
          </Link>
          <Link href="/trading" className="hover:text-white transition-colors">
            Trading
          </Link>
          <Link href="/coaching" className="hover:text-white transition-colors">
            Coaching
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-300 hidden sm:block">{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-white transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="bg-white text-slate-900 px-4 py-2 rounded-full text-sm font-bold hover:bg-slate-200 transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}