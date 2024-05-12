import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { createContext, useState, useMemo } from 'react';

const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

interface FormDataContextState {
  [key: string]: unknown;
}

export interface FormDataProviderProps {
  children: ReactNode,
  initialData: FormDataContextState;
  //form: any;
}

interface FormDataContextType {
  setState: (path: string, value: unknown) => void;
  getState: <T,>(path: string) => T | undefined;  // You can specify a return type more specific than `any`
  //getForm: () => any;
}

export const FormDataProvider = ({ children, initialData }: FormDataProviderProps) => {
  const [state, setState] = useState<FormDataContextState>(initialData);
  //const [savedForm, setSavedForm] = useState(form);

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

  /*
  const getForm = useCallback(() => {
    return savedForm;
  }, [form]);
  */

  const value = useMemo(() => ({
    setState: setStateAtPath,
    getState: getStateFromPath,
    //getForm
  }), [state]);

  return (
    <FormDataContext.Provider value={value}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormDataContext = (): FormDataContextType => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('FormDataContext can only be used within FormDataProvider');
  }

  return context;
};
