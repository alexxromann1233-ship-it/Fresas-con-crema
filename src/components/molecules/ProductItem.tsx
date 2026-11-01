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
    <article
      className={`${width} group shrink-0 flex flex-col items-center text-center rounded-3xl bg-white ring-1 ring-black/5 shadow-[0_16px_40px_-26px_rgba(238,30,37,0.45)] p-2.5 md:p-3 transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_26px_50px_-24px_rgba(238,30,37,0.55)]`}
    >
      <div className='relative w-full overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 mb-3'>
        <img
          className='w-full aspect-square object-contain select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-108'
          src={item.thumbnail}
          alt={item.name}
          loading='lazy'
          decoding='async'
          draggable={false}
        />
        {item.description && (
          <span className='absolute top-2 start-2 rounded-full bg-body-secondary px-2.5 py-0.5 font-secondary text-xs font-bold text-primary'>
            {item.description}
          </span>
        )}
        <AnimatePresence>
          {quantity && (
            <motion.span
              key='quantity'
              className='absolute top-2 end-2 min-w-7 h-7 flex items-center justify-center rounded-full bg-(--app-color-primary) text-white font-secondary text-sm font-bold shadow-md shadow-(--app-color-primary)/30 px-2'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 500 }}
              aria-label={`${quantity} en el carrito`}
            >
              <AnimatePresence mode='popLayout' initial={false}>
                <motion.span
                  key={quantity}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {quantity}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <span className='w-full text-secondary font-secondary font-semibold leading-snug line-clamp-2 px-1'>
        {item.name}
      </span>
      <span className='text-primary text-2xl md:text-3xl font-primary mt-1 mb-3'>
        {formatMoney(item.price)}
      </span>
      <Button
        className='w-full mt-auto text-sm md:text-base'
        padding='py-2.5 px-4'
        aria-label={`Agregar ${item.name}`}
        onClick={() => handleAddProduct(item)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={16}
          height={16}
          fill='none'
          stroke='currentColor'
          strokeWidth='2.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          viewBox='0 0 24 24'
          aria-hidden='true'
          className='transition-transform duration-300 group-hover:rotate-90'
        >
          <path d='M5 12h14' />
          <path d='M12 5v14' />
        </svg>
        Agregar
      </Button>
    </article>
  );
}
