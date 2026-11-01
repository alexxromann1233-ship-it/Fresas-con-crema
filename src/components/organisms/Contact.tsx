import type { ReactNode } from 'react';
import { motion, MotionConfig, type Variants } from 'framer-motion';
import { useAppStore } from '../../store/appStore';
import { useWhatsAppOrder } from '../../hooks/useWhatsAppOrder';
import { CONFIG } from '../../constants/config';
import { formatMoney } from '../../utils/formats';
import { Button } from '../atoms/Button';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const VIEWPORT = { once: true, margin: '0px 0px -15% 0px' } as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

const STEPS: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: 'Elige',
    text: 'Agrega al carrito tus productos y toppings favoritos.',
    icon: (
      <>
        <circle cx='8' cy='21' r='1' />
        <circle cx='19' cy='21' r='1' />
        <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' />
      </>
    ),
  },
  {
    title: 'Envía',
    text: 'Te armamos el mensaje con el detalle y el total.',
    icon: <path d='M7.9 20A9 9 0 1 0 4 16.1L2 22Z' />,
  },
  {
    title: 'Disfruta',
    text: 'Confirmamos tu pedido y lo preparamos al momento.',
    icon: (
      <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
    ),
  },
];

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
 * Fila del resumen del pedido
 */
function SummaryRow({ label, value }: Readonly<{ label: ReactNode; value: string }>) {
  return (
    <div className='flex items-center justify-between gap-4 font-secondary text-sm'>
      <dt className='text-secondary-50 font-semibold'>{label}</dt>
      <dd className='text-secondary font-semibold tabular-nums'>{value}</dd>
    </div>
  );
}

/**
 * Sección de contacto
 */
