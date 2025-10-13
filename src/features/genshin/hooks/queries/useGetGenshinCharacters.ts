import axios from 'axios';
import { type QueryClient, useQuery } from '@tanstack/react-query';
import { queryEndpoint } from '@/constants/endpoints';
import type { GICharactersDTO } from '../../types/chatactersDto';

const getGenshinCharacters = async () => {
  const endpoint = queryEndpoint.genshin.characters.list;
  const res = await axios.get<GICharactersDTO>(endpoint);
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
