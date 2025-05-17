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
    name: '루미네',
    title: '',
    rarity: 5,
    elementText: '없음',
    affiliation: '여행자',
    region: '',
    constellation: '나그네자리',
    image: 'https://enka.network/ui/UI_AvatarIcon_PlayerGirl.png',
  },
} satisfies StoryObj<typeof CharacterCard>;
