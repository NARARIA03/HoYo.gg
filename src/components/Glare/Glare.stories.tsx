import type { Meta, StoryFn } from '@storybook/react';
import styled from '@emotion/styled';
import { type ComponentProps, useRef } from 'react';
import { Glare } from './Glare';

const meta = {
  title: 'Components/Common/Glare',
  component: Glare,
  tags: ['autodocs'],
} satisfies Meta<typeof Glare>;

export default meta;

export const Example: StoryFn<ComponentProps<typeof Glare>> = (args) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  return (
    <Wrapper ref={parentRef}>
      <Glare {...args} parentRef={parentRef} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  background-color: gray;
`;
