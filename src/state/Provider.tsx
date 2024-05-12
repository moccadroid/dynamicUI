import type { FC, ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';
import OpenAI from 'openai';
import ChatCompletion = OpenAI.ChatCompletion;
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';

// Create a context
const StateContext = createContext<StateContextType | undefined>(undefined);

interface StateContextType {
  state: any; // Replace 'any' with your state type
  setState: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with your state type
}

export interface State {
  layout: LayoutConfig | undefined;
  layoutName: string | undefined;
  app: {
    layoutHistory: LayoutConfig[];
    layoutHistoryIndex: number;
    promptHistory: string[],
    currentPrompt: string;
    completion?: ChatCompletion;
    selectedDefinitions: string[];
  },
  data: any;
  exampleData: any;
  stats: {
    inputToken: number;
    outputToken: number;
    totalToken: number;
  },
  [key: string]: any;
}

// Create a provider component
export const StateProvider: FC<{ children: ReactNode, initialState: State }> = ({ children, initialState }) => {
  const [state, setState] = useState<State>(initialState);

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to consume the state
export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateValue must be used within a StateProvider');
  }
  return {
    ...context,
    state: context.state as State,
  };
};
