import type { ReactNode } from 'react';
import { motion, MotionConfig, type Variants } from 'framer-motion';
import { PRODUCTS, TOPPINGS } from '../../constants/data';
import type { Item } from '../../constants/types';
import { Marquee } from '../organisms/Marquee';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const VIEWPORT = { once: true, margin: '0px 0px -15% 0px' } as const;

const header: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

/**
 * Icono de trazo (misma familia que la cabecera y el pie de página)
 */
function Icon({ size = 16, children }: Readonly<{ size?: number; children: ReactNode }>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      viewBox='0 0 24 24'
      aria-hidden='true'
    >
      {children}
    </svg>
  );
}

interface CatalogProps {
  eyebrow: string;
  icon: ReactNode;
  title: string;
  description: string;
  items: Item[];
  direction: 1 | -1;
  itemWidth: string;
  trackClassName: string;
}

/**
 * Bloque con encabezado animado y carrusel de elementos
 */
function Catalog({
  eyebrow,
  icon,
  title,
  description,
  items,
  direction,
  itemWidth,
  trackClassName,
}: Readonly<CatalogProps>) {
  return (
    <div className='flex flex-col'>
      <motion.header
        className='flex flex-col items-center text-center mb-4 md:mb-6'
        variants={header}
        initial='hidden'
        whileInView='show'
        viewport={VIEWPORT}
      >
        <motion.span
          variants={reveal}
          className='inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur ring-1 ring-(--app-color-primary)/10 shadow-sm py-1.5 ps-1.5 pe-4 font-secondary text-xs md:text-sm font-semibold text-secondary mb-4'
        >
          <span className='size-6 flex items-center justify-center rounded-full bg-(--app-color-primary) text-white'>
            <Icon size={14}>{icon}</Icon>
          </span>
          {eyebrow} · {items.length} opciones
        </motion.span>
        <motion.h2
          variants={reveal}
          className='relative text-primary text-4xl md:text-5xl font-primary leading-tight mb-4'
        >
          {title}
          <svg
            className='absolute -bottom-1 md:-bottom-2 start-[10%] w-4/5 h-3 md:h-4 text-(--app-color-primary)/35'
            viewBox='0 0 200 16'
            preserveAspectRatio='none'
            fill='none'
            aria-hidden='true'
          >
            <motion.path
              d='M3 12C50 3 120 2 197 8'
              stroke='currentColor'
              strokeWidth='4'
              strokeLinecap='round'
              variants={{
                hidden: { pathLength: 0 },
                show: { pathLength: 1, transition: { duration: 0.9, delay: 0.3, ease: 'easeInOut' } },
              }}
            />
          </svg>
        </motion.h2>
        <motion.p
          variants={reveal}
          className='max-w-lg text-secondary-50 font-secondary md:text-lg leading-7 md:leading-8'
        >
          {description}
        </motion.p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, x: direction * -48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
      >
        <Marquee
          items={items}
          direction={direction}
          itemWidth={itemWidth}
          trackClassName={trackClassName}
        />
      </motion.div>
    </div>
  );
}

/**
 * Listado de productos y toppings
 */
export function Products() {
  return (
    <MotionConfig reducedMotion='user'>
      <section id='productos' className='relative isolate min-h-screen overflow-hidden bg-body'>
        <div aria-hidden='true' className='pointer-events-none absolute inset-0 -z-10'>
          <div className='absolute top-24 -start-32 size-[22rem] md:size-[32rem] rounded-full bg-(--app-color-primary)/8 blur-3xl' />
          <div className='absolute top-1/2 -end-40 size-[24rem] md:size-[34rem] rounded-full bg-(--app-color-primary)/10 blur-3xl' />
          <div className='absolute inset-0 bg-[radial-gradient(var(--app-color-primary)_1px,transparent_1px)] bg-size-[22px_22px] opacity-[0.06] mask-[radial-gradient(ellipse_at_center,#000_10%,transparent_65%)]' />
        </div>
        <div
          className='absolute bottom-0 w-full h-28 bg-body-secondary'
          style={{
            WebkitMaskImage: `url(/images/brush-shape.svg)`,
            maskImage: `url(/images/brush-shape.svg)`,
            WebkitMaskSize: 'cover',
            maskSize: 'cover',
          }}
        />

        <div className='relative w-full md:w-3/4 h-full flex flex-col gap-14 md:gap-20 pt-16 md:pt-20 pb-36 px-6 md:px-0 mx-auto'>
          <Catalog
            eyebrow='Nuestro menú'
            icon={
              <>
                <path d='m6 9 1.6 11.2a2 2 0 0 0 2 1.8h4.8a2 2 0 0 0 2-1.8L18 9' />
                <path d='M4 9h16' />
                <path d='M9 9V5a3 3 0 0 1 6 0v4' />
              </>
            }
            title='Productos'
            description='Fresas con crema y ensaladas de frutas preparadas al momento, en el tamaño que prefieras.'
            items={PRODUCTS}
            direction={1}
            itemWidth='w-48 md:w-56'
            trackClassName='gap-5 md:gap-7 pe-5 md:pe-7'
          />

          <Catalog
            eyebrow='Dale tu toque'
            icon={
              <>
                <path d='M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z' />
                <path d='M20 3v4' />
                <path d='M22 5h-4' />
              </>
            }
            title='Toppings'
            description='Cada Topping adicional tiene un costo de $3000'
            items={TOPPINGS}
            direction={-1}
            itemWidth='w-36 md:w-44'
            trackClassName='gap-4 md:gap-6 pe-4 md:pe-6'
          />

          <motion.p
            className='flex items-center justify-center gap-2 text-secondary-50 font-secondary text-xs md:text-sm font-semibold -mt-6 md:-mt-10'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.span
              className='text-primary'
              animate={{ x: [-3, 3, -3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon>
                <path d='m18 8 4 4-4 4' />
                <path d='M2 12h20' />
                <path d='m6 8-4 4 4 4' />
              </Icon>
            </motion.span>
            Desliza los carruseles para ver más
          </motion.p>
        </div>
      </section>
    </MotionConfig>
  );
}
