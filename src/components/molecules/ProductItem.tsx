import { motion, AnimatePresence } from 'framer-motion';
import type { Item } from '../../constants/types';
import { useAppStore } from '../../store/appStore';
import { formatMoney } from '../../utils/formats';
import { Button } from '../atoms/Button';

interface ProductItemProps {
  width?: string;
  item: Item;
}

/**
 * Elemento de producto
 */
export function ProductItem({
  width = 'w-50',
  item,
}: Readonly<ProductItemProps>) {
  const cart = useAppStore((s) => s.cart);
  const handleAddProduct = useAppStore((s) => s.handleAddProduct);
  const quantity = cart.find((i) => i.id === item.id)?.quantity;

  return (
    <article className={`${width} shrink-0 flex flex-col items-center text-center`}>
      <img
        className='w-full aspect-square rounded-2xl object-contain select-none pointer-events-none mb-3'
        src={item.thumbnail}
        alt={item.name}
        loading='lazy'
        decoding='async'
        draggable={false}
      />
      <span className='w-full text-secondary font-secondary font-semibold leading-snug line-clamp-2'>
        {item.name}
      </span>
      {item.description && (
        <span className='text-secondary-50 font-secondary text-sm leading-6'>
          {item.description}
        </span>
      )}
      <span className='text-primary text-3xl font-primary mt-1 mb-4'>
        {formatMoney(item.price)}
      </span>
      <div className='relative w-full mt-auto'>
        <AnimatePresence>
          {quantity && (
            <motion.div
              className='absolute z-1 top-[2%] start-[98%] translate-[-50%]'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 500 }}
            >
              <span className='bg-white border-3 border-(--app-color-primary) text-primary font-bold rounded-full text-sm pt-0.5 pb-1 px-2'>
                {quantity}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          className='w-full'
          aria-label={`Agregar ${item.name}`}
          onClick={() => handleAddProduct(item)}
        >
          Agregar
        </Button>
      </div>
    </article>
  );
}
