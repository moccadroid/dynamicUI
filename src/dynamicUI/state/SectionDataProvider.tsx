import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { createContext, useState, useMemo } from 'react';
import type { Actions } from '@/dynamicUI/actions/actions';
import { internalActions } from '@/dynamicUI/actions/actions';

const SectionDataContext = createContext<SectionDataContextType | undefined>(undefined);

interface SectionContextState {
  [key: string]: unknown;
}

export interface SectionDataProviderProps {
  children: ReactNode,
  initialData: SectionContextState;
  actions?: Actions;
}

interface SectionDataContextType {
  sectionActions: Actions,
  sectionState: SectionContextState,
  setSectionState: (path: string, value: unknown) => void;
  getSectionState: <T,>(path: string) => T | undefined;  // You can specify a return type more specific than `any`
}

export const SectionDataProvider = ({ children, initialData, actions }: SectionDataProviderProps) => {
  const [state, setState] = useState<SectionContextState>(initialData);
  const sectionActions = { ...internalActions, ...actions };

  useEffect(() => {
    setState(initialData);
  }, [initialData]);

  const parsePath = (path: string) => {
    // This function splits paths and translates array access into plain keys
    const pathArray = path.match(/[^.[\]]+|\[\d+]/g) ?? [];
    return pathArray.map(segment => segment.replace(/^\[(\d+)]$/, '$1'));  // Convert ['0'] to '0' for array access
  };

  const getStateFromPath = useCallback(<T,>(path: string): T | undefined => {
    const parts = parsePath(path);
    const result = parts.reduce((acc: unknown, part: string) => {
      if (acc && typeof acc === 'object') {
        if (Array.isArray(acc) && /^\d+$/.test(part)) {
          return acc[parseInt(part)];
        } else if (part in acc) {
          return (acc as Record<string, unknown>)[part];
        }
      }
      return undefined;
    }, state as unknown);
    return result as T;
  },[state]);

  const setStateAtPath = useCallback((path: string, value: unknown): void => {
    const keys = path.split('.').map(key => key.replace(/\[(\d+)\]/g, '.$1')); // Handle array indices
    const lastKey = keys.pop();
    const lastObj = keys.reduce((obj, key) => {
      // Ensure each key is valid for an object, initialize if necessary
      if (typeof obj[key] !== 'object' || obj[key] === null) obj[key] = {};
      return obj[key] as Record<string, unknown>;
    }, state);

    // Set the new value
    if (lastKey) {
      (lastObj as Record<string, unknown>)[lastKey] = value;
    }

    // Trigger a state update with a new object for immutability
    setState({ ...state });
  }, [state]);

  const value = useMemo(() => ({
    setSectionState: setStateAtPath,
    getSectionState: getStateFromPath,
    sectionState: state,
    sectionActions: sectionActions
  }), [state]);

  return (
    <SectionDataContext.Provider value={value}>
      {children}
    </SectionDataContext.Provider>
  );
};

export const useSectionDataContext = (): SectionDataContextType => {
  const context = useContext(SectionDataContext);
  if (!context) {
    throw new Error('SectionDataContext can only be used within SectionDataProvider');
  }

  return context;
};
