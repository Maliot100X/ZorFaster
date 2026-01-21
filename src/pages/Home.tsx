import { useState } from 'react';
import { Crown, Sparkles, Rocket, Info } from 'lucide-react';
import { clsx } from 'clsx';

export default function Home() {
  const [activeTab, setActiveTab] = useState('new');

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center sticky top-0 bg-[#000000]/80 backdrop-blur-md py-2 z-10 border-b border-[#2D2D2E]">
        <h1 className="text-xl font-bold text-white tracking-tight">
          ZorFaster
        </h1>
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-[#8A8A8E]">Base Live</span>
        </div>
      </header>

      {/* King of the Hill - REAL PLACEHOLDER */}
      <section className="bg-[#1C1C1E] rounded-2xl p-4 border border-[#2D2D2E] shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-yellow-500 uppercase tracking-wider flex items-center gap-2">
            <Crown size={16} fill="currentColor" /> King of the Hill
          </h2>
          <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full">
            No Active King
          </span>
        </div>
        
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
            <div className="w-16 h-16 bg-[#2C2C2E] rounded-full flex items-center justify-center">
                <Crown size={24} className="text-[#48484A]" />
            </div>
            <div>
                <h3 className="font-bold text-white">Be the King</h3>
                <p className="text-xs text-[#8A8A8E] max-w-[200px] mx-auto mt-1">
                    Purchase a boost in the Shop to feature your token here instantly.
                </p>
            </div>
            <LinkButton to="/shop" className="bg-yellow-600/20 text-yellow-500 hover:bg-yellow-600/30">
                Get Boost
            </LinkButton>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#2D2D2E] pb-1">
        {[
          { id: 'new', label: 'New', icon: Sparkles },
          { id: 'deployed', label: 'Deployed', icon: Rocket },
          { id: 'boosted', label: 'Boosted', icon: Crown },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "flex-1 py-3 text-sm font-medium transition-all relative",
              activeTab === tab.id 
                ? "text-white" 
                : "text-[#8A8A8E] hover:text-white"
            )}
          >
            <div className="flex items-center justify-center gap-2">
                <tab.icon size={14} />
                {tab.label}
            </div>
            {activeTab === tab.id && (
                <div className="absolute bottom-[-5px] left-0 right-0 h-[2px] bg-purple-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Real Feed Placeholder */}
      <div className="min-h-[200px] flex flex-col items-center justify-center text-center space-y-4 pt-8">
        <div className="w-12 h-12 rounded-full bg-[#1C1C1E] flex items-center justify-center">
            <Info size={20} className="text-[#8A8A8E]" />
        </div>
        <div className="space-y-1">
            <p className="text-white font-medium">No tokens found</p>
            <p className="text-xs text-[#8A8A8E]">Be the first to launch a token on Base.</p>
        </div>
        <LinkButton to="/launch" className="bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-900/20">
            Launch Token
        </LinkButton>
      </div>
    </div>
  );
}

// Helper Components
import { Link as RouterLink } from 'react-router-dom';

function LinkButton({ to, className, children }: { to: string, className?: string, children: React.ReactNode }) {
    return (
        <RouterLink to={to} className={clsx("px-4 py-2 rounded-full text-xs font-bold transition-colors", className)}>
            {children}
        </RouterLink>
    )
}
