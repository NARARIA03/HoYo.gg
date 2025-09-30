import { getGenshinCharacters } from '@/features/genshin/apis/getGenshinCharacters';
import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method Not Allowed' });

  try {
    const data = await getGenshinCharacters();
    return res.status(200).json(data);
  } catch (e) {
    if (isAxiosError(e))
      return res
        .status(e.response?.status ?? 500)
        .json({ message: 'GET /api/genshin/characters 에서 에러 발생', error: e });
    return res.status(500).json({ message: 'Next 서버에서 에러 발생 (GET /api/genshin/characters)', error: e });
  }
}
