import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

export const PathContext = createContext('');

export interface PathProviderProps {
  children: ReactNode,
  path?: string,
}

export const PathProvider = ({ children, path = '' }: PathProviderProps) => {
  const parentPath = useContext(PathContext);
  const fullPath = parentPath && path ? `${parentPath}.${path}` : parentPath || path;

  return (
    <PathContext.Provider value={fullPath}>
      {children}
    </PathContext.Provider>
  );
};

export const usePathContext = () => {
  return useContext(PathContext);
};

export const useFullPath = (fieldName: string): string => {
  const parentPath = useContext(PathContext);
  return parentPath ? `${parentPath}.${fieldName}` : fieldName;
};