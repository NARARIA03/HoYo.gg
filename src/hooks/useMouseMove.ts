import { useEffect, type RefObject } from 'react';

type HookProps = {
  ref: RefObject<HTMLElement | null>;
  callbackFn: (element: HTMLElement, x: number, y: number) => void;
};

/**
 * @description 특정 element 위에서 마우스가 움직일 때, offset 값을 기반으로 계산해야 하는 경우 사용할 공용 훅입니다.
 */
export const useMouseMove = ({ ref, callbackFn }: HookProps) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frameId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        callbackFn(element, e.offsetX, e.offsetY);
        frameId = null;
      });
    };

    element?.addEventListener('mousemove', handleMouseMove);
    return () => element?.removeEventListener('mousemove', handleMouseMove);
  }, [ref, callbackFn]);
};
