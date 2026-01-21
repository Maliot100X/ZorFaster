import { useState } from 'react';
import { Zap, Loader2, Check, ShieldCheck } from 'lucide-react';
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
      const ethAmount = type === '10min' ? '0.002' : '0.006';

      const hash = await walletClient.sendTransaction({
        to: PAYMENT_RECEIVER,
        value: parseEther(ethAmount),
        account: address,
        chain: base,
      });

      console.log(`Boost purchased (${type}):`, hash);
      setSuccess(`Boost Activated!`);
      
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed: ' + (error as Error).message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-white">Boost Shop</h1>

      {success && (
        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl flex items-center gap-3 text-green-500 animate-in fade-in slide-in-from-top-2">
          <Check size={20} />
          <div className="text-sm font-medium">{success}</div>
        </div>
      )}

      <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/10 p-4 rounded-2xl border border-amber-500/20">
        <div className="flex items-start gap-3">
          <div className="bg-amber-500/20 p-2 rounded-lg">
            <Zap className="text-amber-500" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-amber-500 text-sm">Boost Your Token</h3>
            <p className="text-xs text-white/70 mt-1 leading-relaxed">
              Get featured on the home screen "King of the Hill" and notify active users.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {/* 10 Min Boost */}
        <button 
          onClick={() => buyBoost('10min')}
          disabled={!!loading}
          className="group bg-[#1C1C1E] p-4 rounded-xl border border-[#2D2D2E] flex justify-between items-center w-full text-left active:scale-[0.98] transition-all hover:border-white/20"
        >
          <div>
            <div className="font-bold text-base text-white">10 Min Boost</div>
            <div className="text-xs text-[#8A8A8E] mt-0.5">~10k Impressions</div>
          </div>
          <div className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm min-w-[80px] flex justify-center group-hover:bg-neutral-200 transition-colors">
            {loading === '10min' ? <Loader2 className="animate-spin h-4 w-4" /> : '$5.00'}
          </div>
        </button>

        {/* 1 Hour Boost */}
        <button 
          onClick={() => buyBoost('1hour')}
          disabled={!!loading}
          className="group bg-[#1C1C1E] p-4 rounded-xl border border-purple-500/30 flex justify-between items-center relative overflow-hidden w-full text-left active:scale-[0.98] transition-all hover:border-purple-500/50"
        >
          <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors"></div>
          <div className="relative">
            <div className="font-bold text-base text-purple-400">1 Hour Hype</div>
            <div className="text-xs text-[#8A8A8E] mt-0.5">Global Push Notification</div>
          </div>
          <div className="relative bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm min-w-[80px] flex justify-center group-hover:bg-purple-500 transition-colors">
            {loading === '1hour' ? <Loader2 className="animate-spin h-4 w-4" /> : '$15.00'}
          </div>
        </button>
      </div>
      
      <div className="mt-8 pt-6 border-t border-[#2D2D2E]">
         <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-white text-sm">Pro Subscription</h2>
            <span className="text-[10px] bg-[#2C2C2E] text-[#8A8A8E] px-2 py-1 rounded-md font-medium">COMING SOON</span>
         </div>
         
         <div className="bg-[#1C1C1E] p-4 rounded-xl border border-[#2D2D2E] opacity-60 grayscale">
            <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={18} className="text-blue-400" />
                <span className="font-bold text-sm text-white">Creator Pass</span>
            </div>
            <ul className="text-xs text-[#8A8A8E] space-y-2">
                <li className="flex items-center gap-2">• Zero Deployment Fees</li>
                <li className="flex items-center gap-2">• Weekly Free Boost</li>
                <li className="flex items-center gap-2">• Analytics Dashboard</li>
            </ul>
         </div>
      </div>
    </div>
  );
}
