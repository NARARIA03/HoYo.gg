import { useEffect, type RefObject, type HTMLAttributes, type PropsWithChildren, useRef } from 'react';
import styled from '@emotion/styled';

type Props = {
  /** 기준점이 될 부모 element의 ref */
  parentRef: RefObject<HTMLElement | null>;
} & PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

/** 커서 위치에 따라 빛이 들어오는 효과가 움직이는 오버레이 컴포넌트입니다 */
export const Hologram = ({ parentRef, ...props }: Props) => {
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
        childEl.style.backgroundPosition = `${x}% ${y}%`;
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
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-radius: inherit;
  overflow: hidden;
  background:
    linear-gradient(110deg, transparent 35%, rgba(125, 228, 21, 0.7) 42%, rgba(229, 236, 20, 0.5) 50%, transparent 58%),
    linear-gradient(150deg, rgba(50, 200, 255, 0.15), rgba(255, 100, 200, 0.15));
  filter: brightness(1.1) contrast(2) saturate(1.8) hue-rotate(20deg);
  mix-blend-mode: soft-light;
  background-size: 200% 200%;
  background-position: 100%;
  transition: background-position 0.1s;
`;
