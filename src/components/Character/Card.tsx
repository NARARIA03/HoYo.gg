import type { TRank } from '@/types/common';
import type { ReactNode } from 'react';

type Props = {
  name: string;
  imageUrl: string;
  rank: TRank;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  href: string;
};

export default function Card({}: Props) {
  return <></>;
}
