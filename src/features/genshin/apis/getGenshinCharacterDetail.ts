import axios from 'axios';
import { apiRouteEndpoint } from '@/constants/endpoints';
import type { GICharacterDetailDTO } from '../types/characterDetailDto';

export const getGenshinCharacterDetail = async (characterId: string) => {
  const endpoint = apiRouteEndpoint.genshin.characters.detail(characterId);
  const { data } = await axios.get<GICharacterDetailDTO[]>(endpoint);
  return data;
};
