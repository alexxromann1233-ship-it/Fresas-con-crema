import React from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { clsx } from 'clsx';
import { usePanel } from '../../hooks/usePanel';

interface OffcanvasProps {
  show: boolean;
  onClose: () => void;
  side?: 'start' | 'end';
  title: string;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const PANEL_SPRING = { type: 'spring', stiffness: 380, damping: 38 } as const;

/**
 * Panel lateral
 */
export function Offcanvas({
  show,
  onClose,
  side = 'end',
  title,
  subtitle,
  footer,
  className,
  children,
}: Readonly<OffcanvasProps>) {
  const offset = side === 'start' ? '-100%' : '100%';
  usePanel(show, onClose);

  return (
    <MotionConfig reducedMotion='user'>
      <AnimatePresence>
        {show && (
          <div
            className={clsx(
              'fixed inset-0 z-50 flex',
              side === 'end' && 'justify-end',
              className,
            )}
          >
            <motion.div
              className='absolute inset-0 bg-black/40 backdrop-blur-sm'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onClose}
              aria-hidden='true'
            />
            <motion.div
              className={clsx(
                'relative w-full h-dvh flex flex-col bg-body shadow-2xl shadow-black/20 overflow-hidden',
                side === 'start'
                  ? 'sm:max-w-sm sm:rounded-e-[2rem]'
                  : 'sm:max-w-md sm:rounded-s-[2rem]',
              )}
              role='dialog'
              aria-modal='true'
              aria-label={title}
              initial={{ x: offset }}
              animate={{ x: 0, transition: PANEL_SPRING }}
              exit={{ x: offset, transition: { duration: 0.25, ease: 'easeIn' } }}
            >
              <div className='flex justify-between items-center gap-4 pt-[max(1rem,env(safe-area-inset-top))] pb-4 px-6 border-b border-black/5'>
                <div className='min-w-0 flex flex-col'>
                  <h3 className='text-primary font-primary text-3xl leading-tight'>
                    {title}
                  </h3>
                  {subtitle && (
                    <span className='text-secondary-50 font-secondary text-sm'>
                      {subtitle}
                    </span>
                  )}
                </div>
                <button
                  type='button'
                  autoFocus
                  aria-label={`Cerrar ${title.toLowerCase()}`}
                  className='group shrink-0 size-11 flex items-center justify-center rounded-full bg-(--app-color-body-secondary) text-(--app-color-primary) cursor-pointer transition-[background-color,color,transform] duration-300 hover:bg-(--app-btn-bg) hover:text-(--app-btn-color) active:scale-[0.92]'
                  onClick={onClose}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2.25'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    viewBox='0 0 24 24'
                    className='transition-transform duration-300 group-hover:rotate-90'
                    aria-hidden='true'
                  >
                    <path d='M18 6 6 18M6 6l12 12' />
                  </svg>
                </button>
              </div>
              <div className='flex-1 overflow-y-auto overflow-x-hidden overscroll-contain'>
                {children}
              </div>
              {footer}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
