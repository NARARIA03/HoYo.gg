import type { Meta, StoryFn } from '@storybook/react';
import { Hologram, type HologramProps } from './Hologram';
import styled from '@emotion/styled';
import { useRef } from 'react';

const meta = {
  title: 'Components/Common/Hologram',
  component: Hologram,
  tags: ['autodocs'],
} satisfies Meta<typeof Hologram>;

export default meta;

export const Example: StoryFn<HologramProps> = (args) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  return (
    <Wrapper ref={parentRef}>
      <Hologram {...args} parentRef={parentRef} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  background-color: gray;
`;
