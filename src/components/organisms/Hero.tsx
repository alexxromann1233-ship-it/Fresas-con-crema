import { CONFIG } from '../../constants/config';
import { KPI } from '../../constants/data';
import { Button } from '../atoms/Button';

/**
 * Sección de hero
 */
export function Hero() {
  return (
    <section id='inicio' className='relative min-h-screen bg-body-secondary'>
      <div
        className='absolute bottom-0 w-full h-70 bg-body'
        style={{
          WebkitMaskImage: `url(/images/drippy-shape.svg)`,
          maskImage: `url(/images/drippy-shape.svg)`,
          WebkitMaskSize: 'cover',
          maskSize: 'cover',
        }}
      />
      <div className='relative w-full md:w-3/4 h-full flex flex-col gap-8 py-14 px-6 md:px-0 mx-auto'>
        <div className='w-full h-full flex flex-col-reverse md:flex-row justify-center md:items-center'>
          <div className='w-full flex flex-col animate-fade-in-up'>
            <h1 className='text-primary font-primary text-6xl mb-3'>
              {CONFIG.APP_NAME}
            </h1>
            <p className='text-secondary font-secondary leading-7 mb-7'>
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
              className='w-auto h-full'
              src={CONFIG.SRC_MAIN_IMG}
              alt='Imagen hola'
            />
          </div>
        </div>
        <ul className='flex justify-between animate-fade-in-up animate-delay-400'>
          {KPI.map((item, i) => (
            <li key={i} className='flex flex-col items-center'>
              <span className='text-primary text-4xl font-primary mb-1'>
                {item.value}
              </span>
              <span className='text-secondary font-secondary'>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
