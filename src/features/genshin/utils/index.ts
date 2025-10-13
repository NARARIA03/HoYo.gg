import type { TRank } from '@/types/common';
import type { GIRarityDTO } from '../types/baseDto';

export const getGenshinRank = (rank: GIRarityDTO) => {
  const converter: Record<GIRarityDTO, TRank> = {
    QUALITY_ORANGE_SP: 'sp',
    QUALITY_ORANGE: 's',
    QUALITY_PURPLE: 'a',
  };

  return converter[rank];
};

export const getGenshinAvatarUrl = (icon: string) => {
  return `https://api.hakush.in/gi/UI/${icon}.webp`;
};
