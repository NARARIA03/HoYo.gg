import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { CharacterCard } from './CharacterCard';

const meta = {
  title: 'Components/Genshin/CharacterCard',
  component: CharacterCard,
  tags: ['autodocs'],
} satisfies Meta<typeof CharacterCard>;

export default meta;

export const Rarity_5_ellipsis = {
  args: {
    name: '야에 미코',
    title: '속세를 비웃는 백 가지 자태',
    description:
      '나루카미 다이샤의 궁사 겸 「야에 출판사」 편집장. 아름다운 외모 아래 예상 밖의 지혜와 교활함이 숨겨져 있다',
    rarity: 5,
    elementText: '번개',
    region: '이나즈마',
    image: 'https://enka.network/ui/UI_AvatarIcon_Yae.png',
    onClick: fn(),
  },
} satisfies StoryObj<typeof CharacterCard>;

export const Rarity_4_no_ellipsis = {
  args: {
    name: '콜레이',
    title: '다시 움튼 새싹',
    description: '아비디야 숲에서 활약하는 숲의 견습 순찰자. 열정적인 겉모습 뒤에 조금은 내성적인 성격이 숨겨져 있다',
    rarity: 4,
    elementText: '풀',
    region: '수메르',
    image: 'https://enka.network/ui/UI_AvatarIcon_Collei.png',
    onClick: fn(),
  },
} satisfies StoryObj<typeof CharacterCard>;
