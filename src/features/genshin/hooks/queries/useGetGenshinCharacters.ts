import axios from 'axios';
import { type QueryClient, useQuery } from '@tanstack/react-query';
import endpoints from '@/constants/endpoints';
import type { FullGenshinCharacterDTO, MinimizedGenshinCharacterDTO } from '../../types/genshinDbDto';

export const getGenshinCharacters = {
  server: async () => {
    const res = await axios.get<FullGenshinCharacterDTO[]>(endpoints.genshin.characters.server);
    return res.data
      .map(dataFilter)
      .filter((data) => data.id !== 10000005 && data.id !== 10000007 && data.id !== 10000062);
  },
  client: async () => {
    const res = await axios.get<MinimizedGenshinCharacterDTO[]>(endpoints.genshin.characters.client);
    return res.data;
  },
};

const dataFilter = (data: FullGenshinCharacterDTO): MinimizedGenshinCharacterDTO => {
  const result = {
    id: data.id,
    name: data.name,
    title: data.title,
    description: data.description,
    rarity: data.rarity,
    elementText: data.elementText,
    region: data.region ?? '',
    image: `https://enka.network/ui/${data.images['filename_icon']}.png`,
  };

  return result;
};

export const GENSHIN_CHARACTERS_QUERY_KEY = 'GENSHIN_CHARACTERS_QUERY_KEY';

export const useGetGenshinCharacters = () => {
  return useQuery({
    queryFn: getGenshinCharacters.client,
    queryKey: [GENSHIN_CHARACTERS_QUERY_KEY],
  });
};

export const prefetchGenshinCharacters = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryFn: getGenshinCharacters.server,
    queryKey: [GENSHIN_CHARACTERS_QUERY_KEY],
  });
};
