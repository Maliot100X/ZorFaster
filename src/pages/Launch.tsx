import { useState } from 'react';
import { Rocket, Loader2, ImagePlus, AlertCircle, Coins, FileText, Percent } from 'lucide-react';
import sdk from '@farcaster/frame-sdk';
import { createWalletClient, custom, createPublicClient, http, parseEther } from 'viem';
import { base } from 'viem/chains';
import { createCreatorClient } from '@zoralabs/protocol-sdk';

export default function Launch() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [imageURI, setImageURI] = useState('');
  const [price, setPrice] = useState('0');
  const [royalty, setRoyalty] = useState('5');
  const [description, setDescription] = useState('');
  
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

      // Real Zora Deployment Logic
      const { parameters } = await creatorClient.create1155({
        contract: {
          name: name,
          uri: imageURI, // Note: In prod, this should be the IPFS hash of a JSON metadata file
        },
        token: {
          tokenMetadataURI: imageURI,
          salesConfig: {
            pricePerToken: parseEther(price),
            saleStart: 0n,
            saleEnd: 18446744073709551615n, // Forever
            maxTokensPerAddress: 0n, // Unlimited
          },
          royaltyBPS: Number(royalty) * 100, // 5% = 500 bps
          payoutRecipient: address,
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
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-warp-text">Launch Collection</h1>
          <span className="text-[10px] bg-warp-surface border border-warp-border px-2 py-1 rounded text-warp-text-muted">ERC-1155</span>
      </div>
      
      {/* Image Uploader */}
      <div className="group relative w-full h-48 bg-warp-surface rounded-2xl border-2 border-dashed border-warp-border hover:border-warp-active transition-colors flex flex-col items-center justify-center overflow-hidden cursor-pointer">
        {imageURI ? (
            <img src={imageURI} alt="Preview" className="w-full h-full object-cover" />
        ) : (
            <>
                <div className="bg-warp-bg p-3 rounded-full mb-3">
                    <ImagePlus className="text-warp-text-muted group-hover:text-warp-active transition-colors" />
                </div>
                <span className="text-xs text-warp-text-muted font-medium">Tap to upload cover image</span>
            </>
        )}
        <input 
            type="text" 
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => setImageURI(e.target.value)} 
            placeholder="Paste URL..."
        />
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-warp-text-muted ml-1">Name</label>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-warp-surface border border-warp-border rounded-xl p-3 text-warp-text text-sm focus:outline-none focus:border-warp-active transition-all placeholder:text-warp-text-muted/50" 
                    placeholder="Collection Name" 
                />
            </div>
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-warp-text-muted ml-1">Symbol</label>
                <input 
                    type="text" 
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="w-full bg-warp-surface border border-warp-border rounded-xl p-3 text-warp-text text-sm focus:outline-none focus:border-warp-active transition-all placeholder:text-warp-text-muted/50" 
                    placeholder="$TOKEN" 
                />
            </div>
        </div>

        <div className="space-y-1.5">
            <label className="text-xs font-medium text-warp-text-muted ml-1 flex items-center gap-1">
                <FileText size={12} /> Description
            </label>
            <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-warp-surface border border-warp-border rounded-xl p-3 text-warp-text text-sm focus:outline-none focus:border-warp-active transition-all placeholder:text-warp-text-muted/50 min-h-[80px]" 
                placeholder="What is this collection about?" 
            />
        </div>

        {/* Advanced Config */}
        <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-warp-text-muted ml-1 flex items-center gap-1">
                    <Coins size={12} /> Price (ETH)
                </label>
                <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-warp-surface border border-warp-border rounded-xl p-3 text-warp-text text-sm focus:outline-none focus:border-warp-active transition-all" 
                />
            </div>
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-warp-text-muted ml-1 flex items-center gap-1">
                    <Percent size={12} /> Royalty %
                </label>
                <input 
                    type="number" 
                    value={royalty}
                    onChange={(e) => setRoyalty(e.target.value)}
                    className="w-full bg-warp-surface border border-warp-border rounded-xl p-3 text-warp-text text-sm focus:outline-none focus:border-warp-active transition-all" 
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
        className="w-full bg-warp-active text-white font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-warp-active/20"
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
      
      <div className="text-center space-y-1">
          <p className="text-[10px] text-warp-text-muted">
            Powered by Zora Protocol on Base
          </p>
      </div>
    </div>
  );
}
