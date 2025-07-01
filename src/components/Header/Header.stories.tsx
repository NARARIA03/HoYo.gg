import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta = {
  title: 'Components/Common/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;

export const Genshin_Impact = {
  args: { game: 'genshin' },
} satisfies StoryObj<typeof Header>;

export const Honkai_Starrail = {
  args: { game: 'hsr' },
} satisfies StoryObj<typeof Header>;

export const Zenless_Zone_Zero = {
  args: { game: 'zzz' },
} satisfies StoryObj<typeof Header>;
