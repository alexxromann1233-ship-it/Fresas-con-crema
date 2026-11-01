import { PRODUCTS, TOPPINGS } from '../../constants/data';
import { Marquee } from '../organisms/Marquee';

/**
 * Listado de productos y toppings
 */
export function Products() {
  return (
    <section id='productos' className='relative min-h-screen bg-body'>
      <div
        className='absolute bottom-0 w-full h-28 bg-body-secondary'
        style={{
          WebkitMaskImage: `url(/images/brush-shape.svg)`,
          maskImage: `url(/images/brush-shape.svg)`,
          WebkitMaskSize: 'cover',
          maskSize: 'cover',
        }}
      />

      <div className='relative w-full md:w-3/4 h-full flex flex-col pt-16 md:pt-20 pb-32 px-6 md:px-0 mx-auto'>

        <h2 className='text-center text-primary text-4xl md:text-5xl font-primary mb-8 md:mb-10'>
          Productos
        </h2>

        <Marquee
          items={PRODUCTS}
          direction={1}
          itemWidth='w-44 md:w-52'
          className='mb-20 md:mb-28'
          trackClassName='gap-8 md:gap-10 pe-8 md:pe-10'
        />

        <h2 className='text-center text-primary text-4xl md:text-5xl font-primary mb-8 md:mb-10'>
          Toppings
        </h2>

        <Marquee
          items={TOPPINGS}
          direction={-1}
          itemWidth='w-32 md:w-44'
          className='mb-14'
          trackClassName='gap-10 md:gap-16 pe-10 md:pe-16'
        />

      </div>
    </section>
  );
}
