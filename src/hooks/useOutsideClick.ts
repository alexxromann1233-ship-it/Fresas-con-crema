import { type RefObject, useRef, useEffect } from 'react';

/**
 * Hook para detectar clics fuera de un componente
 */
export const useOutsideClick = <T extends HTMLElement>(
  handler: () => void,
): RefObject<T | null> => {
  const domNode = useRef<T>(null);

  useEffect(() => {
    const maybeHandler = (event: MouseEvent) => {
      if (domNode.current && !domNode.current.contains(event.target as Node)) {
        handler();
      }
    };
    document.addEventListener('mousedown', maybeHandler);
    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  }, [handler]);

  return domNode;
};
