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
    <section
      id='contacto'
      className='relative min-h-screen flex flex-col bg-body-secondary'
    >
      <div
        className='absolute bottom-0 w-full h-64 bg-body'
        style={{
          WebkitMaskImage: `url(/images/drippy-shape.svg)`,
          maskImage: `url(/images/drippy-shape.svg)`,
          WebkitMaskSize: 'cover',
          maskSize: 'cover',
        }}
      />
      <div className='relative flex-1 w-full md:w-3/4 flex flex-col justify-center pt-24 pb-56 md:pb-48 px-6 md:px-0 mx-auto'>
        <h2 className='text-center text-primary text-4xl md:text-5xl font-primary leading-tight mb-4'>
          ¿Listo para tu Pedido?
        </h2>
        <p className='max-w-lg text-center text-secondary font-secondary md:text-lg leading-7 md:leading-8 mx-auto mb-8'>
          Contáctanos por WhatsApp y disfruta de las mejores fresas con crema de
          Cartago
        </p>
        <div className='w-full max-w-sm flex flex-col gap-4 mx-auto'>
          <Button variant='whatsapp' onClick={handleOrder}>Pedir por WhatsApp</Button>
          <Button variant='secondary' onClick={handleToggleCart}>Ver Carrito ({cart.length})</Button>
        </div>
      </div>
    </section>
  );
}
