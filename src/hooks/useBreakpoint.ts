import { useState, useEffect } from 'react';

// Определяем все брейкпоинты в одном месте
export const breakpoints = {
  mobile: 768, // всё до 768px считается мобильным
  tablet: 1024,
  desktop: 1280,
} as const;

export function useBreakpoint() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoints.mobile);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= breakpoints.mobile && window.innerWidth < breakpoints.tablet
  );
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= breakpoints.tablet);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < breakpoints.mobile);
      setIsTablet(width >= breakpoints.mobile && width < breakpoints.tablet);
      setIsDesktop(width >= breakpoints.tablet);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile, isTablet, isDesktop };
} 