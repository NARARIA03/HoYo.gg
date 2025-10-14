import { getGenshinCharacters } from '@/features/genshin/apis/getGenshinCharacters';
import type { GICharactersDTO } from '@/features/genshin/types/chatactersDto';
import { API_CACHE_KEY, getApiCache, setApiCache } from '@/modules/cache';
import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method Not Allowed' });

  const key = API_CACHE_KEY.genshin.characters.list;
  const cachedData = getApiCache<GICharactersDTO>(key);

  if (cachedData) {
    console.log(`[Cache HIT] ${key}`);
    return res.status(200).json(cachedData);
  }

  try {
    console.log(`[Cache MISS] ${key}`);
    const data = await getGenshinCharacters();
    setApiCache(key, data);
    return res.status(200).json(data);
  } catch (e) {
    console.error(e);
    if (isAxiosError(e)) {
      return res.status(e.response?.status ?? 500).json({ message: 'GET /api/genshin/characters 에서 에러 발생' });
    }
    return res.status(500).json({ message: 'Next 서버에서 에러 발생 (GET /api/genshin/characters)' });
  }
}
