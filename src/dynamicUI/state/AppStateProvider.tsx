import type { FC, ReactNode } from 'react';
import { useContext } from 'react';
import { useMemo } from 'react';
import { createContext } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export interface AppState {
  loadingStates: { [key: string]: boolean };
  [key: string]: any;
}

export interface AppStateProps {
  children: ReactNode;
  initialState: AppState;
}

export type SetAppState = (path: string, value: unknown) => void;
export type GetAppState = <T,>(path: string) => T | undefined;

export interface AppStateContextType {
  appState: AppState;
  setAppState: SetAppState;
  getAppState: GetAppState;
  loadingStates: { [key: string]: boolean };
  setLoading: (key: string, state: boolean) => void;
}

export const AppStateProvider: FC<AppStateProps> = ({ children, initialState }) => {
  const [state, setState] = useState<AppState>(initialState ?? {});
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

  console.log('appState', state);

  const setLoading = (key: string, state: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: state }));
  };

  const setAppState = useCallback((field: string, value: any) => {
    if (field === 'layout') {
      setLayout(value as LayoutConfig);
    } else {
      setState(prevState => setNestedValue(prevState, field, value));
    }
  }, []);

  const getAppState = useCallback(<T,>(field: string) => {
    return getNestedValue<T>(state, field);
  }, [state]);

  const setLayout = (layout?: LayoutConfig) => {
    const history = state.app.layoutHistory;
    let index = state.app.layoutHistoryIndex;
    if (layout) {
      history.push(layout);
      index = history.length - 1;
    }
    setState(prevState => setNestedValue(prevState, 'layout', layout));
    setAppState('layoutHistory', history);
    setAppState('app.layoutHistoryIndex', index);
  };

  const value: AppStateContextType = useMemo((): AppStateContextType  => {
    return {
      setAppState,
      getAppState,
      appState: state,
      loadingStates,
      setLoading,
    };
  }, [state]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('AppStateContext can only be used within AppStateProvider');
  }

  return context;
};


function getNestedValue<T>(obj: any, path: string): T | undefined {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj) as T | undefined;
}

function setNestedValue(obj: any, path: string, value: any): any {
  const parts = path.split('.');
  const last = parts.pop()!;
  const newObj = { ...obj };

  let current = newObj;
  parts.forEach(part => {
    if (!current[part]) {
      current[part] = {};
    }
    current = current[part] = { ...current[part] };
  });
  current[last] = value;

  return newObj;
}
