import axios from 'axios';
import { ENDPOINTS } from '@/constants/endpoints';
import { getEndpoint } from '@/utils';
import type { GICharactersDTO } from '../types/chatactersDto';

export const getGenshinCharacters = async () => {
  const endpoint = getEndpoint(ENDPOINTS.genshin.characters.list);

  const { data } = await axios.get<GICharactersDTO>(endpoint);
  return data;
};