export function Contact() {
  const cart = useAppStore((s) => s.cart);
  const handleToggleCart = useAppStore((s) => s.handleToggleCart);
  const handleOrder = useWhatsAppOrder();

  const units = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.total, 0);
  const hasItems = cart.length > 0;

  return (
    <MotionConfig reducedMotion='user'>
      <section
        id='contacto'
        className='relative isolate min-h-screen flex flex-col overflow-hidden bg-body-secondary'
      >
        <div aria-hidden='true' className='pointer-events-none absolute inset-0 -z-10'>
          <div className='absolute top-10 -end-32 size-[22rem] md:size-[34rem] rounded-full bg-(--app-color-primary)/12 blur-3xl' />
          <div className='absolute bottom-1/4 -start-40 size-[22rem] md:size-[30rem] rounded-full bg-white/70 blur-3xl' />
          <div className='absolute inset-0 bg-[radial-gradient(var(--app-color-primary)_1px,transparent_1px)] bg-size-[22px_22px] opacity-[0.07] mask-[radial-gradient(ellipse_at_top_left,#000_15%,transparent_65%)]' />
        </div>
        <div
          className='absolute bottom-0 w-full h-64 bg-body'
          style={{
            WebkitMaskImage: `url(/images/drippy-shape.svg)`,
            maskImage: `url(/images/drippy-shape.svg)`,
            WebkitMaskSize: 'cover',
            maskSize: 'cover',
          }}
        />

        <div className='relative flex-1 w-full md:w-3/4 grid md:grid-cols-[1.15fr_1fr] items-center gap-10 md:gap-14 pt-20 md:pt-24 pb-56 md:pb-48 px-6 md:px-0 mx-auto'>
          <motion.div
            className='flex flex-col items-start'
            variants={container}
            initial='hidden'
            whileInView='show'
            viewport={VIEWPORT}
          >
            <motion.span
              variants={reveal}
              className='inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur ring-1 ring-(--app-color-primary)/10 shadow-sm py-1.5 ps-1.5 pe-4 font-secondary text-xs md:text-sm font-semibold text-secondary mb-4'
            >
              <span className='size-6 flex items-center justify-center rounded-full bg-(--app-color-primary) text-white'>
                <Icon size={14}>
                  <path d='M7.9 20A9 9 0 1 0 4 16.1L2 22Z' />
                </Icon>
              </span>
              Pedidos por WhatsApp
            </motion.span>
            <motion.h2
              variants={reveal}
              className='relative text-primary text-4xl md:text-5xl font-primary leading-tight mb-4'
            >
              ¿Listo para tu Pedido?
              <svg
                className='absolute -bottom-1 md:-bottom-2 start-0 w-3/4 h-3 md:h-4 text-(--app-color-primary)/35'
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
              className='max-w-lg text-secondary-50 font-secondary md:text-lg leading-7 md:leading-8 mb-8'
            >
              Contáctanos por WhatsApp y disfruta de las mejores fresas con crema de
              Cartago.
            </motion.p>
            <ol className='w-full flex flex-col gap-3'>
              {STEPS.map((step, index) => (
                <motion.li
                  key={step.title}
                  variants={reveal}
                  className='group flex items-center gap-4 rounded-2xl bg-white/60 backdrop-blur ring-1 ring-black/5 p-3 pe-5 transition-colors duration-300 hover:bg-white/90'
                >
                  <span className='relative size-12 shrink-0 flex items-center justify-center rounded-xl bg-body-secondary text-primary transition-[color,background-color,transform] duration-300 group-hover:bg-(--app-color-primary) group-hover:text-white group-hover:-rotate-6'>
                    <Icon>{step.icon}</Icon>
                    <span className='absolute -top-1.5 -end-1.5 size-5 flex items-center justify-center rounded-full bg-white ring-1 ring-black/5 text-primary font-secondary text-[0.65rem] font-bold shadow-sm'>
                      {index + 1}
                    </span>
                  </span>
                  <span className='min-w-0 flex flex-col'>
                    <span className='text-secondary font-secondary font-bold'>{step.title}</span>
                    <span className='text-secondary-50 font-secondary text-sm leading-6'>
                      {step.text}
                    </span>
                  </span>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          <motion.div
            className='w-full max-w-md md:justify-self-end mx-auto md:mx-0'
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
          >
            <div className='relative rounded-[2rem] bg-white/85 backdrop-blur-xl ring-1 ring-black/5 shadow-[0_30px_70px_-30px_rgba(238,30,37,0.45)] p-6 md:p-8'>
              <div className='flex items-center gap-3 mb-6'>
                <span className='size-12 shrink-0 flex items-center justify-center rounded-2xl bg-(--app-color-primary) text-white shadow-md shadow-(--app-color-primary)/25'>
                  <Icon>
                    <path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z' />
                    <path d='M3 6h18' />
                    <path d='M16 10a4 4 0 0 1-8 0' />
                  </Icon>
                </span>
                <span className='flex flex-col'>
                  <span className='text-primary font-primary text-2xl leading-tight'>Tu pedido</span>
                  <span className='text-secondary-50 font-secondary text-xs md:text-sm font-semibold'>
                    {hasItems
                      ? `${units} ${units === 1 ? 'producto' : 'productos'} en el carrito`
                      : 'Tu carrito está vacío'}
                  </span>
                </span>
              </div>

              {hasItems ? (
                <dl className='flex flex-col gap-2.5 rounded-2xl bg-body-secondary/60 p-4 mb-6'>
                  <SummaryRow label='Subtotal' value={formatMoney(subtotal)} />
                  <SummaryRow label='Domicilio (base)' value={formatMoney(CONFIG.DELIVERY_FEE)} />
                  <div className='border-t border-dashed border-black/10 pt-2.5 flex items-center justify-between gap-4 font-secondary'>
                    <dt className='text-secondary font-bold'>Total</dt>
                    <dd className='text-primary font-primary text-2xl leading-tight tabular-nums'>
                      {formatMoney(subtotal + CONFIG.DELIVERY_FEE)}
                    </dd>
                  </div>
                </dl>
              ) : (
                <p className='rounded-2xl bg-body-secondary/60 p-4 mb-6 text-secondary-50 font-secondary text-sm leading-6'>
                  Puedes escribirnos directamente o{' '}
                  <a
                    href='#productos'
                    className='text-primary font-semibold underline-offset-4 hover:underline'
                  >
                    explorar el menú
                  </a>{' '}
                  y armar tu pedido primero.
                </p>
              )}

              <div className='flex flex-col gap-3'>
                <Button
                  variant='whatsapp'
                  onClick={handleOrder}
                  className='group shadow-lg shadow-[#30D04D]/30 hover:shadow-xl hover:shadow-[#30D04D]/35'
                >
                  <Icon>
                    <path d='M7.9 20A9 9 0 1 0 4 16.1L2 22Z' />
                  </Icon>
                  Pedir por WhatsApp
                  <span className='transition-transform duration-300 group-hover:translate-x-1'>
                    <Icon size={18}>
                      <path d='M5 12h14' />
                      <path d='m12 5 7 7-7 7' />
                    </Icon>
                  </span>
                </Button>
                <Button variant='secondary' onClick={handleToggleCart} className='bg-white/60'>
                  Ver Carrito
                  <span className='min-w-6 h-6 px-1.5 flex items-center justify-center rounded-full bg-(--app-color-primary)/10 text-xs tabular-nums'>
                    {units}
                  </span>
                </Button>
              </div>

              <p className='flex items-start gap-2 text-secondary-50 font-secondary text-xs leading-5 mt-5'>
                <span className='text-primary mt-0.5'>
                  <Icon size={14}>
                    <circle cx='12' cy='12' r='10' />
                    <path d='M12 6v6l4 2' />
                  </Icon>
                </span>
                {CONFIG.SCHEDULE}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
