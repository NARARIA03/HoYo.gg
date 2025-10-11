import type { Meta, StoryObj } from '@storybook/react';
import { CharacterFilter } from './CharacterFilter';

const meta = {
  title: 'Components/Genshin/CharacterFilter',
  component: CharacterFilter,
  tags: ['autodocs'],
} satisfies Meta<typeof CharacterFilter>;

export default meta;

export const Example = {} satisfies StoryObj<typeof CharacterFilter>;
