import axios from 'axios';
import type { FullGenshinCharacterDTO } from '../types/genshinDbDto';
import { apiRouteEndpoint } from '@/constants/endpoints';

export const getGenshinCharacterDetail = async (name: string) => {
  const endpoint = apiRouteEndpoint.genshin.character.detail(name);
  const { data } = await axios.get<FullGenshinCharacterDTO[]>(endpoint);
  return data;
};
