import { useEffect, useRef, type HTMLAttributes, type PropsWithChildren, type RefObject } from 'react';
import styled from '@emotion/styled';

export type GlareProps = {
  /** 기준점이 될 부모 element의 ref */
  parentRef: RefObject<HTMLElement | null>;
} & PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

/** 커서 주변을 밝게 해주는 오버레이 컴포넌트입니다 */
export const Glare = ({ parentRef, ...props }: GlareProps) => {
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parentEl = parentRef.current;
    const childEl = childRef.current;
    if (!parentEl || !childEl) return;

    let frameId: number | null = null;
    const onMouseMove = (e: MouseEvent) => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const { left, top, width, height } = parentEl.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        childEl.style.display = 'block';
        childEl.style.background = `
        radial-gradient(
          circle 200px at ${x}% ${y}%,
          rgba(255, 255, 255, 0.4) 0%,
          rgba(255, 255, 255, 0.2) 40%,
          rgba(255, 255, 255, 0.05) 70%,
          rgba(255, 255, 255, 0) 100%)`;
      });
    };

    const onMouseLeave = () => {
      if (frameId) cancelAnimationFrame(frameId);
      childEl.style.display = 'none';
    };

    parentEl.addEventListener('mouseleave', onMouseLeave);
    parentEl.addEventListener('mousemove', onMouseMove);
    return () => {
      parentEl.removeEventListener('mouseleave', onMouseLeave);
      parentEl.removeEventListener('mousemove', onMouseMove);
    };
  }, [parentRef]);

  return <Wrapper ref={childRef} {...props} />;
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  border-radius: 10px;
  pointer-events: none;
  filter: blur(60px);
  transition: background 0.1s;
`;
