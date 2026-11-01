import type { CartItem } from '../../constants/types';
import { useAppStore } from '../../store/appStore';
import { formatMoney } from '../../utils/formats';

interface CartItemProps {
  item: CartItem;
}

const QTY_BTN_CLASS =
  'size-10 flex items-center justify-center border text-lg font-semibold cursor-pointer transition-colors duration-300 hover:bg-(--app-btn-bg) active:bg-(--app-btn-bg-hover) border-(--app-btn-bg) active:border-(--app-btn-bg-hover) text-(--app-btn-bg) hover:text-(--app-btn-color) active:text-(--app-btn-color-hover)';

/**
 * Elemento de carrito
 */
export function CartItem({ item }: Readonly<CartItemProps>) {
  const handleAddProduct = useAppStore((s) => s.handleAddProduct);
  const handleRemoveProduct = useAppStore((s) => s.handleRemoveProduct);
  const handleDeleteFromCart = useAppStore((s) => s.handleDeleteFromCart);

  return (
    <article className='py-5 px-6 border-b border-black/5 last:border-b-0'>
      <div className='flex gap-4'>
        <div className='w-20 md:w-24 shrink-0'>
          <img
            className='w-full aspect-square rounded-xl object-contain'
            src={item.thumbnail}
            alt={item.name}
            loading='lazy'
          />
        </div>
        <div className='min-w-0 w-full flex flex-col justify-between gap-2'>
          <div className='flex justify-between items-start gap-2'>
            <span className='text-secondary font-secondary font-semibold leading-snug'>
              {item.name}
            </span>
            <button
              type='button'
              aria-label={`Eliminar ${item.name} del carrito`}
              className='shrink-0 size-10 -mt-2 -me-2 flex items-center justify-center rounded-full text-red-600 cursor-pointer transition-colors duration-300 hover:bg-red-600/10'
              onClick={() => handleDeleteFromCart(item.id)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                viewBox='0 0 16 16'
                aria-hidden='true'
              >
                <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z' />
                <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z' />
              </svg>
            </button>
          </div>
          <div className='flex justify-between items-end gap-2'>
            <span className='text-primary font-primary text-2xl'>
              {formatMoney(item.total)}
            </span>
            <div className='flex'>
              <button
                type='button'
                aria-label={`Quitar una unidad de ${item.name}`}
                className={`${QTY_BTN_CLASS} rounded-s-full ps-1`}
                onClick={() => handleRemoveProduct(item)}
              >
                -
              </button>
              <span
                className='w-10 h-10 flex items-center justify-center border-y border-(--app-color-primary) font-secondary font-semibold'
                aria-live='polite'
              >
                {item.quantity}
              </span>
              <button
                type='button'
                aria-label={`Agregar una unidad de ${item.name}`}
                className={`${QTY_BTN_CLASS} rounded-e-full pe-1`}
                onClick={() => handleAddProduct(item)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
