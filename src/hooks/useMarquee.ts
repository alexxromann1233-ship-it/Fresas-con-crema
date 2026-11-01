import { useEffect, useRef } from 'react';
import { useMotionValue } from 'framer-motion';

// Sin desplazamiento automático si el usuario prefiere menos movimiento
const AUTO_SPEED = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ? 0
  : 27; // px/s

// Fracción de velocidad que se conserva por cada frame de 60 fps
const FRICTION = 0.975;

const FRAME_MS = 1000 / 60;

// Distancia mínima para considerar el gesto como arrastre y no como toque
const DRAG_THRESHOLD = 6;
const TOUCH_DRAG_THRESHOLD = 3;

// Ventana de muestras usada para calcular la velocidad al soltar
const VELOCITY_WINDOW_MS = 100;

// Evita saltos cuando el navegador pausa los frames (pestaña oculta, etc.)
const MAX_FRAME_MS = 64;

interface Sample {
  x: number;
  time: number;
}

/**
 * Hook para carruseles infinitos con desplazamiento automático,
 * arrastre e inercia. La pista debe contener los elementos duplicados.
 *
 * @param direction 1 hacia la derecha, -1 hacia la izquierda
 */
export const useMarquee = (direction: 1 | -1 = 1) => {
  const x = useMotionValue(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;

    let trackWidth = 0;
    let velocity = direction * AUTO_SPEED; // px/s
    let currentDirection: number = direction;

    let animationFrame: number | null = null;
    let lastFrame = 0;

    let pointerId: number | null = null;
    let isDragging = false;
    let startX = 0;
    let lastX = 0;
    let samples: Sample[] = [];
    let suppressClick = false;
    let threshold = DRAG_THRESHOLD;

    const wrap = (value: number) => {
      if (!trackWidth) return value;

      return ((value % trackWidth) - trackWidth) % trackWidth;
    };

    const tick = (time: number) => {
      const delta = Math.min(time - lastFrame, MAX_FRAME_MS);
      lastFrame = time;

      // Mientras se mantiene presionado, la cinta queda "agarrada"
      if (pointerId === null) {
        // La velocidad tiende suavemente a la automática en la dirección actual
        const target = currentDirection * AUTO_SPEED;
        const decay = Math.pow(FRICTION, delta / FRAME_MS);

        velocity = target + (velocity - target) * decay;

        x.set(wrap(x.get() + velocity * (delta / 1000)));
      }

      animationFrame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (animationFrame !== null) return;

      lastFrame = performance.now();
      animationFrame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (animationFrame === null) return;

      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    };

    const release = () => {
      if (pointerId === null) return;

      if (isDragging) {
        const now = performance.now();
        const recent = samples.filter((s) => now - s.time <= VELOCITY_WINDOW_MS);
        const first = recent[0];
        const last = recent[recent.length - 1];

        velocity = first && last && last.time > first.time
          ? ((last.x - first.x) / (last.time - first.time)) * 1000
          : 0;

        if (Math.abs(velocity) > AUTO_SPEED) {
          currentDirection = Math.sign(velocity);
        }
      } else {
        velocity = 0;
      }

      // La captura se libera sola al terminar el gesto
      pointerId = null;
      isDragging = false;
      samples = [];
    };

    const handlePointerDown = (event: PointerEvent) => {
      // Solo el botón principal del ratón o un dedo/lápiz
      if (pointerId !== null || (event.pointerType === 'mouse' && event.button !== 0)) {
        return;
      }

      pointerId = event.pointerId;
      isDragging = false;
      suppressClick = false;
      threshold = event.pointerType === 'mouse' ? DRAG_THRESHOLD : TOUCH_DRAG_THRESHOLD;
      startX = event.clientX;
      lastX = event.clientX;
      samples = [{ x: event.clientX, time: event.timeStamp }];
    };

    const handlePointerMove = (event: PointerEvent) => {
      // Ignora el movimiento del ratón sin botón presionado
      if (event.pointerId !== pointerId) return;

      if (!isDragging) {
        if (Math.abs(event.clientX - startX) < threshold) return;

        isDragging = true;
        suppressClick = true;
        lastX = event.clientX;
        container.setPointerCapture(event.pointerId);
      }

      x.set(wrap(x.get() + event.clientX - lastX));
      lastX = event.clientX;

      samples.push({ x: event.clientX, time: event.timeStamp });

      if (samples.length > 20) samples.shift();
    };

    const handlePointerEnd = (event: PointerEvent) => {
      if (event.pointerId === pointerId) release();
    };

    // En táctil el dedo queda capturado por el elemento tocado; al pasar la
    // captura al contenedor, ese hijo emite su propio lostpointercapture que
    // sube hasta aquí y no significa que el dedo se haya soltado
    const handleLostPointerCapture = (event: PointerEvent) => {
      if (event.target === container) handlePointerEnd(event);
    };

    // Evita que un arrastre termine activando el botón "Agregar"
    const handleClick = (event: MouseEvent) => {
      if (!suppressClick) return;

      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
    };

    // En táctil el navegador cancela el puntero si empieza a hacer scroll
    // vertical. Se decide el eje en los primeros píxeles: si es horizontal se
    // bloquea el scroll nativo y el arrastre ya no se interrumpe.
    let touchStartX = 0;
    let touchStartY = 0;
    let touchAxis: 'x' | 'y' | null = null;

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];

      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchAxis = null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];

      if (touchAxis === null) {
        const dx = Math.abs(touch.clientX - touchStartX);
        const dy = Math.abs(touch.clientY - touchStartY);

        if (Math.max(dx, dy) < 3) return;

        touchAxis = dx > dy ? 'x' : 'y';
      }

      if (touchAxis === 'x' && event.cancelable) event.preventDefault();
    };

    const measure = () => {
      trackWidth = track.offsetWidth / 2;
      x.set(wrap(x.get()));
    };

    // Solo anima mientras el carrusel está en pantalla
    const intersection = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });

    const resize = new ResizeObserver(measure);

    measure();
    intersection.observe(container);
    resize.observe(track);

    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerup', handlePointerEnd);
    container.addEventListener('pointercancel', handlePointerEnd);
    container.addEventListener('lostpointercapture', handleLostPointerCapture);
    container.addEventListener('click', handleClick, true);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      stop();
      intersection.disconnect();
      resize.disconnect();

      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerup', handlePointerEnd);
      container.removeEventListener('pointercancel', handlePointerEnd);
      container.removeEventListener('lostpointercapture', handleLostPointerCapture);
      container.removeEventListener('click', handleClick, true);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [direction, x]);

  return { x, containerRef, trackRef };
};
