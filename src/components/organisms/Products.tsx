import { PRODUCTS, TOPPINGS } from '../../constants/data';
import { ProductItem } from '../molecules/ProductItem';

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

        
 <div className='products-grid grid grid-cols-3 gap-4 md:gap-10 mb-28 h-[520px] overflow-hidden'>
  <div className="products-carousel-track gap-10">
  {PRODUCTS.map((product, i) => (
    <div key={`first-${i}`} className="shrink-0">
      <ProductItem item={product} />
    </div>
  ))}

  {PRODUCTS.map((product, i) => (
    <div key={`second-${i}`} className="shrink-0">
      <ProductItem item={product} />
    </div>
  ))}
</div>
  
</div>

        <h2 className='text-center text-primary text-4xl font-primary mb-7'>
          Toppings
        </h2>

        <div className='marquee-container relative flex w-full overflow-hidden mb-14'>
          <div className='marquee-overlay absolute top-0 left-0 z-1 w-full h-full pointer-events-none' />

          <div className='marquee-track'>
            {TOPPINGS.map((topping, i) => (
              <ProductItem key={i} width='w-32 md:w-44' item={topping} />
            ))}
          </div>

          <div className='marquee-track' aria-hidden='true'>
            {TOPPINGS.map((topping, i) => (
              <ProductItem key={i} width='w-44' item={topping} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

