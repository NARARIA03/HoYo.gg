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
    rarity: 5,
    elementText: '얼음',
    affiliation: '폰타인',
    region: '폰타인',
    constellation: '케이크타워자리',
    image: 'https://enka.network/ui/UI_AvatarIcon_Escoffier.png',
    onClick: fn(),
  },
} satisfies StoryObj<typeof CharacterCard>;

export const Rarity_4 = {
  args: {
    name: '콜레이',
    title: '다시 움튼 새싹',
    rarity: 4,
    elementText: '풀',
    affiliation: '간다르바 성곽',
    region: '수메르',
    constellation: '서발자리',
    image: 'https://enka.network/ui/UI_AvatarIcon_Collei.png',
    onClick: fn(),
  },
} satisfies StoryObj<typeof CharacterCard>;
