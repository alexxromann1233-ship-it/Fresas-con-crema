import { useAppStore } from '../../store/appStore';
import { useWhatsAppOrder } from '../../hooks/useWhatsAppOrder';
import { Button } from '../atoms/Button';

/**
 * Sección de contacto
 */
export function Contact() {
  const cart = useAppStore((s) => s.cart);
  const handleToggleCart = useAppStore((s) => s.handleToggleCart);
  const handleOrder = useWhatsAppOrder();

  return (
    <section id='contacto' className='relative min-h-screen bg-body-secondary'>
      <div
        className='absolute bottom-0 w-full h-64 bg-body'
        style={{
          WebkitMaskImage: `url(/images/drippy-shape.svg)`,
          maskImage: `url(/images/drippy-shape.svg)`,
          WebkitMaskSize: 'cover',
          maskSize: 'cover',
        }}
      />
      <div className='relative w-full md:w-3/4 h-full flex flex-col justify-center px-6 md:px-0 mx-auto'>
        <h2 className='text-center text-primary text-4xl font-primary mb-4'>
          ¿Listo para tu Pedido?
        </h2>
        <p className='text-center text-secondary font-secondary leading-7 mb-6'>
          Contáctanos por WhatsApp y disfruta de las mejores fresas con crema de
          Cartago
        </p>
        <div className='w-full md:w-1/3 flex flex-col gap-4 mx-auto'>
          <Button variant='whatsapp' onClick={handleOrder}>Pedir por WhatsApp</Button>
          <Button variant='secondary' onClick={handleToggleCart}>Ver Carrito ({cart.length})</Button>
        </div>
      </div>
    </section>
  );
}
