"use client";
import { createContext, useContext, useState, useCallback } from "react";

interface PipState {
  embedUrl: string;
  streamUrl?: string | null;
  title?: string;
  poster?: string | null;
}

interface PipContextType {
  pip: PipState | null;
  setPip: (state: PipState) => void;
  clearPip: () => void;
}

const PipContext = createContext<PipContextType>({
  pip: null,
  setPip: () => {},
  clearPip: () => {},
});

export function PipProvider({ children }: { children: React.ReactNode }) {
  const [pip, setPipState] = useState<PipState | null>(null);
  const setPip  = useCallback((state: PipState) => setPipState(state), []);
  const clearPip = useCallback(() => setPipState(null), []);
  return (
    <PipContext.Provider value={{ pip, setPip, clearPip }}>
      {children}
    </PipContext.Provider>
  );
}

export const usePip = () => useContext(PipContext);
