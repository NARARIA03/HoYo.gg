export const API_CACHE_KEY = {
  genshin: {
    characters: {
      list: 'GENSHIN_CHARACTERS',
      detail: (id: string) => `GENSHIN_CHARACTERS_${id}`,
    },
  },
} as const;
