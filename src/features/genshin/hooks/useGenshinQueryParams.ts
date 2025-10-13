import { useRouter } from 'next/router';
import type { GIElementDTO, GIRarityDTO, GIWeaponDTO } from '../types/baseDto';
import { getObjectEntries, parseArrayQuery, parseQuery } from '@/utils';

type Params = {
  element: GIElementDTO[];
  weapon: GIWeaponDTO[];
  rank: GIRarityDTO[];
  keyword?: string;
};

export const useGenshinQueryParams = () => {
  const router = useRouter();

  const queryParams = {
    element: parseArrayQuery<GIElementDTO>(router.query.element) ?? [],
    weapon: parseArrayQuery<GIWeaponDTO>(router.query.weapon) ?? [],
    rank: parseArrayQuery<GIRarityDTO>(router.query.rank) ?? [],
    keyword: parseQuery<string>(router.query.keyword),
  } satisfies Params;

  const setQueryParams = (newQueryParams: Partial<Params>) => {
    const query = getObjectEntries(newQueryParams).reduce(
      (acc, [key, value]) => {
        if (Array.isArray(value) && value.length === 0) {
          delete acc[key];
          return acc;
        }
        if (!value) {
          delete acc[key];
          return acc;
        }
        return { ...acc, [key]: value };
      },
      { ...router.query }
    );

    router.replace({ pathname: router.pathname, query }, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  return { queryParams, setQueryParams };
};
