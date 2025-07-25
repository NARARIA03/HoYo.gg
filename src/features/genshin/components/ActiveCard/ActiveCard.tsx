import { createPortal } from 'react-dom';
import Image from 'next/image';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

type Props = {
  /** ActiveCard의 시작점 getBoundingClientRect 값입니다. */
  rect: DOMRect;
  /** backdrop 영역을 누르면 실행되는 함수입니다. */
  onClose: () => void;
  /** 애니메이션의 지속 시간입니다. 컨테이너와 통일하는 것이 좋습니다. */
  duration?: number;
  /** 카드 앞면에 렌더링할 ReactNode입니다. */
  children: ReactNode;
};

/** 특정 요소를 클릭하면, 클릭한 요소의 위치에서 시작해서 화면 중앙으로 커지면서 회전하며 다가오는 애니메이션을 처리하는 컴포넌트입니다. */
export const ActiveCard = ({ rect, onClose, duration, children }: Props) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;

  const center = {
    x: window.innerWidth / 2 - rect.width / 2,
    y: window.innerHeight / 2 - rect.height / 2,
  };

  return createPortal(
    <AnimatedBackdrop
      onClick={onClose}
      initial={{ background: 'rgba(0, 0, 0, 0)' }}
      animate={{ background: 'rgba(0, 0, 0, 0.4)' }}
      exit={{ background: 'rgba(0, 0, 0, 0)' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <AnimatedCardWrapper
        $width={rect.width}
        $height={rect.height}
        initial={{ transform: `translate3d(${rect.left}px, ${rect.top}px, 0px) scale(1) rotateY(0deg)` }}
        animate={{ transform: `translate3d(${center.x}px, ${center.y}px, 0px) scale(1.5) rotateY(360deg)` }}
        exit={{ transform: `translate3d(${rect.left}px, ${rect.top}px, 0px) scale(1) rotateY(720deg)` }}
        transition={{ duration: duration ? duration / 1000 : 0.8, ease: 'easeInOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card3D>
          <CardFront>{children}</CardFront>
          <CardBack>
            <BackImageWrapper>
              <Image src="/images/genshin/background/card.webp" alt="backface-card" fill />
            </BackImageWrapper>
          </CardBack>
        </Card3D>
      </AnimatedCardWrapper>
    </AnimatedBackdrop>,
    document.body
  );
};

const AnimatedBackdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const AnimatedCardWrapper = styled(motion.div)<{ $width: number; $height: number }>`
  position: fixed;
  inset: 0;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  transform-style: preserve-3d;
  backface-visibility: visible;
`;

const Card3D = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1200px;
  transform-style: preserve-3d;
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  backface-visibility: hidden;
`;

const CardBack = styled(CardFront)`
  padding: 15px;
  transform: rotateY(180deg);
  border-radius: 10px;
`;

const BackImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;

  & > img {
    object-position: center -30px;
    object-fit: cover;
    transform: scale(1.2);
    pointer-events: none;
    user-select: none;
  }
`;
