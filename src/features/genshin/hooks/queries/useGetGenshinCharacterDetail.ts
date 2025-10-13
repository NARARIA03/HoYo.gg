import { queryEndpoint } from '@/constants/endpoints';
import axios from 'axios';
import type { GICharacterDetailDTO } from '../../types/characterDetailDto';
import { useQuery, type QueryClient } from '@tanstack/react-query';

const getGenshinCharacterDetail = async (characterId: string) => {
  const endpoint = queryEndpoint.genshin.characters.detail(characterId);
  const res = await axios.get<GICharacterDetailDTO>(endpoint);
  return res.data;
};

export const GENSHIN_CHARACTER_QUERY_KEY = 'GENSHIN_CHARACTER_QUERY_KEY';

export const useGetGenshinCharacterDetail = (characterId: string) => {
  return useQuery({
    queryFn: () => getGenshinCharacterDetail(characterId),
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
