import { useState } from 'react';
import { Crown, Sparkles, Clock, Rocket } from 'lucide-react';
import { clsx } from 'clsx';

const MOCK_TOKENS = [
  { id: 1, name: 'Based Cat', symbol: 'BCAT', price: '0.002 ETH', image: '', type: 'boosted' },
  { id: 2, name: 'Zora Punk', symbol: 'ZPNK', price: '0.015 ETH', image: '', type: 'new' },
  { id: 3, name: 'Frame Dog', symbol: 'FDOG', price: '0.001 ETH', image: '', type: 'deployed' },
  { id: 4, name: 'Higher', symbol: 'HIGH', price: '0.042 ETH', image: '', type: 'boosted' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('new');

  return (
    <div className="space-y-6 pb-24">
      <header className="flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-md py-4 z-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          ZorFaster
        </h1>
        <div className="text-xs px-2 py-1 bg-neutral-800 rounded-full text-neutral-400 border border-neutral-700">
          Base Network
        </div>
      </header>

      {/* King of the Hill */}
      <section className="bg-neutral-900 rounded-xl p-4 border border-blue-900/50 shadow-[0_0_15px_rgba(0,82,255,0.15)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <Crown size={100} />
        </div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-2">
            <Crown size={16} /> King of the Hill
          </h2>
          <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full animate-pulse">
            LIVE
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <div className="w-20 h-20 bg-neutral-800 rounded-xl flex-shrink-0 border-2 border-yellow-500/30">
            {/* Image Placeholder */}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl">Maliot Coin</h3>
            <p className="text-xs text-neutral-400 mb-2">Created by @maliot100x</p>
            
            <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-[75%] h-full"></div>
            </div>
            <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
              <span>Market Cap: $42k</span>
              <span>Vol: $12k</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { id: 'new', label: 'New', icon: Sparkles },
          { id: 'deployed', label: 'Deployed', icon: Rocket },
          { id: 'boosted', label: 'Boosted', icon: Crown },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2",
              activeTab === tab.id 
                ? "bg-white text-black" 
                : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800"
            )}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="grid grid-cols-2 gap-3">
        {MOCK_TOKENS.map((token) => (
          <div key={token.id} className="bg-neutral-900 rounded-xl p-3 border border-neutral-800 hover:border-neutral-700 transition-colors">
            <div className="w-full aspect-square bg-neutral-800 rounded-lg mb-3 relative">
               {token.type === 'boosted' && (
                 <div className="absolute top-1 right-1 bg-yellow-500/20 text-yellow-400 p-1 rounded-md">
                   <Crown size={12} />
                 </div>
               )}
            </div>
            <div className="font-bold text-sm truncate">{token.name}</div>
            <div className="text-xs text-neutral-500 flex justify-between items-center mt-1">
              <span>{token.symbol}</span>
              <span className="text-white font-medium">{token.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
