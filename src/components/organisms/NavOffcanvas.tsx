import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { CONFIG } from '../../constants/config';
import { NAV } from '../../constants/data';
import { useAppStore } from '../../store/appStore';
import { useActiveSection } from '../../hooks/useActiveSection';
import { Button } from '../atoms/Button';
import { Offcanvas } from '../molecules/Offcanvas';

const SECTION_IDS = NAV.map((link) => link.href.slice(1));

const NAV_ICONS: Record<(typeof NAV)[number]['href'], ReactNode> = {
  '#inicio': (
    <>
      <path d='M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8' />
      <path d='M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
    </>
  ),
  '#productos': (
    <>
      <path d='m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11' />
      <path d='M17 7A5 5 0 0 0 7 7' />
      <path d='M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4' />
    </>
  ),
  '#contacto': (
    <path d='M7.9 20A9 9 0 1 0 4 16.1L2 22Z' />
  ),
};

/**
 * Enlaces de navegación con la sección activa resaltada
 */
function NavLinks({ onNavigate }: Readonly<{ onNavigate: () => void }>) {
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <nav className='flex flex-col gap-2'>
      {NAV.map((link, i) => {
        const isActive = activeSection === link.href.slice(1);

        return (
          <motion.a
            key={link.href}
            href={link.href}
            aria-current={isActive ? 'true' : undefined}
            className={clsx(
              'group flex items-center gap-4 rounded-2xl p-2 pe-4 font-secondary text-lg font-semibold transition-colors duration-300',
              isActive
                ? 'bg-body-secondary text-primary'
                : 'text-secondary hover:bg-(--app-color-primary)/5 active:bg-(--app-color-primary)/10',
            )}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 + i * 0.06, duration: 0.35, ease: 'easeOut' }}
            onClick={onNavigate}
          >
            <span
              className={clsx(
                'size-11 shrink-0 flex items-center justify-center rounded-xl transition-colors duration-300',
                isActive
                  ? 'bg-(--app-color-primary) text-white shadow-md shadow-(--app-color-primary)/25'
                  : 'bg-body-secondary text-primary',
              )}
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
                {NAV_ICONS[link.href]}
              </svg>
            </span>
            <span className='flex-1'>{link.text}</span>
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
              className={clsx(
                'transition-[opacity,transform] duration-300 group-hover:translate-x-1',
                isActive ? 'opacity-100' : 'opacity-30',
              )}
              aria-hidden='true'
            >
              <path d='m9 18 6-6-6-6' />
            </svg>
          </motion.a>
        );
      })}
    </nav>
  );
}

/**
 * Barra de navegación en movil
 */
export function NavOffcanvas() {
  const show = useAppStore((s) => s.showNav);
  const handleToggleNav = useAppStore((s) => s.handleToggleNav);
  const handleToggleCart = useAppStore((s) => s.handleToggleCart);
  const cartCount = useAppStore((s) =>
    s.cart.reduce((acum, item) => acum + item.quantity, 0),
  );

  const handleOpenCart = () => {
    handleToggleNav();
    handleToggleCart();
  };

  return (
    <Offcanvas
      show={show}
      onClose={handleToggleNav}
      side='start'
      title='Navegación'
      className='md:hidden'
      footer={
        <div className='bg-body-secondary rounded-t-3xl pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] px-6'>
          <div className='flex items-center gap-3 mb-5'>
            <img
              className='size-12 shrink-0'
              src={CONFIG.SRC_LOGO}
              width={48}
              height={48}
              alt=''
              aria-hidden='true'
            />
            <div className='min-w-0 flex flex-col'>
              <span className='text-primary font-primary text-xl leading-tight'>
                {CONFIG.APP_NAME}
              </span>
              <span className='text-secondary-50 font-secondary text-sm truncate'>
                {CONFIG.ADDRESS}
              </span>
            </div>
          </div>
          <Button className='w-full' onClick={handleOpenCart}>
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
            Ver carrito
            {cartCount > 0 && (
              <span className='min-w-6 h-6 flex items-center justify-center rounded-full bg-white text-primary text-xs font-bold px-1.5'>
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      }
    >
      <div className='p-6'>
        <NavLinks onNavigate={handleToggleNav} />
      </div>
    </Offcanvas>
  );
}
