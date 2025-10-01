const genshin = {
  character: {
    list: 'https://genshin-db-api.vercel.app/api/v5/characters?query=names&matchCategories=true&verboseCategories=true&resultLanguage=korean',
    detail: (name: string) =>
      `https://genshin-db-api.vercel.app/api/v5/characters?query=${encodeURIComponent(name)}&queryLanguages=korean&resultLanguage=korean`,
  },
} as const;

const hsr = {} as const;

const zzz = {} as const;

export const apiRouteEndpoint = {
  genshin,
  hsr,
  zzz,
} as const;
