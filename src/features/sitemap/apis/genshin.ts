import { BASE_URL } from '@/constants/env';
import { getGenshinCharacters } from '@/features/genshin/apis/getGenshinCharacters';
import { getGenshinDetailHref } from '@/features/genshin/utils/getGenshinHref';

export const getGenshinCharacterDetailUrls = async () => {
  const data = await getGenshinCharacters();
  return Object.entries(data).map(([id, data]) => `${BASE_URL}${getGenshinDetailHref(data.KR, id)}`);
};
