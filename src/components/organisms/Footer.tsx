import type { ReactNode } from 'react';
import { CONFIG } from '../../constants/config';
import { NAV } from '../../constants/data';
import { formatPhone } from '../../utils/formats';
import { Button } from '../atoms/Button';

const NETWORKS = [
  {
    name: 'Instagram',
    href: CONFIG.INSTAGRAM_URL,
    icon: (
      <>
        <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
        <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
        <path d='M17.5 6.5h.01' />
      </>
    ),
  },
  {
    name: 'Facebook',
    href: CONFIG.FACEBOOK_URL,
    icon: (
      <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
    ),
  },
  {
    name: 'WhatsApp',
    href: `https://wa.me/${CONFIG.PHONE}`,
    icon: <path d='M7.9 20A9 9 0 1 0 4 16.1L2 22Z' />,
  },
];

const CONTACTS: { label: string; text: string; href?: string; icon: ReactNode }[] = [
  {
    label: 'Ubicación',
    text: CONFIG.ADDRESS,
    icon: (
      <>
        <path d='M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0' />
        <circle cx='12' cy='10' r='3' />
      </>
    ),
  },
  {
    label: 'WhatsApp',
    text: formatPhone(CONFIG.PHONE),
    href: `https://wa.me/${CONFIG.PHONE}`,
    icon: (
      <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
    ),
  },
  {
    label: 'Horario',
    text: CONFIG.SCHEDULE,
    icon: (
      <>
        <path d='M8 2v4' />
        <path d='M16 2v4' />
        <rect width='18' height='18' x='3' y='4' rx='2' />
        <path d='M3 10h18' />
        <path d='M8 14h.01' />
        <path d='M12 14h.01' />
        <path d='M16 14h.01' />
      </>
    ),
  },
];

/**
 * Icono de trazo (misma familia que la cabecera y el menú móvil)
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
 * Título de columna
 */
function FooterTitle({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <h3 className='text-secondary-50 font-secondary text-xs font-bold uppercase tracking-[0.18em] mb-5'>
      {children}
    </h3>
  );
}

/**
 * Pie de página
 */
export function Footer() {
  return (
    <footer className='bg-body'>
      <div className='w-full md:w-3/4 grid gap-12 md:gap-10 md:grid-cols-[1.3fr_1.4fr_0.8fr] pt-6 pb-12 md:pb-16 px-6 md:px-0 mx-auto'>
        <div className='flex flex-col items-start'>
          <a
            href='#inicio'
            className='group flex items-center gap-3 rounded-2xl mb-4'
            aria-label={`${CONFIG.APP_NAME} - Inicio`}
          >
            <img
              className='size-14 shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6'
              src={CONFIG.SRC_LOGO}
              srcSet={CONFIG.SRCSET_LOGO}
              sizes='56px'
              width={56}
              height={56}
              loading='lazy'
              decoding='async'
              alt=''
            />
            <span className='text-primary font-primary text-2xl leading-tight'>
              {CONFIG.APP_NAME}
            </span>
          </a>
          <p className='max-w-xs text-secondary-50 font-secondary text-sm leading-6 mb-6'>
            {CONFIG.DESCRIPTION}
          </p>
          <ul className='flex gap-3'>
            {NETWORKS.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={item.name}
                  title={item.name}
                  className='size-11 flex items-center justify-center rounded-xl bg-body-secondary text-primary transition-[color,background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-(--app-color-primary) hover:text-white hover:shadow-md hover:shadow-(--app-color-primary)/25 active:scale-95'
                >
                  <Icon>{item.icon}</Icon>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <FooterTitle>Contacto</FooterTitle>
          <ul className='flex flex-col gap-4'>
            {CONTACTS.map((item) => {
              const content = (
                <>
                  <span className='size-10 shrink-0 flex items-center justify-center rounded-xl bg-body-secondary text-primary transition-colors duration-300 group-hover:bg-(--app-color-primary) group-hover:text-white'>
                    <Icon size={18}>{item.icon}</Icon>
                  </span>
                  <span className='min-w-0 flex flex-col'>
                    <span className='text-secondary-50 font-secondary text-xs font-semibold'>
                      {item.label}
                    </span>
                    <span className='text-secondary font-secondary text-sm font-medium leading-6'>
                      {item.text}
                    </span>
                  </span>
                </>
              );

              return (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='group flex items-start gap-3 rounded-xl'
                    >
                      {content}
                    </a>
                  ) : (
                    <div className='flex items-start gap-3'>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <nav aria-label='Enlaces del pie de página'>
          <FooterTitle>Enlaces</FooterTitle>
          <ul className='flex flex-col gap-1'>
            {NAV.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className='group -ms-3 inline-flex items-center gap-1.5 rounded-full py-2 px-3 text-secondary font-secondary font-semibold transition-colors duration-300 hover:text-primary hover:bg-(--app-color-primary)/5'
                >
                  {link.text}
                  <span className='opacity-0 -translate-x-1 transition-[opacity,transform] duration-300 group-hover:opacity-100 group-hover:translate-x-0'>
                    <Icon size={16}>
                      <path d='m9 18 6-6-6-6' />
                    </Icon>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className='border-t border-black/5 bg-body-secondary'>
        <div className='w-full md:w-3/4 flex flex-col-reverse md:flex-row items-center justify-between gap-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] px-6 md:px-0 mx-auto'>
          <div className='flex flex-col md:flex-row items-center gap-1 md:gap-3 text-center text-secondary-50 font-secondary text-sm'>
            <span>
              &copy; {new Date().getFullYear()} {CONFIG.APP_NAME}
            </span>
            <span className='hidden md:inline' aria-hidden='true'>
              ·
            </span>
            <span>
              Desarrollado por{' '}
              <a
                href='https://johnfreddyrivera.netlify.app'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary font-semibold underline-offset-4 hover:underline'
              >
                John Rivera
              </a>
            </span>
          </div>
          <Button
            as='a'
            href='#inicio'
            variant='secondary'
            padding='py-2 ps-4 pe-3'
            className='text-sm bg-white'
          >
            Volver arriba
            <Icon size={16}>
              <path d='m5 12 7-7 7 7' />
              <path d='M12 19V5' />
            </Icon>
          </Button>
        </div>
      </div>
    </footer>
  );
}
