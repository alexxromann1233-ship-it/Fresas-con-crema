import { useEffect } from 'react';

/**
 * Hook para paneles laterales: bloquea el scroll del body y cierra con Escape
 */
export const usePanel = (show: boolean, onClose: () => void) => {
  useEffect(() => {
    if (!show) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, onClose]);
};
