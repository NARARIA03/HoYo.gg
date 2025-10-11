import type { Meta, StoryFn } from '@storybook/react';
import { useEffect, useRef, useState, type ComponentProps } from 'react';
import { ActiveCard } from './ActiveCard';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import { AnimatePresence } from 'motion/react';
import { fn } from '@storybook/test';

const meta = {
  title: 'Components/Genshin/ActiveCard',
  component: ActiveCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ActiveCard>;

export default meta;

const ANIMATION_DURATION = 2400;

export const Example: StoryFn<ComponentProps<typeof ActiveCard>> = () => {
  const triggerRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [activeCard, setActiveCard] = useState<{ rect: DOMRect } | null>(null);

  const handleClick = () => {
    const ref = triggerRef.current;
    if (ref) {
      const rect = ref.getBoundingClientRect();
      ref.style.opacity = '0';
      setActiveCard({ rect });
    }
  };

  const handleClose = () => {
    setActiveCard(null);
    timer.current = setTimeout(() => {
      const ref = triggerRef.current;
      if (ref && ref.style.opacity !== '1') {
        ref.style.opacity = '1';
      }
    }, ANIMATION_DURATION);
  };

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  return (
    <>
      <CharacterCard ref={triggerRef} {...MOCK_DATA} onClick={handleClick} />
      <AnimatePresence>
        {activeCard && (
          <ActiveCard rect={activeCard.rect} onClose={handleClose} duration={ANIMATION_DURATION}>
            <CharacterCard {...MOCK_DATA} onClick={() => {}} />
          </ActiveCard>
        )}
      </AnimatePresence>
    </>
  );
};

const MOCK_DATA = {
  name: '야에 미코',
  title: '속세를 비웃는 백 가지 자태',
  description:
    '나루카미 다이샤의 궁사 겸 「야에 출판사」 편집장. 아름다운 외모 아래 예상 밖의 지혜와 교활함이 숨겨져 있다',
  rank: 's',
  element: 'Electro',
  region: 'ASSOC_TYPE_FATUI',
  image: 'https://enka.network/ui/UI_AvatarIcon_Yae.png',
  onClick: fn(),
} satisfies ComponentProps<typeof CharacterCard>;
