import type { Meta, StoryObj } from '@storybook/react';
import HeaderContainer from '../containers/HeaderContainer';

const meta = {
  title: 'Components/Layout/Header',
  component: HeaderContainer,
  tags: ['autodocs'],
} satisfies Meta<typeof HeaderContainer>;

export default meta;

export const Genshin_Impact = {
  args: { game: 'genshin' },
} satisfies StoryObj<typeof HeaderContainer>;

export const Honkai_Starrail = {
  args: { game: 'hsr' },
} satisfies StoryObj<typeof HeaderContainer>;

export const Zenless_Zone_Zero = {
  args: { game: 'zzz' },
} satisfies StoryObj<typeof HeaderContainer>;
