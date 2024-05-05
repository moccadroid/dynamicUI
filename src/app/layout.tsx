'use client';
// app/layout.tsx
import type { State } from '@/state/Provider';
import { StateProvider } from '@/state/Provider';
import { Providers } from './providers';
import type { ReactNode } from 'react';
import { userData } from '@/api/db/dataAndLayouts';

const initialState: State = {
  app: {
    promptHistory: [],
    currentPrompt: '',
  },
  layout: undefined,
  data: userData.data,
  stats: {
    inputToken: 0,
    outputToken: 0,
    totalToken: 0,
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang='en'>
      <body>
        <Providers>
          <StateProvider initialState={initialState}>
            {children}
          </StateProvider>
        </Providers>
      </body>
    </html>
  );
}
