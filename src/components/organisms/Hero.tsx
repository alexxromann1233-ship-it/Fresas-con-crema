import { CONFIG } from '../../constants/config';
import { KPI } from '../../constants/data';
import { Button } from '../atoms/Button';

/**
 * Sección de hero
 */
export function Hero() {
  return (
    <section
      id='inicio'
      className='relative min-h-screen flex flex-col bg-body-secondary'
    >
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
          <div className='w-full flex flex-col animate-fade-in-up'>
            <h1 className='text-primary font-primary text-5xl md:text-6xl lg:text-7xl leading-tight mb-4'>
              {CONFIG.APP_NAME}
            </h1>
            <p className='max-w-xl text-secondary font-secondary text-base md:text-lg leading-7 md:leading-8 mb-8'>
              {CONFIG.DESCRIPTION}
            </p>
            <div className='flex flex-col md:flex-row gap-4'>
              <Button as='a' href='#productos'>
                Ver Productos
              </Button>
              <Button as='a' href='#contacto' variant='secondary'>
                Hacer Pedido
              </Button>
            </div>
          </div>
          <div className='w-full h-[28dvh] md:h-[70dvh] flex justify-center md:justify-end animate-fade-in-up animate-delay-200'>
            <img
              className='w-auto h-full object-contain drop-shadow-xl'
              src={CONFIG.SRC_MAIN_IMG}
              alt={`Vaso de ${CONFIG.APP_NAME.toLowerCase()}`}
              fetchPriority='high'
              draggable={false}
            />
          </div>
        </div>
        <ul className='flex justify-between animate-fade-in-up animate-delay-400'>
          {KPI.map((item, i) => (
            <li key={i} className='flex flex-col items-center'>
              <span className='text-primary text-3xl md:text-4xl font-primary mb-1'>
                {item.value}
              </span>
              <span className='text-secondary font-secondary text-sm md:text-base font-medium'>
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
