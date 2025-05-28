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
      overlayEl.style.filter = 'blur(60px)';
      overlayEl.style.background = `
      radial-gradient(
        circle 200px at ${x}% ${y}%,
        rgba(255, 255, 255, 0.4) 0%,
        rgba(255, 255, 255, 0.2) 40%,
        rgba(255, 255, 255, 0.05) 70%,
        rgba(255, 255, 255, 0) 100%)`;
      overlayEl.style.transition = 'background 0.1s';
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
