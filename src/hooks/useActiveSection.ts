import { useEffect, useState } from 'react';

/**
 * Hook para detectar la sección visible según el scroll (scrollspy)
 */
export const useActiveSection = (ids: readonly string[]) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollY, innerHeight } = window;
      const atBottom =
        scrollY + innerHeight >= document.documentElement.scrollHeight - 4;

      if (atBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }

      // La sección activa es la última cuyo borde superior cruzó el 40% de la pantalla
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= innerHeight * 0.4) {
          current = id;
        }
      }
      setActive(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [ids]);

  return active;
};
