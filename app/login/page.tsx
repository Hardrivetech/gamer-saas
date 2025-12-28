'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Hammer } from 'lucide-react';
import { signInWithEmailAndPassword, GoogleAuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth';
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

  const handleGoogleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Failed to login with Google.');
    }
  };

  const handleDiscordLogin = async () => {
    setError('');
    const provider = new OAuthProvider('discord.com');
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Failed to login with Discord.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(251,146,60,0.3),rgba(255,255,255,0))]"></div>

      <div className="w-50% max-w-md z-10">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Hammer className="w-8 h-8 text-orange-500" />
            <span className="font-bold text-2xl text-white">StatForge</span>
          </Link>
          <p className="text-slate-400">Sign in to forge your legacy</p>
        </div>
        
        <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-xl border border-slate-700 shadow-xl">
          {/* Social Logins */}
          <div className="space-y-3 mb-6">
            <button onClick={handleDiscordLogin} className="w-full flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3 rounded-lg transition-colors">
              {/* Discord SVG Icon */}
              <svg className="w-6 h-6" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Discord</title><path fill="currentColor" d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.369-.42.869-.579 1.239a18.278 18.278 0 00-5.488 0 18.278 18.278 0 00-.579-1.239.074.074 0 00-.079-.037A19.736 19.736 0 003.683 4.37a.074.074 0 00-.037.079C3.725 6.439 4.045 8.339 4.505 9.939a18.522 18.522 0 002.548 4.619.074.074 0 00.088.047c.188-.098.388-.208.588-.318a.074.074 0 00.028-.088c-.088-.138-.168-.288-.238-.428a.074.074 0 01.037-.108c.638-.238 1.288-.458 1.958-.618a.074.074 0 01.069.009c.22.138.43.288.63.448a.074.0-74 0 010 .098c-.04.058-.08.128-.12.188a.074.074 0 00-.009.079c.12.128.23.258.35.378a.074.074 0 00.088.009c.2-.118.39-.228.58-.328a.074.074 0 00.088-.047 18.522 18.522 0 002.548-4.619c.46-1.6.78-3.5.86-5.56a.074.074 0 00-.037-.079zM8.02 15.339c-.83 0-1.5-.7-1.5-1.5s.67-1.5 1.5-1.5 1.5.7 1.5 1.5-.67 1.5-1.5 1.5zm7.96 0c-.83 0-1.5-.7-1.5-1.5s.67-1.5 1.5-1.5 1.5.7 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
              Continue with Discord
            </button>
            <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-lg transition-colors border border-slate-300">
              {/* Google SVG Icon */}
              <svg className="w-6 h-6" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Google</title><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-4.63 1.9-3.82 0-6.66-2.9-6.66-6.66s2.84-6.66 6.66-6.66c2.1 0 3.38.82 4.2 1.6l2.33-2.33C17.13 2.16 15.2 1.5 12.48 1.5c-5.4 0-9.3 4.16-9.3 9.3s3.9 9.3 9.3 9.3c5.22 0 8.9-3.52 8.9-8.9v-1.12h-8.9z"/></svg>
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-slate-600"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-sm">OR</span>
            <div className="flex-grow border-t border-slate-600"></div>
          </div>

          <h1 className="text-xl font-bold text-white mb-6 text-center">Sign in with email</h1>
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
              <div className="flex justify-end mt-1">
                <Link href="/forgot-password" className="text-xs text-orange-500 hover:text-orange-400">
                  Forgot Password?
                </Link>
              </div>
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
    </div>
  );
}