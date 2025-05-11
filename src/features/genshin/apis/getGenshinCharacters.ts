import axios from 'axios';
import type { FullGenshinCharacterDTO, MinimizedGenshinCharacterDTO } from '../types/genshinDbDto';
import endpoints from '@/constants/endpoints';

export const GENSHIN_CHARACTERS_QUERY_KEY = 'genshinCharacters';

export const getGenshinCharacters = {
  server: async () => {
    const res = await axios.get<FullGenshinCharacterDTO[]>(endpoints.genshin.characters.server);
    return res.data.map(_filterFn);
  },
  client: async () => {
    const res = await axios.get<FullGenshinCharacterDTO[]>(endpoints.genshin.characters.client);
    return res.data.map(_filterFn);
  },
};

const _filterFn = (data: FullGenshinCharacterDTO): MinimizedGenshinCharacterDTO => {
  const { id, name, title, rarity, elementType, elementText, affiliation, region, constellation, images } = data;
  return {
    id,
    name,
    title,
    rarity,
    elementType,
    elementText,
    affiliation,
    region,
    constellation,
    image: `https://enka.network/ui/${images['filename_icon']}.png`,
  };
};
