import type { Meta, StoryFn } from '@storybook/react';
import { useEffect, useRef, useState, type ComponentProps } from 'react';
import { ActiveCard } from './ActiveCard';
import type { MinimizedGenshinCharacterDTO } from '../../types/genshinDbDto';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import { AnimatePresence } from 'motion/react';

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
  id: 10000109,
  name: '유메미즈키 미즈키',
  title: '아름답게 얽힌 꿈',
  description:
    '「아이사 대중탕」의 대주주 겸 바쿠 일족의 심리 치료사. 악몽을 몰아내고 사람들의 마음에 평화를 가져다 주기 위해 열심히 노력하고 있다',
  rarity: 5,
  elementText: '바람',
  region: '이나즈마',
  image: 'https://enka.network/ui/UI_AvatarIcon_Mizuki.png',
} satisfies MinimizedGenshinCharacterDTO;
