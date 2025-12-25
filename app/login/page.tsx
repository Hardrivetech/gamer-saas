'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Hammer } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex items-center gap-3">
        <Hammer className="w-8 h-8 text-orange-500" />
        <span className="font-bold text-2xl text-white">StatForge</span>
      </div>
      
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-2 text-center">Welcome Back</h1>
        <p className="text-slate-400 text-center mb-8">Sign in to access your dashboard</p>
        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              placeholder="player@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02]">
            Log In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-orange-500 hover:text-orange-400 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}