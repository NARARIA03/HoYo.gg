import { BASE_URL } from '../env';

const genshin = {
  character: {
    list: `${BASE_URL}/api/genshin/characters`,
    detail: (name: string) => `${BASE_URL}/api/genshin/characters/${name}`,
  },
} as const;

const hsr = {} as const;

const zzz = {} as const;

export const queryEndpoint = {
  genshin,
  hsr,
  zzz,
} as const;
