import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta = {
  title: 'Components/Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;

export const Genshin_Impact = {
  args: { game: 'genshin' },
} satisfies StoryObj<typeof Footer>;

export const Honkai_Starrail = {
  args: { game: 'hsr' },
} satisfies StoryObj<typeof Footer>;

export const Zenless_Zone_Zero = {
  args: { game: 'zzz' },
} satisfies StoryObj<typeof Footer>;
