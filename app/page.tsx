'use client';

import { useState } from 'react';
import { Search, Trophy, Activity, Users } from 'lucide-react';

interface PlayerStats {
  username: string;
  rank: string;
  winRate: number;
  matches: number;
  main: string;
}

export default function GameStatsSaaS() {
  const [query, setQuery] = useState('');
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setStats(null);

    try {
      // Calls our internal API route
      const res = await fetch(`/api/player-stats?username=${query}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to fetch');
      setStats(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          ProTracker.gg
        </h1>
        <p className="text-slate-400 mt-2">Analyze your performance. Dominate the ladder.</p>
      </header>

      {/* Search Section */}
      <div className="max-w-xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Enter username (try 'pro_gamer_1')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-full py-4 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white placeholder-slate-500"
          />
          <Search className="absolute left-4 top-4 text-slate-500" />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Scanning...' : 'Analyze'}
          </button>
        </form>
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
      </div>

      {/* Results Dashboard */}
      {stats && (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse-once">
          
          {/* Card 1: Rank */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
            <div className="flex items-center gap-3 mb-2 text-slate-400">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-sm uppercase tracking-wider">Current Rank</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.rank}</div>
            <div className="text-sm text-slate-500 mt-1">Top 5% of players</div>
          </div>

          {/* Card 2: Win Rate */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
            <div className="flex items-center gap-3 mb-2 text-slate-400">
              <Activity className="w-5 h-5 text-green-500" />
              <span className="text-sm uppercase tracking-wider">Win Rate</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.winRate}%</div>
            <div className="w-full bg-slate-700 h-2 rounded-full mt-3">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${stats.winRate}%` }}
              ></div>
            </div>
          </div>

          {/* Card 3: Main Role */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
            <div className="flex items-center gap-3 mb-2 text-slate-400">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-sm uppercase tracking-wider">Main Role</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.main}</div>
            <div className="text-sm text-slate-500 mt-1">{stats.matches} Matches played</div>
          </div>

        </div>
      )}
    </div>
  );
}
