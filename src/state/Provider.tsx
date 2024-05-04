import type { FC, ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';

// Create a context
const StateContext = createContext<StateContextType | undefined>(undefined);

interface StateContextType {
  state: any; // Replace 'any' with your state type
  setState: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with your state type
}

// Create a provider component
export const StateProvider: FC<{ children: ReactNode, initialState: any }> = ({ children, initialState }) => {
  const [state, setState] = useState(initialState);

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
  return context;
};
