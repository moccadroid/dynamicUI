'use client';

import type { State } from '@/state/Provider';
import { ChakraProviders } from './providers';
import type { ReactNode } from 'react';
import { userData } from '@/api/db/dataAndLayouts';
import componentConfig from '@/dynamicUI/ai/definitions/componentConfig.json';
import { AppStateProvider } from '@/dynamicUI/state/AppStateProvider';

const initialState: State = {
  app: {
    layoutHistory: [],
    layoutHistoryIndex: -1,
    promptHistory: [],
    currentPrompt: '',
    selectedDefinitions: Object.keys(componentConfig),
    screenshot: undefined,
  },
  layout: undefined,
  layoutName: undefined,
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
        <ChakraProviders>
          <AppStateProvider initialState={initialState}>
            {children}
          </AppStateProvider>
        </ChakraProviders>
      </body>
    </html>
  );
}
