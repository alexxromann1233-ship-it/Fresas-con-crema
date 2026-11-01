import { motion } from 'framer-motion';
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
  const { x, containerRef, trackRef } = useMarquee(direction);

  return (
    <div
      ref={containerRef}
      className={clsx(
        'marquee-fade relative flex w-full overflow-hidden py-3 cursor-grab active:cursor-grabbing select-none',
        className
      )}
    >
      <motion.div
        ref={trackRef}
        style={{ x }}
        className={clsx('flex shrink-0 items-stretch', trackClassName)}
      >
        {[...items, ...items].map((item, i) => (
          <ProductItem
            key={`${item.id}-${i}`}
            width={itemWidth}
            item={item}
          />
        ))}
      </motion.div>
    </div>
  );
}
