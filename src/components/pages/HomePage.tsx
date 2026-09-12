import { Header } from '../organisms/Header';
import { Hero } from '../organisms/Hero';
import { Products } from '../organisms/Products';
import { Contact } from '../organisms/Contact';
import { Footer } from '../organisms/Footer';
import { NavOffcanvas } from '../organisms/NavOffcanvas';
import { Cart } from '../organisms/Cart';

/**
 * Página de inicio
 */
export default function HomePage() {
  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <main className='flex-1 flex flex-col'>
        <Hero />
        <Products />
        <Contact />
      </main>
      <Footer />
      <NavOffcanvas />
      <Cart />
    </div>
  );
}
