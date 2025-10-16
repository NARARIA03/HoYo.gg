import type { NextApiRequest, NextApiResponse } from 'next';
import { isAxiosError } from 'axios';
import { getGenshinCharacterDetail } from '@/features/genshin/apis/getGenshinCharacterDetail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method Not Allowed' });
  const characterId = req.query.characterId;
  if (typeof characterId !== 'string') return res.status(400).json({ message: 'Bad Request' });

  try {
    const data = await getGenshinCharacterDetail(characterId);
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
