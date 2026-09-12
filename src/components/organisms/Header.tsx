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

  return (
    <header className='fixed top-0 z-2 w-full backdrop-blur-3xl py-2'>
      <div className='w-full md:w-3/4 flex justify-between items-center px-6 md:px-0 mx-auto animate-fade-in-down'>
        <Button
          padding='p-3'
          className='block md:hidden'
          onClick={handleToggleNav}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='currentColor'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5'
            />
          </svg>
        </Button>
        <a href='#inicio'>
          <img
            className='h-20'
            src={CONFIG.SRC_LOGO}
            alt={`Logo de ${CONFIG.APP_NAME}`}
          />
        </a>
        <nav className='hidden md:flex gap-8'>
          {NAV.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className='text-primary font-secondary font-semibold'
            >
              {link.text}
            </a>
          ))}
        </nav>
        <Button padding='p-3' onClick={handleToggleCart}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='currentColor'
            viewBox='0 0 16 16'
          >
            <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2' />
          </svg>
        </Button>
      </div>
    </header>
  );
}
