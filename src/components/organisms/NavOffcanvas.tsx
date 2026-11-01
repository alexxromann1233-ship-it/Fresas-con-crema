import { motion, AnimatePresence } from 'framer-motion';
import { NAV } from '../../constants/data';
import { useAppStore } from '../../store/appStore';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { usePanel } from '../../hooks/usePanel';
import { Button } from '../atoms/Button';

/**
 * Barra de navegación en movil
 */
export function NavOffcanvas() {
  const show = useAppStore((s) => s.showNav);
  const handleToggleNav = useAppStore((s) => s.handleToggleNav);
  const navRef = useOutsideClick<HTMLDivElement>(handleToggleNav);
  usePanel(show, handleToggleNav);

  return (
    <AnimatePresence>
      {show && (
        <div className='fixed top-0 start-0 z-50 w-full md:hidden'>
          <motion.div
            className='fixed w-full h-full bg-black/50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <div
            className='relative flex'
            role='dialog'
            aria-modal='true'
            aria-label='Navegación'
          >
            <motion.div
              ref={navRef}
              className='w-full sm:max-w-sm h-dvh flex flex-col bg-body shadow-2xl'
              initial={{ translateX: '-100%' }}
              animate={{ translateX: '0%' }}
              exit={{ translateX: '-100%' }}
              transition={{ duration: 0.3 }}
            >
              <div className='flex justify-between items-center py-4 px-6 border-b border-black/5'>
                <h3 className='text-primary font-primary text-3xl'>
                  Navegación
                </h3>
                <Button
                  padding='p-3'
                  aria-label='Cerrar navegación'
                  onClick={handleToggleNav}
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
              <div className='h-full p-6'>
                <nav className='flex flex-col gap-2'>
                  {NAV.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      className='text-primary font-secondary text-xl font-semibold rounded-xl py-3 transition-opacity duration-300 active:opacity-70'
                      onClick={handleToggleNav}
                    >
                      {link.text}
                    </a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
