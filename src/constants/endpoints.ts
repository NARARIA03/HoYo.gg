type TApiEndpoint = Record<string, { server: string; client: string }>;

const genshin: TApiEndpoint = {
  characters: {
    server:
      'https://genshin-db-api.vercel.app/api/v5/characters?query=names&matchCategories=true&verboseCategories=true&resultLanguage=korean',
    client: `${process.env.NEXT_PUBLIC_BASE_URL}/api/genshin/characters`,
  },
} as const;

const hsr: TApiEndpoint = {} as const;

const zzz: TApiEndpoint = {} as const;

const endpoints = {
  genshin,
  hsr,
  zzz,
} as const;

export default endpoints;
