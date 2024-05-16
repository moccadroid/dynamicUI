import type { FC, ReactNode } from 'react';
import { useContext } from 'react';
import { useMemo } from 'react';
import { createContext } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export interface AppState {
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
}

export const AppStateProvider: FC<AppStateProps> = ({ children, initialState }) => {
  const [state, setState] = useState<AppState>(initialState ?? {});

  const setAppState = useCallback((field: string, value: any) => {
    setState(prevState => setNestedValue(prevState, field, value));
  }, []);

  const getAppState = useCallback(<T,>(field: string) => {
    return getNestedValue<T>(state, field);
  }, [state]);

  const value: AppStateContextType = useMemo((): AppStateContextType  => {
    return { setAppState, getAppState, appState: state };
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
