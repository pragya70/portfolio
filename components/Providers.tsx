'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0f0f1a',
            color: '#e2e8f0',
            border: '1px solid rgba(0,243,255,0.2)',
          },
          success: { iconTheme: { primary: '#00ff87', secondary: '#05050a' } },
          error: { iconTheme: { primary: '#ff00ea', secondary: '#05050a' } },
        }}
      />
    </SessionProvider>
  );
}
