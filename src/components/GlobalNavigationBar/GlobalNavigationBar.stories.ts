import type { Meta, StoryObj } from '@storybook/react';
import { GlobalNavigationBar } from './GlobalNavigationBar';

const meta = {
  title: 'Components/Layout/GNB',
  component: GlobalNavigationBar,
  tags: ['autodocs'],
} satisfies Meta<typeof GlobalNavigationBar>;

export default meta;

export const Genshin_Impact = {
  args: { game: 'genshin' },
} satisfies StoryObj<typeof GlobalNavigationBar>;

export const Honkai_Starrail = {
  args: { game: 'hsr' },
} satisfies StoryObj<typeof GlobalNavigationBar>;

export const Zenless_Zone_Zero = {
  args: { game: 'zzz' },
} satisfies StoryObj<typeof GlobalNavigationBar>;
