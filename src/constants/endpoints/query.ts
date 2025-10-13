import { BASE_URL } from '../env';

const genshin = {
  characters: {
    list: `${BASE_URL}/api/genshin/characters`,
    detail: (characterId: string) => `${BASE_URL}/api/genshin/characters/${encodeURIComponent(characterId)}`,
  },
} as const;

const hsr = {} as const;

const zzz = {} as const;

export const queryEndpoint = {
  genshin,
  hsr,
  zzz,
} as const;
