import { useEffect } from 'react';

/**
 * Hook para paneles laterales: bloquea el scroll del body, cierra con Escape
 * y devuelve el foco al elemento que abrió el panel
 */
export const usePanel = (show: boolean, onClose: () => void) => {
  useEffect(() => {
    if (!show) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const opener = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', handleKeyDown);
      opener?.focus({ preventScroll: true });
    };
  }, [show, onClose]);
};
