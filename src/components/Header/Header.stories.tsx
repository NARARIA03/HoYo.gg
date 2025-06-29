import type { Meta, StoryObj } from '@storybook/react';
import styled from '@emotion/styled';
import { Header } from './Header';

const meta = {
  title: 'Components/Common/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
        <Body>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore corrupti nobis ducimus. Ea quasi illum
          voluptas, vel consequuntur eius excepturi eveniet temporibus quas, ipsam ad? Accusantium deserunt
          reprehenderit odio eius?
        </Body>
      </Wrapper>
    ),
  ],
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

const Wrapper = styled.div`
  background-color: rgb(30, 30, 47);
  height: 200px;
  overflow-y: auto;
`;

const Body = styled.div`
  color: white;
  font-size: 48px;
`;
