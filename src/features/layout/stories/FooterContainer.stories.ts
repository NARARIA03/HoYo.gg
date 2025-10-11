import type { Meta, StoryObj } from '@storybook/react';
import FooterContainer from '../containers/FooterContainer';

const meta = {
  title: 'Components/Layout/Footer',
  component: FooterContainer,
  tags: ['autodocs'],
} satisfies Meta<typeof FooterContainer>;

export default meta;

export const Genshin_Impact = {
  args: { game: 'genshin' },
} satisfies StoryObj<typeof FooterContainer>;

export const Honkai_Starrail = {
  args: { game: 'hsr' },
} satisfies StoryObj<typeof FooterContainer>;

export const Zenless_Zone_Zero = {
  args: { game: 'zzz' },
} satisfies StoryObj<typeof FooterContainer>;
