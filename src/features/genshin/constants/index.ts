import { IMAGES } from '@/constants/images';
import { getObjectEntries } from '@/utils';

export const elements = getObjectEntries(IMAGES.genshin.element);
export const weapons = getObjectEntries(IMAGES.genshin.weapon);
export const ranks = ['QUALITY_ORANGE_SP', 'QUALITY_ORANGE', 'QUALITY_PURPLE'] as const;
export const rankColorMap = {
  QUALITY_ORANGE_SP: '#cc6a64',
  QUALITY_ORANGE: '#ffb139',
  QUALITY_PURPLE: '#d28fd6',
} satisfies Record<(typeof ranks)[number], string>;
