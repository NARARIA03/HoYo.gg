import axios from 'axios';
import { apiRouteEndpoint } from '@/constants/endpoints';
import type { GICharacterDetailDTO } from '../types/characterDetailDto';

export const getGenshinCharacterDetail = async (name: string) => {
  const endpoint = apiRouteEndpoint.genshin.characters.detail(name);
  const { data } = await axios.get<GICharacterDetailDTO[]>(endpoint);
  return data;
};
