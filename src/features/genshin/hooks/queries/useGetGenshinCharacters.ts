import { type QueryClient, useQuery } from '@tanstack/react-query';
import { getGenshinCharacters } from '../../apis/getGenshinCharacters';

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
