import axios from 'axios';
import type { FullGenshinCharacterDTO, MinimizedGenshinCharacterDTO } from '../types/genshinDbDto';
import endpoints from '@/constants/endpoints';

export const GENSHIN_CHARACTERS_QUERY_KEY = 'genshinCharacters';

export const getGenshinCharacters = {
  server: async () => {
    const res = await axios.get<FullGenshinCharacterDTO[]>(endpoints.genshin.characters.server);
    return res.data
      .map(_filterFn)
      .filter((data) => data.id !== 10000005 && data.id !== 10000007 && data.id !== 10000062);
  },
  client: async () => {
    const res = await axios.get<MinimizedGenshinCharacterDTO[]>(endpoints.genshin.characters.client);
    return res.data;
  },
};

const _filterFn = (data: FullGenshinCharacterDTO): MinimizedGenshinCharacterDTO => {
  const { id, name, title, description, rarity, elementText, region, images } = data;
  return {
    id,
    name,
    title,
    description,
    rarity,
    elementText,
    region,
    image: `https://enka.network/ui/${images['filename_icon']}.png`,
  };
};
