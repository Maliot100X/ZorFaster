import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import sdk from '@farcaster/frame-sdk';
import { useEffect, useState } from 'react';

export function Layout() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        await sdk.actions.ready();
        setIsSDKLoaded(true);
      } catch (err) {
        console.error("Frame SDK failed to load:", err);
      }
    };
    load();
  }, []);

  if (!isSDKLoaded) {
    return (
        <div className="min-h-screen bg-warp-bg text-warp-text flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-warp-active"></div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-warp-bg text-warp-text pb-[80px] font-sans overflow-x-hidden selection:bg-warp-active/30">
      <main className="px-4 pt-4 max-w-md mx-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
