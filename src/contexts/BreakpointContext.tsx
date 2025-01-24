import { createContext, useContext, ReactNode } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';

const BreakpointContext = createContext({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
});

export function BreakpointProvider({ children }: { children: ReactNode }) {
  const breakpoint = useBreakpoint();

  return (
    <BreakpointContext.Provider value={breakpoint}>
      {children}
    </BreakpointContext.Provider>
  );
}

export const useBreakpointContext = () => useContext(BreakpointContext); 