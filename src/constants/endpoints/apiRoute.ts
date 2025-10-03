const genshin = {
  characters: {
    list: 'https://api.hakush.in/gi/data/character.json',
    deatil: (characterId: string) => `https://api.hakush.in/gi/data/ko/character/${characterId}.json`,
  },
} as const;

const hsr = {} as const;

const zzz = {} as const;

export const apiRouteEndpoint = {
  genshin,
  hsr,
  zzz,
} as const;
