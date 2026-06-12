'use client';

import { useEffect, useState } from 'react';

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setProgress(100), 50);
    const t2 = setTimeout(() => setFading(true), 1200);
    const t3 = setTimeout(() => setGone(true), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{ background: '#05050a', opacity: fading ? 0 : 1, transition: 'opacity 0.6s ease' }}
    >
      <h1
        className="text-3xl font-bold font-mono tracking-widest"
        style={{ background: 'linear-gradient(to right, #00f3ff, #7000ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        INITIALIZING
      </h1>
      <div className="w-52 h-1 rounded-full overflow-hidden mt-5" style={{ background: 'rgba(255,255,255,0.1)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: 'linear-gradient(to right, #00f3ff, #7000ff)' }}
        />
      </div>
    </div>
  );
}
