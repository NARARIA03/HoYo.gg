import axios from 'axios';
import { ENDPOINTS } from '@/constants/endpoints';
import { getEndpoint } from '@/utils';
import type { GICharacterDetailDTO } from '../types/characterDetailDto';

export const getGenshinCharacterDetail = async (characterId: string) => {
  const endpoint = getEndpoint(ENDPOINTS.genshin.characters.detail);

  const { data } = await axios.get<GICharacterDetailDTO[]>(endpoint(characterId));
  return data;
};
