import { useState } from 'react';
import { Zap, Loader2, Check } from 'lucide-react';
import sdk from '@farcaster/frame-sdk';
import { createWalletClient, custom, parseEther } from 'viem';
import { base } from 'viem/chains';
import { PAYMENT_RECEIVER } from '../lib/web3';

export default function Shop() {
  const [loading, setLoading] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const buyBoost = async (type: '10min' | '1hour') => {
    setLoading(type);
    setSuccess(null);
    
    try {
      const walletClient = createWalletClient({
        chain: base,
        transport: custom(sdk.wallet.ethProvider),
      });

      const [address] = await walletClient.getAddresses();

      // Calculate price in ETH (approximate for demo, ideally fetch real price or use stablecoin)
      // $5 ~ 0.002 ETH, $15 ~ 0.006 ETH (assuming ETH=$2500)
      const ethAmount = type === '10min' ? '0.002' : '0.006';

      const hash = await walletClient.sendTransaction({
        to: PAYMENT_RECEIVER,
        value: parseEther(ethAmount),
        account: address,
        chain: base,
      });

      console.log(`Boost purchased (${type}):`, hash);
      setSuccess(`Boost Activated! TX: ${hash.slice(0,6)}...`);
      
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed: ' + (error as Error).message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      <h1 className="text-2xl font-bold">Boost Shop</h1>

      {success && (
        <div className="bg-green-900/30 border border-green-500/50 p-4 rounded-xl flex items-center gap-3 text-green-400">
          <Check size={20} />
          <div className="text-sm font-medium">{success}</div>
        </div>
      )}

      <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/20 p-4 rounded-xl border border-yellow-700/30">
        <div className="flex items-start gap-3">
          <Zap className="text-yellow-500 mt-1" />
          <div>
            <h3 className="font-bold text-yellow-500">Why Boost?</h3>
            <p className="text-xs text-neutral-300 mt-1">
              Boosting puts your token on the "King of the Hill" spot and notifies users.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {/* 10 Min Boost */}
        <button 
          onClick={() => buyBoost('10min')}
          disabled={!!loading}
          className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex justify-between items-center hover:border-neutral-700 transition-colors w-full text-left"
        >
          <div>
            <div className="font-bold text-lg">10 Min Boost</div>
            <div className="text-xs text-neutral-400">Seen by 10k users</div>
          </div>
          <div className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-neutral-200 min-w-[80px] flex justify-center">
            {loading === '10min' ? <Loader2 className="animate-spin h-4 w-4" /> : '$5.00'}
          </div>
        </button>

        {/* 1 Hour Boost */}
        <button 
          onClick={() => buyBoost('1hour')}
          disabled={!!loading}
          className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex justify-between items-center relative overflow-hidden w-full text-left hover:border-purple-500/50 transition-colors"
        >
          <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-bl-lg">
            POPULAR
          </div>
          <div>
            <div className="font-bold text-lg text-purple-400">1 Hour Hype</div>
            <div className="text-xs text-neutral-400">Global visibility + Push</div>
          </div>
          <div className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-500 min-w-[80px] flex justify-center">
            {loading === '1hour' ? <Loader2 className="animate-spin h-4 w-4" /> : '$15.00'}
          </div>
        </button>
      </div>
      
      <div className="mt-8">
         <h2 className="font-bold mb-4">Subscription</h2>
         <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 opacity-75">
            <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">Pro Member</span>
                <span className="text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded">Coming Soon</span>
            </div>
            <ul className="text-xs text-neutral-400 space-y-2 list-disc pl-4">
                <li>1 Free Boost / Week</li>
                <li>Pro Profile Badge</li>
                <li>Zero Fee on Launches</li>
            </ul>
         </div>
      </div>
    </div>
  );
}
