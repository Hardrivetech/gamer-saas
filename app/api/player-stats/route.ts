import { NextResponse } from 'next/server';

// Mock Database/API Response
// In the future, replace this with a fetch() to Steam, Riot, or Supabase
const MOCK_DB = {
  'pro_gamer_1': { rank: 'Diamond', winRate: 64, matches: 120, main: 'Sniper' },
  'casual_steve': { rank: 'Silver', winRate: 48, matches: 30, main: 'Healer' },
  'faker': { rank: 'Challenger', winRate: 72, matches: 900, main: 'Mid' },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  // 1. Validation
  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  // 2. Simulate API Latency (remove this in production)
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 3. Fetch Data
  // logic: const data = await fetch(`https://api.riotgames.com/...`)
  const stats = MOCK_DB[username as keyof typeof MOCK_DB];

  if (!stats) {
    return NextResponse.json({ error: 'Player not found' }, { status: 404 });
  }

  // 4. Return JSON
  return NextResponse.json({
    username,
    ...stats,
    generatedAt: new Date().toISOString(),
  });
}
