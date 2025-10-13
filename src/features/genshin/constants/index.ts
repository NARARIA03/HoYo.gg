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

export const elementTextMap = {
  Cryo: '얼음',
  Hydro: '물',
  Pyro: '불',
  Electro: '번개',
  Anemo: '바람',
  Geo: '바위',
  Dendro: '풀',
} as const;

export const regionTextMap = {
  ASSOC_TYPE_MAINACTOR: '-',
  ASSOC_TYPE_FATUI: '우인단',
  ASSOC_TYPE_OMNI_SCOURGE: '우주적 재앙',
  ASSOC_TYPE_MONDSTADT: '몬드',
  ASSOC_TYPE_LIYUE: '리월',
  ASSOC_TYPE_INAZUMA: '이나즈마',
  ASSOC_TYPE_SUMERU: '수메르',
  ASSOC_TYPE_FONTAINE: '폰타인',
  ASSOC_TYPE_NATLAN: '나타',
  ASSOC_TYPE_NODKRAI: '노드크라이',
} as const;

export const weaponTextMap = {
  WEAPON_BOW: '활',
  WEAPON_SWORD_ONE_HAND: '한손검',
  WEAPON_CLAYMORE: '양손검',
  WEAPON_POLE: '장병기',
  WEAPON_CATALYST: '법구',
} as const;
