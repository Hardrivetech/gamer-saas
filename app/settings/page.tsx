'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, updatePassword, User } from 'firebase/auth';
import { auth } from '../firebase';
import { Lock, Save } from 'lucide-react';

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!user) return;

    try {
      await updatePassword(user, newPassword);
      setMessage('Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.code === 'auth/requires-recent-login') {
        setError('For security, please log out and log back in before changing your password.');
      } else {
        setError(err.message || 'Failed to update password');
      }
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-2xl mx-auto mt-12 bg-slate-800 p-8 rounded-xl border border-slate-700">
        <div className="flex items-center gap-3 mb-8">
          <Lock className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold">Account Settings</h1>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-slate-200">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}
              {message && <p className="text-green-400 text-sm">{message}</p>}

              <button
                type="submit"
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                Update Password
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
