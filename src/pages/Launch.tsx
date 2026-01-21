import { useState } from 'react';
import { Rocket, Loader2, ImagePlus, AlertCircle } from 'lucide-react';
import sdk from '@farcaster/frame-sdk';
import { createWalletClient, custom, createPublicClient, http } from 'viem';
import { base } from 'viem/chains';
import { createCreatorClient } from '@zoralabs/protocol-sdk';

export default function Launch() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [imageURI, setImageURI] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleDeploy = async () => {
    if (!name || !symbol || !imageURI) return;
    
    setIsDeploying(true);
    setStatus('Initializing...');
    setError('');

    try {
      const walletClient = createWalletClient({
        chain: base,
        transport: custom(sdk.wallet.ethProvider),
      });

      const publicClient = createPublicClient({
        chain: base,
        transport: http(),
      });

      // @ts-ignore
      const creatorClient = createCreatorClient({ chainId: base.id, publicClient });
      
      const [address] = await walletClient.getAddresses();
      if (!address) throw new Error("No wallet connected");
      
      setStatus('Preparing Contract...');

      const { parameters } = await creatorClient.create1155({
        contract: {
          name: name,
          uri: imageURI,
        },
        token: {
          tokenMetadataURI: imageURI,
          salesConfig: {
            pricePerToken: 0n,
          }
        },
        account: address,
      });

      setStatus('Please Sign Transaction...');

      // @ts-ignore
      const hash = await walletClient.sendTransaction({
        ...parameters,
        chain: base,
        account: address,
      });

      setStatus(`Success! TX: ${hash.slice(0, 6)}...`);
      
      setTimeout(() => {
        setIsDeploying(false);
        setStatus('');
        setName('');
        setSymbol('');
        setImageURI('');
      }, 5000);

    } catch (error) {
      console.error(error);
      setError((error as Error).message);
      setIsDeploying(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-white">Launch Token</h1>
      
      {/* Image Uploader Simulation */}
      <div className="group relative w-32 h-32 mx-auto bg-[#1C1C1E] rounded-2xl border-2 border-dashed border-[#2D2D2E] hover:border-purple-500 transition-colors flex flex-col items-center justify-center overflow-hidden cursor-pointer">
        {imageURI ? (
            <img src={imageURI} alt="Preview" className="w-full h-full object-cover" />
        ) : (
            <>
                <ImagePlus className="text-[#8A8A8E] mb-2 group-hover:text-purple-500 transition-colors" />
                <span className="text-[10px] text-[#8A8A8E]">Paste URL</span>
            </>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#8A8A8E] ml-1">Image URL (IPFS/HTTP)</label>
          <input 
            type="text" 
            value={imageURI}
            onChange={(e) => setImageURI(e.target.value)}
            className="w-full bg-[#1C1C1E] border border-[#2D2D2E] rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-[#48484A]" 
            placeholder="https://..." 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#8A8A8E] ml-1">Name</label>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1C1C1E] border border-[#2D2D2E] rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-[#48484A]" 
                    placeholder="Based Cat" 
                />
            </div>
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#8A8A8E] ml-1">Symbol</label>
                <input 
                    type="text" 
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="w-full bg-[#1C1C1E] border border-[#2D2D2E] rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-[#48484A]" 
                    placeholder="BCAT" 
                />
            </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex items-start gap-2">
            <AlertCircle className="text-red-500 shrink-0" size={16} />
            <p className="text-xs text-red-400">{error}</p>
        </div>
      )}

      <button 
        onClick={handleDeploy}
        disabled={isDeploying || !name || !symbol || !imageURI}
        className="w-full bg-white text-black font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isDeploying ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            <span className="text-sm">{status}</span>
          </>
        ) : (
          <>
            <Rocket size={18} />
            <span>Deploy to Base</span>
          </>
        )}
      </button>
      
      <p className="text-center text-[10px] text-[#48484A]">
        Deployment costs ~0.0001 ETH (Gas only).
      </p>
    </div>
  );
}
