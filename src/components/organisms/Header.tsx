import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { clsx } from 'clsx';
import { CONFIG } from '../../constants/config';
import { NAV } from '../../constants/data';
import { useAppStore } from '../../store/appStore';
import { useScrolled } from '../../hooks/useScrolled';
import { useActiveSection } from '../../hooks/useActiveSection';
import { Button } from '../atoms/Button';

const SECTION_IDS = NAV.map((link) => link.href.slice(1));

/**
 * Cabecera
 */
export function Header() {
  const handleToggleNav = useAppStore((s) => s.handleToggleNav);
  const handleToggleCart = useAppStore((s) => s.handleToggleCart);
  const cartCount = useAppStore((s) =>
    s.cart.reduce((acum, item) => acum + item.quantity, 0),
  );
  const scrolled = useScrolled();
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <header
      className={clsx(
        'fixed top-0 z-40 w-full border-b transition-[padding,background-color,border-color,box-shadow] duration-300 ease-out',
        scrolled
          ? 'py-2 bg-white/80 backdrop-blur-xl border-black/5 shadow-[0_10px_30px_-18px_rgba(238,30,37,0.45)]'
          : 'py-3 md:py-4 bg-transparent border-transparent',
      )}
    >
      <div className='w-full md:w-3/4 grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 md:px-0 mx-auto animate-fade-in-down'>
        <Button
          variant='secondary'
          padding='p-2.5'
          className='md:hidden justify-self-start'
          aria-label='Abrir navegación'
          onClick={handleToggleNav}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path d='M4 6h16M4 12h16M4 18h10' />
          </svg>
        </Button>
        <a
          href='#inicio'
          className='justify-self-center md:justify-self-start rounded-full'
          aria-label={`${CONFIG.APP_NAME} - Inicio`}
        >
          <img
            className={clsx(
              'size-12 transition-[width,height,transform] duration-300 ease-out hover:scale-105',
              scrolled ? 'md:size-14' : 'md:size-16',
            )}
            src={CONFIG.SRC_LOGO}
            srcSet={CONFIG.SRCSET_LOGO}
            sizes='(min-width: 768px) 64px, 48px'
            width={256}
            height={256}
            fetchPriority='high'
            decoding='async'
            alt={`Logo de ${CONFIG.APP_NAME}`}
          />
        </a>
        <MotionConfig reducedMotion='user'>
          <nav className='hidden md:flex items-center gap-1'>
            {NAV.map((link) => {
              const isActive = activeSection === link.href.slice(1);

              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={clsx(
                    'relative isolate font-secondary text-[0.95rem] font-semibold rounded-full py-2 px-4 transition-colors duration-300',
                    isActive
                      ? 'text-primary'
                      : 'text-(--app-color-secondary)/70 hover:text-primary hover:bg-(--app-color-primary)/5',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId='nav-active'
                      className='absolute inset-0 -z-10 rounded-full bg-(--app-color-primary)/10'
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  {link.text}
                </a>
              );
            })}
          </nav>
        </MotionConfig>
        <Button
          padding='p-2.5 md:py-2.5 md:ps-4 md:pe-3'
          className='relative justify-self-end shadow-md shadow-(--app-color-primary)/25 hover:shadow-lg hover:shadow-(--app-color-primary)/30'
          aria-label={`Abrir carrito (${cartCount} productos)`}
          onClick={handleToggleCart}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path d='M16 10a4 4 0 0 1-8 0' />
            <path d='M3.103 6.034h17.794' />
            <path d='M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z' />
          </svg>
          <span className='hidden md:inline text-sm'>Carrito</span>
          <span
            className={clsx(
              'hidden md:flex min-w-6 h-6 items-center justify-center rounded-full text-xs font-bold px-1.5 transition-colors duration-300',
              cartCount > 0 ? 'bg-white text-primary' : 'bg-white/20 text-white',
            )}
            aria-hidden='true'
          >
            <AnimatePresence mode='popLayout' initial={false}>
              <motion.span
                key={cartCount}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {cartCount}
              </motion.span>
            </AnimatePresence>
          </span>
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.span
                className='md:hidden pointer-events-none absolute -top-1.5 -end-1.5 min-w-5 h-5 flex items-center justify-center bg-white text-primary ring-2 ring-(--app-color-primary) font-bold rounded-full text-[0.7rem] px-1'
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 500 }}
                aria-hidden='true'
              >
                {cartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </header>
  );
}
