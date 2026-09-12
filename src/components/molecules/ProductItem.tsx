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
    <article className='flex flex-col items-center'>
      <div className={width}>
        <img
          className='aspect-square rounded-2xl object-contain mb-2'
          src={item.thumbnail}
          alt={`Thumbnail de ${item.name}`}
        />
      </div>
      <span className='text-secondary font-secondary font-semibold'>
        {item.name}
      </span>
      {item.description && (
        <span className='text-center text-secondary font-secondary leading-7'>
          {item.description}
        </span>
      )}
      <span className='text-primary text-3xl font-primary mb-3.5'>
        {formatMoney(item.price)}
      </span>
      <div className='relative w-full'>
        <AnimatePresence>
          {quantity && (
            <motion.div
              className='absolute top-[2%] start-[98%] translate-[-50%]'
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
        <Button className='w-full' onClick={() => handleAddProduct(item)}>
          Agregar
        </Button>
      </div>
    </article>
  );
}
