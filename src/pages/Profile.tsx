import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';
import { type FrameContext } from '@farcaster/frame-sdk';

export default function Profile() {
  const [context, setContext] = useState<FrameContext>();
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      setContext(context);
      
      // Try to get address from context or wallet
      if (context?.user?.verifiedAddresses?.[0]) {
        setAddress(context.user.verifiedAddresses[0]);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6 pb-24">
      <h1 className="text-2xl font-bold">Profile</h1>
      
      <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex items-center gap-4">
        <div className="w-16 h-16 bg-neutral-800 rounded-full overflow-hidden">
          {context?.user?.pfpUrl && (
            <img src={context.user.pfpUrl} alt="PFP" className="w-full h-full object-cover" />
          )}
        </div>
        <div>
          <div className="font-bold text-lg">
            {context?.user?.username ? `@${context.user.username}` : 'Guest User'}
          </div>
          <div className="text-xs text-neutral-500 font-mono">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'No Wallet Connected'}
          </div>
        </div>
      </div>

      <button className="w-full bg-neutral-800 text-white py-3 rounded-xl font-medium border border-neutral-700 flex items-center justify-center gap-2 hover:bg-neutral-700 transition-colors">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        Synced with Farcaster
      </button>

      <div>
        <h2 className="font-bold mb-4 flex justify-between items-center">
            Your Holdings
            <span className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-400">Live PnL</span>
        </h2>
        
        {/* Mock Holdings for Visuals */}
        <div className="space-y-3">
            {[1, 2].map((i) => (
                <div key={i} className="bg-neutral-900 p-3 rounded-xl border border-neutral-800 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-neutral-800 rounded-lg"></div>
                        <div>
                            <div className="font-bold text-sm">Maliot Coin #{i}</div>
                            <div className="text-xs text-green-400">+12.5%</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="font-bold text-sm">100 TKN</div>
                        <div className="text-xs text-neutral-500">$4.20</div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
