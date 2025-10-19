import axios from 'axios';
import { ENDPOINTS } from '@/constants/endpoints';
import { BASE_URL } from '@/constants/env';
import { getEndpoint } from '@/utils';
import type { GICharactersDTO } from '@/features/genshin/types/chatactersDto';
import { getGenshinDetailHref } from '@/features/genshin/utils/getGenshinHref';

export const getGenshinCharacterDetailUrls = async () => {
  const endpoint = getEndpoint(ENDPOINTS.genshin.characters.list);

  const { data } = await axios.get<GICharactersDTO>(endpoint);
  return Object.entries(data).map(([id, data]) => `${BASE_URL}${getGenshinDetailHref(data.KR, id)}`);
};
