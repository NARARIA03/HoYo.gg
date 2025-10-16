import { BASE_URL } from '../env';

export const genshinEndpoints = {
  characters: {
    list: {
      client: `${BASE_URL}/api/genshin/characters`,
      server: 'https://api.hakush.in/gi/data/character.json',
    },
    detail: {
      client: (characterId: string) => `${BASE_URL}/api/genshin/characters/${encodeURIComponent(characterId)}`,
      server: (characterId: string) => `https://api.hakush.in/gi/data/ko/character/${characterId}.json`,
    },
  },
} as const;
