import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/appStore';
import { formatMoney } from '../../utils/formats';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { usePanel } from '../../hooks/usePanel';
import { useWhatsAppOrder } from '../../hooks/useWhatsAppOrder';
import { Button } from '../atoms/Button';
import { CartItem } from '../molecules/CartItem';

/**
 * Carrito
 */
export function Cart() {
  const show = useAppStore((s) => s.showCart);
  const cart = useAppStore((s) => s.cart);
  const total = cart.reduce((acum, item) => acum + item.total, 0);
  const handleToggleCart = useAppStore((s) => s.handleToggleCart);
  const cartRef = useOutsideClick<HTMLDivElement>(handleToggleCart);
  const handleOrder = useWhatsAppOrder();
  usePanel(show, handleToggleCart);

  return (
    <AnimatePresence>
      {show && (
        <div className='fixed top-0 start-0 z-50 w-full'>
          <motion.div
            className='fixed w-full h-full bg-black/50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <div
            className='relative flex justify-end'
            role='dialog'
            aria-modal='true'
            aria-label='Carrito'
          >
            <motion.div
              ref={cartRef}
              className='w-full sm:max-w-md h-dvh flex flex-col bg-body shadow-2xl'
              initial={{ translateX: '100%' }}
              animate={{ translateX: '0%' }}
              exit={{ translateX: '100%' }}
              transition={{ duration: 0.3 }}
            >
              <div className='flex justify-between items-center py-4 px-6 border-b border-black/5'>
                <h3 className='text-primary font-primary text-3xl'>Carrito</h3>
                <Button
                  padding='p-3'
                  aria-label='Cerrar carrito'
                  onClick={handleToggleCart}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    viewBox='0 0 16 16'
                    aria-hidden='true'
                  >
                    <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' />
                  </svg>
                </Button>
              </div>
              <div className='flex-1 overflow-y-auto'>
                {cart.length > 0 ? (
                  cart.map((item, i) => <CartItem key={i} item={item} />)
                ) : (
                  <div className='h-full flex flex-col justify-center items-center text-center px-6'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='42'
                      height='42'
                      fill='currentColor'
                      className='text-primary mb-4'
                      aria-hidden='true'
                      viewBox='0 0 16 16'
                    >
                      <path d='M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z' />
                    </svg>
                    <span className='font-secondary font-semibold mb-1'>
                      Tu carrito está vacío
                    </span>
                    <span className='font-secondary text-secondary-50'>
                      Agrega algunos productos deliciosos
                    </span>
                  </div>
                )}
              </div>
              <div className='bg-body-secondary rounded-t-3xl pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] px-6'>
                <div className='flex flex-col gap-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-primary font-secondary text-2xl font-bold'>
                      Total
                    </span>
                    <span className='text-primary text-center text-3xl font-primary mb-0.5'>
                      {formatMoney(total)}
                    </span>
                  </div>
                  <Button variant='whatsapp' onClick={handleOrder}>
                    Pedir por WhatsApp
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
