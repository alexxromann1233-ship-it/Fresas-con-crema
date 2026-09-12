import { lazy, Suspense } from 'react';
import { CONFIG } from './constants/config';

const HomePage = lazy(() => import('./components/pages/HomePage'));

/**
 * Aplicación
 */
export default function App() {
  return (
    <Suspense
      fallback={
        <div className='h-screen flex justify-center items-center bg-body-secondary'>
          <img
            className='w-30 animate-pulse'
            src={CONFIG.SRC_LOGO}
            alt={`Logo de ${CONFIG.APP_NAME}`}
          />
        </div>
      }
    >
      <HomePage />
    </Suspense>
  );
}
