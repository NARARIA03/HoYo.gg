import axios from 'axios';
import { type QueryClient, useQuery } from '@tanstack/react-query';
import type { MinimizedGenshinCharacterDTO } from '../../types/genshinDbDto';
import { queryEndpoint } from '@/constants/endpoints';

const getGenshinCharacters = async () => {
  const endpoint = queryEndpoint.genshin.character.list;
  const res = await axios.get<MinimizedGenshinCharacterDTO[]>(endpoint);
  return res.data;
};

export const GENSHIN_CHARACTERS_QUERY_KEY = 'GENSHIN_CHARACTERS_QUERY_KEY';

export const useGetGenshinCharacters = () => {
  return useQuery({
    queryFn: () => getGenshinCharacters(),
    queryKey: [GENSHIN_CHARACTERS_QUERY_KEY],
  });
};

export const prefetchGenshinCharacters = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryFn: () => getGenshinCharacters(),
    queryKey: [GENSHIN_CHARACTERS_QUERY_KEY],
  });
};
