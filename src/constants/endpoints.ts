const genshin = {
  characters: {
    server:
      'https://genshin-db-api.vercel.app/api/v5/characters?query=names&matchCategories=true&verboseCategories=true&resultLanguage=korean',
    client: `${process.env.NEXT_PUBLIC_BASE_URL}/api/genshin/characters`,
  },
  characterDetail: {
    server: (name: string) =>
      `https://genshin-db-api.vercel.app/api/v5/characters?query=${name}&queryLanguages=korean&resultLanguage=korean`,
    client: (name: string) => `${process.env.NEXT_PUBLIC_BASE_URL}/api/genshin/characters/${name}`,
  },
} as const;

const hsr = {} as const;

const zzz = {} as const;

const endpoints = {
  genshin,
  hsr,
  zzz,
} as const;

export default endpoints;
