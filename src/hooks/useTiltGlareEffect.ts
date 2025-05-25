import { useEffect, type RefObject } from 'react';

type HookProps = {
  parentRef: RefObject<HTMLElement | null>;
  childRef: RefObject<HTMLElement | null>;
};

export const useTiltGlareEffect = ({ parentRef, childRef }: HookProps) => {
  useEffect(() => {
    const parentEl = parentRef.current;
    const childEl = childRef.current;
    if (!parentEl || !childEl) return;

    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = parentEl.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;
      const rotateX = (-offsetY / (height / 2)) * 25;
      const rotateY = (offsetX / (width / 2)) * 25;
      childEl.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const onMouseLeave = () => {
      childEl.style.transform = `perspective(500px) rotateX(0deg) rotateY(0deg)`;
    };

    parentEl.addEventListener('mouseleave', onMouseLeave);
    parentEl.addEventListener('mousemove', onMouseMove);
    return () => {
      parentEl.removeEventListener('mouseleave', onMouseLeave);
      parentEl.removeEventListener('mousemove', onMouseMove);
    };
  }, [childRef, parentRef]);
};
