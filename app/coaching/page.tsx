import { Brain, PlayCircle } from 'lucide-react';

export default function CoachingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto mt-12">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-slate-800 p-4 rounded-full">
              <Brain className="w-12 h-12 text-purple-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">AI Strategy Coach</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Upload your replays or paste a match ID. Our AI analyzes your positioning, 
            economy, and mechanics to give you personalized tips.
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center border-dashed">
          <PlayCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-300">Drop Replay File Here</h3>
          <p className="text-slate-500 mt-2">Supports .dem, .rofl, and .replay files</p>
        </div>
      </div>
    </div>
  );
}