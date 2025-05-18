import type { Meta, StoryObj } from '@storybook/react';
import { CharacterCard } from './CharacterCard';

const meta = {
  title: 'Components/Genshin/CharacterCard',
  component: CharacterCard,
  tags: ['autodocs'],
} satisfies Meta<typeof CharacterCard>;

export default meta;

export const Default = {
  args: {
    name: '에스코피에',
    title: '화려한 맛의 화음',
    rarity: 5,
    elementText: '얼음',
    affiliation: '폰타인',
    region: '폰타인',
    constellation: '케이크타워자리',
    image: 'https://enka.network/ui/UI_AvatarIcon_Escoffier.png',
  },
} satisfies StoryObj<typeof CharacterCard>;
