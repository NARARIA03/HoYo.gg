import type { Meta, StoryObj } from '@storybook/react';
import { CharacterCardWrapper } from './CharacterCardWrapper';

const meta = {
  title: 'Components/Genshin/CharacterCardWrapper',
  component: CharacterCardWrapper,
  tags: ['autodocs'],
} satisfies Meta<typeof CharacterCardWrapper>;

export default meta;

export const Example = {
  args: {
    name: '야에 미코',
    title: '속세를 비웃는 백 가지 자태',
    description:
      '나루카미 다이샤의 궁사 겸 「야에 출판사」 편집장. 아름다운 외모 아래 예상 밖의 지혜와 교활함이 숨겨져 있다',
    rank: 's',
    element: 'Electro',
    region: 'ASSOC_TYPE_FATUI',
    image: 'https://enka.network/ui/UI_AvatarIcon_Yae.png',
  },
} satisfies StoryObj<typeof CharacterCardWrapper>;
