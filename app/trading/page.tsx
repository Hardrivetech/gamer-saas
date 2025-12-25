'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { ArrowRightLeft, Box } from 'lucide-react';

export default function TradingPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto mt-12">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-slate-800 p-4 rounded-full">
              <ArrowRightLeft className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Marketplace & Trading</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Securely trade in-game assets, skins, and cards. Our escrow system ensures 
            you never get scammed again.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-6 opacity-50">
              <Box className="w-8 h-8 text-slate-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Listing #{i}</h3>
              <p className="text-slate-500">Coming soon...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}