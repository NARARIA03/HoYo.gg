import { getGenshinCharacterDetailUrls } from '../apis/genshin';

export const SITEMAP_CONFIG = {
  genshin: {
    characters: getGenshinCharacterDetailUrls,
  },
} as const;
