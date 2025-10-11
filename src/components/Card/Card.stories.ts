import type { Meta, StoryObj } from '@storybook/react';
import { IMAGES } from '@/constants/images';
import { Card } from './Card';

const meta = {
  title: 'Components/Common/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

export const Genshin_Char_5_Star = {
  args: {
    name: '야에 미코',
    imageUrl: 'https://enka.network/ui/UI_AvatarIcon_Yae.png',
    rank: 's',
    rightIcon: {
      src: IMAGES.genshin.element.Electro,
      alt: '번개',
    },
    href: '',
  },
} satisfies StoryObj<typeof Card>;

export const Genshin_Char_4_Star = {
  args: {
    name: '콜레이',
    imageUrl: 'https://enka.network/ui/UI_AvatarIcon_Collei.png',
    rank: 'a',
    rightIcon: {
      src: IMAGES.genshin.element.Dendro,
      alt: '풀',
    },
    href: '',
  },
} satisfies StoryObj<typeof Card>;

export const HSR_Char_5_Star = {
  args: {
    name: '케리드라',
    imageUrl: 'https://api.hakush.in/hsr/UI/avatarshopicon/1412.webp',
    rank: 's',
    leftIcon: {
      src: 'https://api.hakush.in/hsr/UI/element/wind.webp',
      alt: '',
    },
    rightIcon: {
      src: 'https://api.hakush.in/hsr/UI/pathicon/shaman.webp',
      alt: '',
    },
    href: '',
  },
} satisfies StoryObj<typeof Card>;

export const HSR_Char_4_Star = {
  args: {
    name: 'Mar. 7th',
    imageUrl: 'https://api.hakush.in/hsr/UI/avatarshopicon/1001.webp',
    rank: 'a',
    leftIcon: {
      src: 'https://api.hakush.in/hsr/UI/element/ice.webp',
      alt: '',
    },
    rightIcon: {
      src: 'https://api.hakush.in/hsr/UI/pathicon/knight.webp',
      alt: '',
    },
    href: '',
  },
} satisfies StoryObj<typeof Card>;

export const ZZZ_Char_5_Star = {
  args: {
    name: '미야비',
    imageUrl: 'https://api.hakush.in/zzz/UI/IconRoleCrop13.webp',
    rank: 's',
    leftIcon: {
      src: 'https://api.hakush.in/zzz/UI/IconFrost.webp',
      alt: '',
    },
    rightIcon: {
      src: 'https://api.hakush.in/zzz/UI/IconAnomaly.webp',
      alt: '',
    },
    href: '',
  },
} satisfies StoryObj<typeof Card>;

export const ZZZ_Char_4_Star = {
  args: {
    name: '엔비',
    imageUrl: 'https://api.hakush.in/zzz/UI/IconRoleCrop01.webp',
    rank: 'a',
    leftIcon: {
      src: 'https://api.hakush.in/zzz/UI/IconElectric.webp',
      alt: '',
    },
    rightIcon: {
      src: 'https://api.hakush.in/zzz/UI/IconStun.webp',
      alt: '',
    },
    href: '',
  },
} satisfies StoryObj<typeof Card>;
