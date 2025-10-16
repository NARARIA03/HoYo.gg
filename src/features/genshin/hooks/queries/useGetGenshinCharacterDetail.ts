import { skipToken, useQuery, type QueryClient } from '@tanstack/react-query';
import { getGenshinCharacterDetail } from '../../apis/getGenshinCharacterDetail';

export const GENSHIN_CHARACTER_QUERY_KEY = 'GENSHIN_CHARACTER_QUERY_KEY';

export const useGetGenshinCharacterDetail = (characterId?: string) => {
  return useQuery({
    queryFn: !!characterId ? () => getGenshinCharacterDetail(characterId) : skipToken,
    queryKey: [GENSHIN_CHARACTER_QUERY_KEY, characterId],
    enabled: !!characterId,
  });
};

export const fetchGenshinCharacterDetail = async (queryClient: QueryClient, characterId: string) => {
  try {
    const data = await queryClient.fetchQuery({
      queryFn: () => getGenshinCharacterDetail(characterId),
      queryKey: [GENSHIN_CHARACTER_QUERY_KEY, characterId],
    });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
