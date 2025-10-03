import axios from 'axios';
import { apiRouteEndpoint } from '@/constants/endpoints';
import type { GICharactersDTO } from '../types/chatactersDto';

export const getGenshinCharacters = async () => {
  const endpoint = apiRouteEndpoint.genshin.characters.list;
  const { data } = await axios.get<GICharactersDTO>(endpoint);
  return data;
};
