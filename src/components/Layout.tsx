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

  return (
    <div className="min-h-screen bg-black text-white pb-20 font-sans">
      <main className="px-4 pt-4">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
