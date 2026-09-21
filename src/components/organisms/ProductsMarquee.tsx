import { useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { PRODUCTS } from '../../constants/data';
import { ProductItem } from '../molecules/ProductItem';

export function ProductsMarquee() {
  const x = useMotionValue(0);

  const trackRef = useRef<HTMLDivElement>(null);

  const animationFrame = useRef<number | null>(null);

  const isDragging = useRef(false);
  const isInertia = useRef(false);
  const hasMoved = useRef(false);

  const startX = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);

  const velocity = useRef(0);

  const trackWidth = useRef(0);

  const AUTO_SPEED = 0.45;
  const FRICTION = 0.96;
  const DRAG_THRESHOLD = 6;

  const normalizePosition = (value: number) => {
    const width = trackWidth.current;

    if (!width) return value;

    if (value <= -width) {
      return value + width;
    }

    if (value >= 0) {
      return value - width;
    }

    return value;
  };

  const animate = () => {
    if (!isDragging.current) {
      let currentVelocity = velocity.current;

      if (isInertia.current && Math.abs(currentVelocity) > AUTO_SPEED) {
        currentVelocity *= FRICTION;
        velocity.current = currentVelocity;
      } else {
        isInertia.current = false;

        if (currentVelocity > 0) {
          currentVelocity = AUTO_SPEED;
        } else {
          currentVelocity = -AUTO_SPEED;
        }

        velocity.current = currentVelocity;
      }

      x.set(
        normalizePosition(
          x.get() + currentVelocity
        )
      );
    }

    animationFrame.current = requestAnimationFrame(animate);
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    startX.current = event.clientX;
    lastX.current = event.clientX;
    lastTime.current = performance.now();

    hasMoved.current = false;
    isDragging.current = false;
    isInertia.current = false;

    velocity.current = 0;
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const currentX = event.clientX;
    const movement = currentX - startX.current;

    if (!isDragging.current) {
      if (Math.abs(movement) < DRAG_THRESHOLD) {
        return;
      }

      isDragging.current = true;
      hasMoved.current = true;

      event.currentTarget.setPointerCapture(event.pointerId);
    }

    const now = performance.now();
    const deltaX = currentX - lastX.current;
    const deltaTime = now - lastTime.current;

    if (deltaTime > 0) {
      velocity.current = deltaX / deltaTime * 16;
    }

    x.set(
      normalizePosition(
        x.get() + deltaX
      )
    );

    lastX.current = currentX;
    lastTime.current = now;
  };

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isDragging.current) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    isDragging.current = false;
    isInertia.current = true;
  };

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        trackWidth.current = trackRef.current.offsetWidth / 2;
      }
    };

    measure();

    // Movimento inicial hacia la derecha
    velocity.current = AUTO_SPEED;

    animationFrame.current = requestAnimationFrame(animate);

    const observer = new ResizeObserver(measure);

    if (trackRef.current) {
      observer.observe(trackRef.current);
    }

    return () => {
      observer.disconnect();

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <div
      className='marquee-container relative flex w-full overflow-hidden mb-28'
      style={{
        touchAction: 'pan-y',
        userSelect: 'none',
        cursor: 'grab',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className='marquee-overlay absolute inset-0 z-10 pointer-events-none' />

      <motion.div
        ref={trackRef}
        style={{ x }}
        className='flex shrink-0 gap-10'
      >
        {PRODUCTS.map((product, i) => (
          <ProductItem
            key={i}
            width='w-44 md:w-52'
            item={product}
          />
        ))}

        {PRODUCTS.map((product, i) => (
          <ProductItem
            key={`duplicate-${i}`}
            width='w-44 md:w-52'
            item={product}
          />
        ))}
      </motion.div>
    </div>
  );
}