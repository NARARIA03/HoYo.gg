import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { CharacterCard } from '../components/CharacterCard';

const meta = {
  title: 'Components/Genshin/CharacterCard',
  component: CharacterCard,
  tags: ['autodocs'],
} satisfies Meta<typeof CharacterCard>;

export default meta;

export const Rarity_5 = {
  args: {
    name: '에스코피에',
    title: '화려한 맛의 화음',
    description:
      '폰타인에서 명성이 자자한 드보르 호텔 전 주방장. 「디저트 대령」이라는 칭호를 가진 「과학 요리」의 선구자로, 요리에 대한 기준이 매우 엄격하다',
    rarity: 5,
    elementText: '얼음',
    region: '폰타인',
    image: 'https://enka.network/ui/UI_AvatarIcon_Escoffier.png',
    onClick: fn(),
  },
} satisfies StoryObj<typeof CharacterCard>;

export const Rarity_4 = {
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
