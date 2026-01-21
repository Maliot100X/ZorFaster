import { useState, useEffect } from 'react';
import { Crown, Sparkles, Rocket, Info, Loader2, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import { fetchRecentMints, type ZoraToken } from '../lib/zora';
import { NFTPreview } from "@zoralabs/nft-components";

function LinkButton({ to, className, children }: { to: string, className?: string, children: React.ReactNode }) {
    return (
        <RouterLink to={to} className={clsx("px-4 py-2 rounded-full text-xs font-bold transition-colors", className)}>
            {children}
        </RouterLink>
    )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('new');
  const [mints, setMints] = useState<ZoraToken[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMints = async () => {
        setIsLoading(true);
        const data = await fetchRecentMints();
        setMints(data);
        setIsLoading(false);
    };
    loadMints();
  }, [activeTab]); // In real app, might filter by tab

  return (
    <div className="space-y-6 pb-20">
      <header className="flex justify-between items-center sticky top-0 bg-warp-bg/90 backdrop-blur-md py-3 z-10 border-b border-warp-border">
        <h1 className="text-xl font-bold text-warp-text tracking-tight flex items-center gap-2">
          ZorFaster <span className="text-[10px] bg-warp-active px-1.5 py-0.5 rounded text-white font-normal">v2</span>
        </h1>
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-warp-text-muted">Base Live</span>
        </div>
      </header>

      {/* King of the Hill - REAL PLACEHOLDER */}
      <section className="bg-warp-surface rounded-2xl p-4 border border-warp-border shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-yellow-500 uppercase tracking-wider flex items-center gap-2">
            <Crown size={16} fill="currentColor" /> King of the Hill
          </h2>
          <span className="text-[10px] bg-white/5 text-warp-text-muted px-2 py-0.5 rounded-full border border-warp-border">
            No Active King
          </span>
        </div>
        
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
            <div className="w-16 h-16 bg-[#2C2C2E] rounded-full flex items-center justify-center border-2 border-dashed border-warp-border">
                <Crown size={24} className="text-warp-text-muted" />
            </div>
            <div>
                <h3 className="font-bold text-warp-text">Be the King</h3>
                <p className="text-xs text-warp-text-muted max-w-[200px] mx-auto mt-1">
                    Purchase a boost in the Shop to feature your token here instantly.
                </p>
            </div>
            <LinkButton to="/shop" className="bg-yellow-600/20 text-yellow-500 hover:bg-yellow-600/30 border border-yellow-600/30">
                Get Boost
            </LinkButton>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-warp-border pb-1">
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
                ? "text-warp-active" 
                : "text-warp-text-muted hover:text-warp-text"
            )}
          >
            <div className="flex items-center justify-center gap-2">
                <tab.icon size={14} />
                {tab.label}
            </div>
            {activeTab === tab.id && (
                <div className="absolute bottom-[-5px] left-0 right-0 h-[2px] bg-warp-active rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Real Zora Feed */}
      {isLoading ? (
        <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-warp-active" size={32} />
        </div>
      ) : mints.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
            {mints.map((mint) => (
                <div key={mint.id} className="bg-warp-surface rounded-xl overflow-hidden border border-warp-border hover:border-warp-active transition-colors group">
                    <div className="aspect-square bg-warp-bg relative">
                         {/* Use Zora NFT Preview for robust media handling */}
                        <div className="w-full h-full [&>div]:w-full [&>div]:h-full [&_img]:object-cover">
                            {/* @ts-ignore */}
                            <NFTPreview
                                contract={mint.contract.id}
                                id={mint.tokenId}
                                showBorders={false}
                            />
                        </div>
                    </div>
                    <div className="p-3">
                        <h3 className="text-sm font-bold text-warp-text truncate">{mint.contract.name || 'Unknown Collection'}</h3>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-[10px] bg-warp-bg px-1.5 py-0.5 rounded text-warp-text-muted border border-warp-border">
                                #{mint.tokenId}
                            </span>
                            <span className="text-[10px] text-warp-text-muted flex items-center gap-1">
                                {mint.totalMinted} Mints
                            </span>
                        </div>
                        <a 
                            href={`https://zora.co/collect/base:${mint.contract.id}/${mint.tokenId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 block w-full text-center py-1.5 bg-warp-bg hover:bg-warp-border text-[10px] font-bold text-warp-text rounded border border-warp-border transition-colors flex items-center justify-center gap-1"
                        >
                            Collect on Zora <ExternalLink size={10} />
                        </a>
                    </div>
                </div>
            ))}
        </div>
      ) : (
        <div className="min-h-[200px] flex flex-col items-center justify-center text-center space-y-4 pt-8">
            <div className="w-12 h-12 rounded-full bg-warp-surface border border-warp-border flex items-center justify-center">
                <Info size={20} className="text-warp-text-muted" />
            </div>
            <div className="space-y-1">
                <p className="text-warp-text font-medium">No tokens found</p>
                <p className="text-xs text-warp-text-muted">Be the first to launch a token on Base.</p>
            </div>
            <LinkButton to="/launch" className="bg-warp-active text-white hover:bg-warp-active/80 shadow-lg shadow-warp-active/20">
                Launch Token
            </LinkButton>
        </div>
      )}
    </div>
  );
}
