import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { SearchInputForm } from './SearchInputForm';

const meta = {
  title: 'Components/Common/SearchInputForm',
  component: SearchInputForm,
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof SearchInputForm>;

export default meta;

export const Example = {
  args: {
    onSubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const keyword = formData.get('keyword');
      alert(`검색 키워드: ${keyword}`);
    },
  },
} satisfies StoryObj<typeof SearchInputForm>;
