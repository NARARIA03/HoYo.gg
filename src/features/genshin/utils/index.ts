import type { TRank } from '@/types/common';
import type { GIRankDTO } from '../types/baseDto';

export const getGenshinRank = (rank: GIRankDTO) => {
  const converter: Record<GIRankDTO, TRank> = {
    QUALITY_ORANGE_SP: 'sp',
    QUALITY_ORANGE: 's',
    QUALITY_PURPLE: 'a',
  };

  return converter[rank];
};

export const getGenshinAvatarUrl = (icon: string) => {
  return `https://api.hakush.in/gi/UI/${icon}.webp`;
};
