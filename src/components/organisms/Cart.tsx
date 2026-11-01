import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../../constants/config';
import { useAppStore } from '../../store/appStore';
import { formatMoney } from '../../utils/formats';
import { useWhatsAppOrder } from '../../hooks/useWhatsAppOrder';
import { Button } from '../atoms/Button';
import { CartItem } from '../molecules/CartItem';
import { Offcanvas } from '../molecules/Offcanvas';

/**
 * Carrito
 */
export function Cart() {
  const show = useAppStore((s) => s.showCart);
  const cart = useAppStore((s) => s.cart);
  const subtotal = cart.reduce((acum, item) => acum + item.total, 0);
  const total = cart.length > 0 ? subtotal + CONFIG.DELIVERY_FEE : 0;
  const count = cart.reduce((acum, item) => acum + item.quantity, 0);
  const handleToggleCart = useAppStore((s) => s.handleToggleCart);
  const clearCart = useAppStore((s) => s.clearCart);
  const handleOrder = useWhatsAppOrder();

  return (
    <Offcanvas
      show={show}
      onClose={handleToggleCart}
      title='Carrito'
      subtitle={
        count > 0
          ? `${count} ${count === 1 ? 'producto' : 'productos'}`
          : undefined
      }
      footer={
        <div className='bg-body-secondary rounded-t-3xl pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] px-6'>
          <div className='flex flex-col gap-4'>
            {cart.length > 0 && (
              <div className='flex justify-between items-center gap-4 pb-4 border-b border-dashed border-(--app-color-primary)/25'>
                <div className='flex items-start gap-3'>
                  <span className='size-9 shrink-0 flex items-center justify-center rounded-full bg-white text-(--app-color-primary)'>
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
                      <path d='M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2' />
                      <path d='M15 18H9' />
                      <path d='M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14' />
                      <circle cx='17' cy='18' r='2' />
                      <circle cx='7' cy='18' r='2' />
                    </svg>
                  </span>
                  <div className='flex flex-col'>
                    <span className='text-secondary font-secondary font-semibold'>
                      Domicilio
                    </span>
                    <span className='text-secondary-50 font-secondary text-xs leading-snug'>
                      Valor base, puede variar según la distancia
                    </span>
                  </div>
                </div>
                <span className='text-secondary font-secondary font-semibold'>
                  {formatMoney(CONFIG.DELIVERY_FEE)}
                </span>
              </div>
            )}
            <div className='flex justify-between items-center'>
              <span className='text-primary font-secondary text-2xl font-bold'>
                Total
              </span>
              <AnimatePresence mode='popLayout' initial={false}>
                <motion.span
                  key={total}
                  className='text-primary text-center text-3xl font-primary mb-0.5'
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {formatMoney(total)}
                </motion.span>
              </AnimatePresence>
            </div>
            <Button variant='whatsapp' onClick={handleOrder}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='currentColor'
                viewBox='0 0 16 16'
                aria-hidden='true'
              >
                <path d='M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232' />
              </svg>
              Pedir por WhatsApp
            </Button>
            {cart.length > 0 && (
              <button
                type='button'
                className='-mt-2 self-center inline-flex items-center gap-1.5 rounded-full py-1.5 px-3 text-red-600/80 font-secondary text-sm font-semibold cursor-pointer select-none transition-[color,transform] duration-300 hover:text-red-700 active:scale-[0.97]'
                onClick={clearCart}
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
                  <path d='M3 6h18' />
                  <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                  <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                </svg>
                Vaciar carrito
              </button>
            )}
          </div>
        </div>
      }
    >
      {cart.length > 0 ? (
        <AnimatePresence initial={false}>
          {cart.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0, x: 40 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className='overflow-hidden border-b border-black/5 last:border-b-0'
            >
              <CartItem item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      ) : (
        <motion.div
          className='h-full flex flex-col justify-center items-center text-center px-6 py-10'
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3, ease: 'easeOut' }}
        >
          <div className='size-24 flex items-center justify-center rounded-full bg-body-secondary text-primary mb-5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='40'
              height='40'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.75'
              strokeLinecap='round'
              strokeLinejoin='round'
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <path d='M16 10a4 4 0 0 1-8 0' />
              <path d='M3.103 6.034h17.794' />
              <path d='M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z' />
            </svg>
          </div>
          <span className='text-primary font-primary text-2xl mb-1'>
            Tu carrito está vacío
          </span>
          <span className='text-secondary-50 font-secondary mb-6'>
            Agrega algunos productos deliciosos
          </span>
          <Button
            as='a'
            href='#productos'
            variant='secondary'
            onClick={handleToggleCart}
          >
            Ver productos
          </Button>
        </motion.div>
      )}
    </Offcanvas>
  );
}
