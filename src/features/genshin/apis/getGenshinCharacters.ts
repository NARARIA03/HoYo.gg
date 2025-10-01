import axios from 'axios';
import type { FullGenshinCharacterDTO, MinimizedGenshinCharacterDTO } from '../types/genshinDbDto';
import { apiRouteEndpoint } from '@/constants/endpoints';

export const getGenshinCharacters = async () => {
  const endpoint = apiRouteEndpoint.genshin.character.list;
  const { data } = await axios.get<FullGenshinCharacterDTO[]>(endpoint);
  return preprocessGenshinCharacters(data);
};

const aetherId = 10000005;
const lumineId = 10000007;
const aloyId = 10000062;
const skirkId = 10000114;

const removedCharacterIds = [aetherId, lumineId, aloyId];
const overrideCharacterMap: Record<number, Partial<MinimizedGenshinCharacterDTO>> = {
  [skirkId]: {
    region: '스네즈나야',
  },
};

const preprocessGenshinCharacters = (characters: FullGenshinCharacterDTO[]): MinimizedGenshinCharacterDTO[] => {
  return characters
    .filter(({ id }) => !removedCharacterIds.includes(id))
    .map(({ id, name, title, description, rarity, elementText, region, images }) => ({
      id,
      name,
      title,
      description,
      rarity,
      elementText,
      region: region ?? '없음',
      image: `https://enka.network/ui/${images['filename_icon']}.png`,
      ...(overrideCharacterMap[id] && { ...overrideCharacterMap[id] }),
    }));
};
