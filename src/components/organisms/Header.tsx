import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../../constants/config';
import { NAV } from '../../constants/data';
import { useAppStore } from '../../store/appStore';
import { Button } from '../atoms/Button';

/**
 * Cabecera
 */
export function Header() {
  const handleToggleNav = useAppStore((s) => s.handleToggleNav);
  const handleToggleCart = useAppStore((s) => s.handleToggleCart);
  const cartCount = useAppStore((s) =>
    s.cart.reduce((acum, item) => acum + item.quantity, 0),
  );

  return (
    <header className='fixed top-0 z-40 w-full backdrop-blur-3xl py-2'>
      <div className='w-full md:w-3/4 flex justify-between items-center px-6 md:px-0 mx-auto animate-fade-in-down'>
        <Button
          padding='p-3'
          className='md:hidden'
          aria-label='Abrir navegación'
          onClick={handleToggleNav}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='currentColor'
            viewBox='0 0 16 16'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5'
            />
          </svg>
        </Button>
        <a href='#inicio' aria-label={`${CONFIG.APP_NAME} - Inicio`}>
          <img
            className='size-14 md:size-20'
            src={CONFIG.SRC_LOGO}
            srcSet={CONFIG.SRCSET_LOGO}
            sizes='(min-width: 768px) 80px, 56px'
            width={256}
            height={256}
            fetchPriority='high'
            decoding='async'
            alt={`Logo de ${CONFIG.APP_NAME}`}
          />
        </a>
        <nav className='hidden md:flex gap-8'>
          {NAV.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className='relative text-primary font-secondary font-semibold py-1 after:absolute after:start-0 after:bottom-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-(--app-color-primary) after:transition-transform after:duration-300 hover:after:scale-x-100'
            >
              {link.text}
            </a>
          ))}
        </nav>
        <div className='relative'>
          <Button
            padding='p-3'
            aria-label={`Abrir carrito (${cartCount} productos)`}
            onClick={handleToggleCart}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              viewBox='0 0 16 16'
              aria-hidden='true'
            >
              <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2' />
            </svg>
          </Button>
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.span
                className='pointer-events-none absolute -top-1.5 -end-1.5 min-w-6 h-6 flex items-center justify-center bg-white border-2 border-(--app-color-primary) text-primary font-secondary font-bold rounded-full text-xs px-1'
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 500 }}
              >
                {cartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
