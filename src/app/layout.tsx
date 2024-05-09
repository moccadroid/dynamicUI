'use client';

import type { State } from '@/state/Provider';
import { StateProvider } from '@/state/Provider';
import { Providers } from './providers';
import type { ReactNode } from 'react';
import { userData } from '@/api/db/dataAndLayouts';
import componentConfig from '@/dynamicUI/ai/definitions/componentConfig.json';

const initialState: State = {
  app: {
    promptHistory: [],
    currentPrompt: '',
    selectedDefinitions: Object.keys(componentConfig),
  },
  layout: undefined,
  exampleData: userData.data,
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
