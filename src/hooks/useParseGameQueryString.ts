import { useRouter } from 'next/router';

type Game = (typeof allowedGames)[number];

const allowedGames = ['genshin', 'hsr', 'zzz'] as const;

const parseQueryString = (pathname: string): Game | null => {
  const slug = pathname.split('/')[1];
  return allowedGames.includes(slug as Game) ? (slug as Game) : null;
};

export const useParseGameQueryString = () => {
  const router = useRouter();
  return parseQueryString(router.pathname);
};
