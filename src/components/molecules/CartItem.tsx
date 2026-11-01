import { motion, AnimatePresence } from 'framer-motion';
import type { CartItem } from '../../constants/types';
import { useAppStore } from '../../store/appStore';
import { formatMoney } from '../../utils/formats';

interface CartItemProps {
  item: CartItem;
}

const QTY_BTN_CLASS =
  'size-9 flex items-center justify-center rounded-full text-(--app-color-primary) cursor-pointer transition-[background-color,color,transform] duration-300 hover:bg-(--app-btn-bg) hover:text-(--app-btn-color) active:scale-[0.9]';

/**
 * Elemento de carrito
 */
export function CartItem({ item }: Readonly<CartItemProps>) {
  const handleAddProduct = useAppStore((s) => s.handleAddProduct);
  const handleRemoveProduct = useAppStore((s) => s.handleRemoveProduct);
  const handleDeleteFromCart = useAppStore((s) => s.handleDeleteFromCart);

  return (
    <article className='py-5 px-6'>
      <div className='flex gap-4'>
        <div className='w-20 md:w-24 shrink-0'>
          <img
            className='w-full aspect-square rounded-2xl object-contain'
            src={item.thumbnail}
            alt={item.name}
            loading='lazy'
          />
        </div>
        <div className='min-w-0 w-full flex flex-col justify-between gap-2'>
          <div className='flex justify-between items-start gap-2'>
            <div className='min-w-0 flex flex-col'>
              <span className='text-secondary font-secondary font-semibold leading-snug'>
                {item.name}
              </span>
              <span className='text-secondary-50 font-secondary text-sm'>
                {formatMoney(item.price)} c/u
              </span>
            </div>
            <button
              type='button'
              aria-label={`Eliminar ${item.name} del carrito`}
              className='shrink-0 size-9 -mt-1.5 me-1 flex items-center justify-center rounded-full text-secondary-50 cursor-pointer transition-[background-color,color,transform] duration-300 hover:bg-red-600/10 hover:text-red-600 active:scale-[0.9]'
              onClick={() => handleDeleteFromCart(item.id)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='18'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path d='M18 6 6 18M6 6l12 12' />
              </svg>
            </button>
          </div>
          <div className='flex justify-between items-end gap-2'>
            <span className='text-primary font-primary text-2xl'>
              {formatMoney(item.total)}
            </span>
            <div className='flex items-center gap-1 rounded-full bg-body-secondary p-1'>
              <button
                type='button'
                aria-label={`Quitar una unidad de ${item.name}`}
                className={QTY_BTN_CLASS}
                onClick={() => handleRemoveProduct(item)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d='M5 12h14' />
                </svg>
              </button>
              <span
                className='w-7 h-9 flex items-center justify-center overflow-hidden text-secondary font-secondary font-bold'
                aria-live='polite'
              >
                <AnimatePresence mode='popLayout' initial={false}>
                  <motion.span
                    key={item.quantity}
                    initial={{ y: -12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 12, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.quantity}
                  </motion.span>
                </AnimatePresence>
              </span>
              <button
                type='button'
                aria-label={`Agregar una unidad de ${item.name}`}
                className={QTY_BTN_CLASS}
                onClick={() => handleAddProduct(item)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d='M5 12h14M12 5v14' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
