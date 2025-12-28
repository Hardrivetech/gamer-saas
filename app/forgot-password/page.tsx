'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Hammer, ArrowLeft } from 'lucide-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset link sent! Check your email.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex items-center gap-3">
        <Hammer className="w-8 h-8 text-orange-500" />
        <span className="font-bold text-2xl text-white">StatForge</span>
      </div>
      
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-2 text-center">Reset Password</h1>
        <p className="text-slate-400 text-center mb-8">Enter your email to receive a reset link</p>
        
        {message && <p className="text-green-400 text-sm text-center mb-4">{message}</p>}
        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
        
        <form onSubmit={handleReset} className="space-y-4">
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
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-slate-400 hover:text-white text-sm flex items-center justify-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}