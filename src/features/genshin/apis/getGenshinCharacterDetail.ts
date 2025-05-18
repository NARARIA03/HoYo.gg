import axios from 'axios';
import type { FullGenshinCharacterDTO } from '../types/genshinDbDto';
import endpoints from '@/constants/endpoints';

export const GENSHIN_CHARACTERS_DETAIL_QUERY_KEY = 'genshinCharacterDetail';

export const getGenshinCharacterDetail = {
  server: async (name: string) => {
    const res = await axios.get<FullGenshinCharacterDTO>(endpoints.genshin.characterDetail.server(name));
    return res.data;
  },
  client: async (name: string) => {
    const res = await axios.get<FullGenshinCharacterDTO>(endpoints.genshin.characterDetail.client(name));
    return res.data;
  },
};
