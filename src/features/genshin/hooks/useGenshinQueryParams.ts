import { useRouter } from 'next/router';
import type { GIElementDTO, GIRankDTO, GIWeaponDTO } from '../types/baseDto';
import { parseQuery } from '@/utils';

type Params = {
  element?: GIElementDTO;
  weapon?: GIWeaponDTO;
  rank?: GIRankDTO;
  keyword?: string;
};

export const useGenshinQueryParams = () => {
  const router = useRouter();

  const queryParams = {
    element: parseQuery<GIElementDTO>(router.query.element),
    weapon: parseQuery<GIWeaponDTO>(router.query.weapon),
    rank: parseQuery<GIRankDTO>(router.query.rank),
    keyword: parseQuery<string>(router.query.keyword),
  } satisfies Params;

  const setQueryParams = (newQueryParams: Partial<Params>) => {
    router.push({ pathname: router.pathname, query: { ...router.query, ...newQueryParams } }, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  return { queryParams, setQueryParams };
};
