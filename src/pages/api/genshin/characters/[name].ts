import { getGenshinCharacterDetail } from '@/features/genshin';
import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method Not Allowed' });
  const name = req.query.name;
  if (typeof name !== 'string') return res.status(400).json({ message: 'Bad Request' });

  try {
    const data = await getGenshinCharacterDetail.server(name);
    return res.status(200).json(data);
  } catch (e) {
    if (isAxiosError(e))
      return res
        .status(e.response?.status ?? 500)
        .json({ message: 'GET /api/genshin/characters/[name] 에서 에러 발생' });
    return res.status(500).json({ message: 'Next 서버에서 에러 발생 (GET /api/genshin/characters/[name])' });
  }
};

export default handler;
