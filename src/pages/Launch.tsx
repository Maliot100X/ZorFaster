import { useState } from 'react';
import { Rocket, Loader2 } from 'lucide-react';
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

  const handleDeploy = async () => {
    if (!name || !symbol || !imageURI) return;
    
    setIsDeploying(true);
    setStatus('Initializing...');

    try {
      // 1. Setup Client using Frame Provider
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
      
      setStatus('Preparing Transaction...');

      // 2. Prepare Zora 1155 Deployment
      const { parameters } = await creatorClient.create1155({
        contract: {
          name: name,
          uri: imageURI, // In prod, upload to IPFS first
        },
        token: {
          tokenMetadataURI: imageURI,
          salesConfig: {
            pricePerToken: 0n, // Free mint for now
          }
        },
        account: address,
      });

      setStatus('Waiting for Signature...');

      // 3. Send Transaction
      // @ts-ignore
      const hash = await walletClient.sendTransaction({
        ...parameters,
        chain: base,
        account: address,
      });

      setStatus(`Deployed! Hash: ${hash.slice(0, 6)}...`);
      console.log('Deployed:', hash);
      
      // Reset after success
      setTimeout(() => {
        setIsDeploying(false);
        setStatus('');
        setName('');
        setSymbol('');
        setImageURI('');
      }, 5000);

    } catch (error) {
      console.error(error);
      setStatus('Failed: ' + (error as Error).message);
      setIsDeploying(false);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      <h1 className="text-2xl font-bold">Launch Token</h1>
      
      <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 text-center space-y-4">
        <div className="w-24 h-24 bg-neutral-800 rounded-full mx-auto flex items-center justify-center border-2 border-dashed border-neutral-700 overflow-hidden">
          {imageURI ? (
            <img src={imageURI} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <Rocket className="text-neutral-500" />
          )}
        </div>
        <p className="text-sm text-neutral-400">
          {imageURI ? 'Image Loaded' : 'Paste Image URL below'}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-neutral-400 mb-1">Image URL</label>
          <input 
            type="text" 
            value={imageURI}
            onChange={(e) => setImageURI(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500" 
            placeholder="https://..." 
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-400 mb-1">Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500" 
            placeholder="e.g. Based Cat" 
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-400 mb-1">Symbol</label>
          <input 
            type="text" 
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500" 
            placeholder="e.g. BCAT" 
          />
        </div>
      </div>

      <button 
        onClick={handleDeploy}
        disabled={isDeploying || !name || !symbol || !imageURI}
        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        {isDeploying ? (
          <>
            <Loader2 className="animate-spin" />
            {status}
          </>
        ) : (
          'Deploy to Base'
        )}
      </button>
    </div>
  );
}
