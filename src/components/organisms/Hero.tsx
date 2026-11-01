import { useEffect, useRef, type ReactNode } from 'react';
import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import { CONFIG } from '../../constants/config';
import { KPI } from '../../constants/data';
import { Button } from '../atoms/Button';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const KPI_ICONS: Record<(typeof KPI)[number]['id'], ReactNode> = {
  fresh: (
    <>
      <path d='M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z' />
      <path d='M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12' />
    </>
  ),
  products: (
    <>
      <path d='m6 9 1.6 11.2a2 2 0 0 0 2 1.8h4.8a2 2 0 0 0 2-1.8L18 9' />
      <path d='M4 9h16' />
      <path d='M9 9V5a3 3 0 0 1 6 0v4' />
    </>
  ),
  toppings: (
    <>
      <path d='M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z' />
      <path d='M20 3v4' />
      <path d='M22 5h-4' />
    </>
  ),
  sizes: (
    <>
      <path d='M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z' />
      <path d='m14.5 12.5 2-2' />
      <path d='m11.5 9.5 2-2' />
      <path d='m8.5 6.5 2-2' />
      <path d='m17.5 15.5 2-2' />
    </>
  ),
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

/**
 * Icono de trazo (misma familia que la cabecera y el pie de página)
 */
function Icon({ size = 20, children }: Readonly<{ size?: number; children: ReactNode }>) {
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

/**
 * Número que cuenta desde cero al entrar en pantalla
 */
function CountUp({ value }: Readonly<{ value: number }>) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reduceMotion) return;

    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE_OUT,
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = String(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return <span ref={ref}>{reduceMotion ? value : 0}</span>;
}

/**
 * Sección de hero
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 140]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 60]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, reduceMotion ? 1 : 0]);

  return (
    <MotionConfig reducedMotion='user'>
      <section
        ref={sectionRef}
        id='inicio'
        className='relative isolate min-h-screen flex flex-col overflow-hidden bg-body-secondary'
      >
        <div aria-hidden='true' className='pointer-events-none absolute inset-0 -z-10'>
          <div className='absolute -top-32 -end-24 size-[28rem] md:size-[40rem] rounded-full bg-(--app-color-primary)/15 blur-3xl' />
          <div className='absolute top-1/3 -start-40 size-[22rem] md:size-[30rem] rounded-full bg-white/70 blur-3xl' />
          <div className='absolute inset-0 bg-[radial-gradient(var(--app-color-primary)_1px,transparent_1px)] bg-size-[22px_22px] opacity-[0.07] mask-[radial-gradient(ellipse_at_top_right,#000_20%,transparent_70%)]' />
        </div>
        <div
          className='absolute bottom-0 w-full h-70 bg-body'
          style={{
            WebkitMaskImage: `url(/images/drippy-shape.svg)`,
            maskImage: `url(/images/drippy-shape.svg)`,
            WebkitMaskSize: 'cover',
            maskSize: 'cover',
          }}
        />
        <div className='relative flex-1 w-full md:w-3/4 flex flex-col gap-10 md:gap-8 pt-24 md:pt-28 pb-16 md:pb-14 px-6 md:px-0 mx-auto'>
          <div className='w-full flex-1 flex flex-col-reverse md:flex-row justify-center md:items-center gap-6 md:gap-10'>
            <motion.div
              className='w-full flex flex-col items-start'
              style={{ y: textY, opacity: fade }}
              variants={container}
              initial='hidden'
              animate='show'
            >
              <motion.span
                variants={item}
                className='inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur ring-1 ring-(--app-color-primary)/10 shadow-sm py-1.5 ps-1.5 pe-4 font-secondary text-xs md:text-sm font-semibold text-secondary mb-5'
              >
                <span className='size-6 flex items-center justify-center rounded-full bg-(--app-color-primary) text-white'>
                  <Icon size={14}>
                    <path d='M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0' />
                    <circle cx='12' cy='10' r='3' />
                  </Icon>
                </span>
                Solo por encargo · {CONFIG.ADDRESS}
              </motion.span>
              <motion.h1
                variants={item}
                className='relative text-primary font-primary text-5xl md:text-6xl lg:text-7xl leading-tight mb-5'
              >
                {CONFIG.APP_NAME}
                <svg
                  className='absolute -bottom-2 md:-bottom-3 start-0 w-3/4 h-4 md:h-5 text-(--app-color-primary)/40'
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
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.7, ease: 'easeInOut' }}
                  />
                </svg>
              </motion.h1>
              <motion.p
                variants={item}
                className='max-w-xl text-secondary-50 font-secondary text-base md:text-lg leading-7 md:leading-8 mb-8'
              >
                {CONFIG.DESCRIPTION}
              </motion.p>
              <motion.div
                variants={item}
                className='w-full md:w-auto flex flex-col md:flex-row gap-3 md:gap-4'
              >
                <Button
                  as='a'
                  href='#productos'
                  className='group shadow-lg shadow-(--app-color-primary)/25 hover:shadow-xl hover:shadow-(--app-color-primary)/30'
                >
                  Ver Productos
                  <span className='transition-transform duration-300 group-hover:translate-x-1'>
                    <Icon size={18}>
                      <path d='M5 12h14' />
                      <path d='m12 5 7 7-7 7' />
                    </Icon>
                  </span>
                </Button>
                <Button as='a' href='#contacto' variant='secondary' className='bg-white/60'>
                  Hacer Pedido
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              className='relative w-full h-[30dvh] md:h-[70dvh] flex justify-center md:justify-end'
              style={{ y: imageY }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
            >
              <div className='relative h-full aspect-square'>
                <div
                  aria-hidden='true'
                  className='absolute inset-[8%] rounded-full bg-white/70 ring-1 ring-white shadow-[0_30px_80px_-30px_rgba(238,30,37,0.45)]'
                />
                <div
                  aria-hidden='true'
                  className='absolute inset-[3%] rounded-full border-2 border-dashed border-(--app-color-primary)/20 animate-[spin_40s_linear_infinite]'
                />
                <motion.img
                  className='relative w-full h-full object-contain drop-shadow-2xl'
                  src={CONFIG.SRC_MAIN_IMG}
                  alt={`Vaso de ${CONFIG.APP_NAME.toLowerCase()}`}
                  fetchPriority='high'
                  draggable={false}
                  animate={{ y: [0, -14, 0], rotate: [0, -1.5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </div>
          <motion.ul
            className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0 rounded-3xl bg-white/80 backdrop-blur-xl ring-1 ring-black/5 shadow-[0_20px_50px_-25px_rgba(238,30,37,0.35)] p-2 md:p-3 md:divide-x md:divide-black/5'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT }}
          >
            {KPI.map((kpi) => (
              <li
                key={kpi.id}
                className='group flex items-center gap-3 rounded-2xl p-3 md:px-5 transition-colors duration-300 hover:bg-body-secondary/60'
              >
                <span className='size-10 md:size-12 shrink-0 flex items-center justify-center rounded-xl bg-body-secondary text-primary transition-[color,background-color,transform] duration-300 group-hover:bg-(--app-color-primary) group-hover:text-white group-hover:-rotate-6'>
                  <Icon>{KPI_ICONS[kpi.id]}</Icon>
                </span>
                <span className='min-w-0 flex flex-col'>
                  <span className='text-primary font-primary text-2xl md:text-3xl leading-tight tabular-nums'>
                    <span className='sr-only'>
                      {kpi.value}
                      {'suffix' in kpi && kpi.suffix}
                    </span>
                    <span aria-hidden='true'>
                      <CountUp value={kpi.value} />
                      {'suffix' in kpi && kpi.suffix}
                    </span>
                  </span>
                  <span className='text-secondary-50 font-secondary text-xs md:text-sm font-semibold truncate'>
                    {kpi.name}
                  </span>
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>
    </MotionConfig>
  );
}
