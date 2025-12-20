'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface LoaderContextType {
  isDone: boolean;
  setIsDone: (val: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isDone, setIsDone] = useState(false);

  return (
    <LoaderContext.Provider value={{ isDone, setIsDone }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
}
