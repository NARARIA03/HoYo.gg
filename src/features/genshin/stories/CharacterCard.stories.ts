import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { CharacterCard } from '../components/CharacterCard';

const meta = {
  title: 'Components/Genshin/CharacterCard',
  component: CharacterCard,
  tags: ['autodocs'],
} satisfies Meta<typeof CharacterCard>;

export default meta;

export const Rarity_5_ellipsis = {
  args: {
    name: '유메미즈키 미즈키',
    title: '아름답게 얽힌 꿈',
    description:
      '「아이사 대중탕」의 대주주 겸 바쿠 일족의 심리 치료사. 악몽을 몰아내고 사람들의 마음에 평화를 가져다 주기 위해 열심히 노력하고 있다',
    rarity: 5,
    elementText: '바람',
    region: '이나즈마',
    image: 'https://enka.network/ui/UI_AvatarIcon_Mizuki.png',
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
