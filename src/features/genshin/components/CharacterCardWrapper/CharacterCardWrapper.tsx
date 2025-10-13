import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { noop } from '@/utils';
import type { TRank } from '@/types/common';
import { CharacterCard } from './CharacterCard';
import { ActiveCard } from './ActiveCard';
import type { GIElementDTO, GIRegionDTO } from '../../types/baseDto';

type Props = {
  /** 이름 */
  name: string;
  /** 타이틀 */
  title: string;
  /** 캐릭터 소개글 */
  description: string;
  /** 등급 */
  rank: TRank;
  /** 사용 원소 */
  element: GIElementDTO;
  /** 지역 */
  region: GIRegionDTO;
  /** 이미지 url */
  image: string;
};

const ANIMATION_DURATION = 600;

/**
 * CharacterCard, ActiveCard 컴포넌트를 관리하는 Wrapper입니다.
 */
export const CharacterCardWrapper = (props: Props) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const cardRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleCardOpen = () => {
    if (cardRef.current) {
      cardRef.current.style.opacity = '0';
      setIsActive(true);
    }
  };

  const handleCardClose = () => {
    setIsActive(false);
    timerRef.current = setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.style.opacity = '1';
      }
    }, ANIMATION_DURATION);
  };

  useLockBodyScroll({ isLock: isActive });

  useEffect(() => {
    if (cardRef.current) {
      setRect(cardRef.current.getBoundingClientRect());
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div>
      <CharacterCard {...props} ref={cardRef} onClick={handleCardOpen} />
      <AnimatePresence>
        {isActive && rect && (
          <ActiveCard rect={rect} onClose={handleCardClose} duration={ANIMATION_DURATION}>
            <CharacterCard {...props} onClick={noop} />
          </ActiveCard>
        )}
      </AnimatePresence>
    </div>
  );
};
