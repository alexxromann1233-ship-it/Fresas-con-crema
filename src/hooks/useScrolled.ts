import { useEffect, useState } from 'react';

/**
 * Hook para saber si la página se ha desplazado más allá de un umbral
 */
export const useScrolled = (threshold = 8) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
};
