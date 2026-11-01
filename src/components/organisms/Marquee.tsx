import clsx from 'clsx';
import type { Item } from '../../constants/types';
import { useMarquee } from '../../hooks/useMarquee';
import { ProductItem } from '../molecules/ProductItem';

interface MarqueeProps {
  items: Item[];
  direction?: 1 | -1;
  itemWidth?: string;
  className?: string;
  trackClassName?: string;
}

/**
 * Carrusel infinito de productos con arrastre e inercia
 */
export function Marquee({
  items,
  direction = 1,
  itemWidth,
  className,
  trackClassName,
}: Readonly<MarqueeProps>) {
  const { containerRef, trackRef } = useMarquee(direction);

  return (
    <div
      ref={containerRef}
      className={clsx(
        'marquee-fade relative flex w-full overflow-hidden touch-pan-y py-6 cursor-grab active:cursor-grabbing select-none',
        className
      )}
    >
      {/* Capa propia en la GPU: moverla no obliga a repintar las tarjetas */}
      <div
        ref={trackRef}
        className={clsx('flex shrink-0 items-stretch will-change-transform', trackClassName)}
      >
        {[...items, ...items].map((item, i) => (
          <ProductItem
            key={`${item.id}-${i}`}
            width={itemWidth}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}
