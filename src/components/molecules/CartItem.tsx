import type { CartItem } from '../../constants/types';
import { useAppStore } from '../../store/appStore';
import { formatMoney } from '../../utils/formats';

interface CartItemProps {
  item: CartItem;
}

/**
 * Elemento de carrito
 */
export function CartItem({ item }: Readonly<CartItemProps>) {
  const handleAddProduct = useAppStore((s) => s.handleAddProduct);
  const handleRemoveProduct = useAppStore((s) => s.handleRemoveProduct);
  const handleDeleteFromCart = useAppStore((s) => s.handleDeleteFromCart);

  return (
    <article className='py-6 md:py-4 px-6 md:px-4'>
      <div className='flex gap-4'>
        <div className='w-24'>
          <img
            className='aspect-square object-contain'
            src={item.thumbnail}
            alt={`Thumbnail de ${item.name}`}
          />
        </div>
        <div className='w-full flex flex-col justify-between'>
          <div className='flex justify-between'>
            <span className='text-secondary font-secondary font-semibold'>
              {item.name}
            </span>
            <button
              type='button'
              className='text-red-600 cursor-pointer'
              onClick={() => handleDeleteFromCart(item.id)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                viewBox='0 0 16 16'
              >
                <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z' />
                <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z' />
              </svg>
            </button>
          </div>
          <div className='flex justify-between items-end'>
            <span className='text-primary font-primary text-2xl'>
              {formatMoney(item.total)}
            </span>
            <div className='flex'>
              <button
                className='rounded-s-full border pt-0.5 pb-1 pe-2.5 ps-3 cursor-pointer transition-colors duration-300 hover:bg-(--app-btn-bg) active:bg-(--app-btn-bg-hover) border-(--app-btn-bg) active:border-(--app-btn-bg-hover) text-(--app-btn-bg) hover:text-(--app-btn-color) active:text-(--app-btn-color-hover)'
                onClick={() => handleRemoveProduct(item)}
              >
                -
              </button>
              <span className='w-11 border-y border-(--app-color-primary) text-center pt-0.5 pb-1 px-2'>
                {item.quantity}
              </span>
              <button
                className='rounded-e-full border pt-0.5 pb-1 ps-2.5 pe-3 cursor-pointer transition-colors duration-300 hover:bg-(--app-btn-bg) active:bg-(--app-btn-bg-hover) border-(--app-btn-bg) active:border-(--app-btn-bg-hover) text-(--app-btn-bg) hover:text-(--app-btn-color) active:text-(--app-btn-color-hover)'
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
