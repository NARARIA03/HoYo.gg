import { getGenshinCharacterDetail } from '@/features/genshin/apis/getGenshinCharacterDetail';
import type { GICharacterDetailDTO } from '@/features/genshin/types/characterDetailDto';
import { API_CACHE_KEY, getApiCache, setApiCache } from '@/modules/cache';
import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method Not Allowed' });
  const characterId = req.query.characterId;
  if (typeof characterId !== 'string') return res.status(400).json({ message: 'Bad Request' });

  const key = API_CACHE_KEY.genshin.characters.detail(characterId);
  const cachedData = getApiCache<GICharacterDetailDTO>(key);

  if (cachedData) {
    console.log(`[Cache HIT] ${key}`);
    return res.setHeader('X-Node-Cache', 'HIT').status(200).json(cachedData);
  }

  try {
    console.log(`[Cache MISS] ${key}`);
    const data = await getGenshinCharacterDetail(characterId);
    setApiCache(key, data);
    return res.status(200).json(data);
  } catch (e) {
    console.error(e);
    if (isAxiosError(e)) {
      return res
        .status(e.response?.status ?? 500)
        .json({ message: 'GET /api/genshin/characters/[name] 에서 에러 발생' });
    }
    return res.status(500).json({ message: 'Next 서버에서 에러 발생 (GET /api/genshin/characters/[name])' });
  }
}
