import { ToppingsMarquee } from '../organisms/ToppingsMarquee';
import { ProductsMarquee } from '../organisms/ProductsMarquee';

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

      <div className='relative w-full md:w-3/4 h-full flex flex-col py-18 px-6 md:px-0 mx-auto'>

        <h2 className='text-center text-primary text-4xl font-primary mb-7'>
          Productos
        </h2>

        <ProductsMarquee />

        <h2 className='text-center text-primary text-4xl font-primary mb-7'>
          Toppings
        </h2>

        <ToppingsMarquee />

      </div>
    </section>
  );
}