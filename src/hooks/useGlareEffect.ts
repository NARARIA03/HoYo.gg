import { useEffect, type RefObject } from 'react';

type HookProps = {
  parentRef: RefObject<HTMLElement | null>;
  overlayRef: RefObject<HTMLElement | null>;
};

export const useGlareEffect = ({ parentRef, overlayRef }: HookProps) => {
  useEffect(() => {
    const parentEl = parentRef.current;
    const overlayEl = overlayRef.current;
    if (!parentEl || !overlayEl) return;

    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = parentEl.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      overlayEl.style.display = 'block';
      overlayEl.style.setProperty('--x', `${x}%`);
      overlayEl.style.setProperty('--y', `${y}%`);
    };

    const onMouseLeave = () => {
      overlayEl.style.display = 'none';
    };

    parentEl.addEventListener('mouseleave', onMouseLeave);
    parentEl.addEventListener('mousemove', onMouseMove);
    return () => {
      parentEl.removeEventListener('mouseleave', onMouseLeave);
      parentEl.removeEventListener('mousemove', onMouseMove);
    };
  }, [overlayRef, parentRef]);
};
