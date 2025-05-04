import { useMouseMove } from '@/hooks/useMouseMove';
import { type RefObject, useState } from 'react';

export const usePannelParallax = (ref: RefObject<HTMLElement | null>) => {
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useMouseMove({
    ref,
    callbackFn: (element, x, y) => {
      const { width, height } = element.getBoundingClientRect();
      const dx = (x / width - 0.5) * -25;
      const dy = (y / height - 0.5) * -25;
      setOffset({ x: dx, y: dy });
    },
  });

  return offset;
};
