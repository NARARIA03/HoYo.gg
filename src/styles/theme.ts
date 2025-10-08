import type { TGame, TRank } from '@/types/common';
import { MAX_WIDTH } from './layout';

export const getPrimaryColor = (game: TGame) => {
  const color: Record<TGame, string> = {
    genshin: '#4a90e2',
    hsr: '#d89cb5',
    zzz: '#f59e42',
  };

  return color[game];
};

export const getRankBgColor = (rank: TRank) => {
  const color: Record<TRank, string> = {
    sp: 'linear-gradient(180deg, #694148, #b35c50)',
    s: 'linear-gradient(180deg, #945c2c, #b27330)',
    a: 'linear-gradient(180deg, #5e5789, #9c75b7)',
    b: 'linear-gradient(180deg, #567496, #5392b8)',
    c: 'linear-gradient(180deg, #4b6c67, #519072)',
    d: 'linear-gradient(180deg, #6a6d74, #868586)',
  };

  return color[rank];
};

export const mediaQuery = {
  /** 모바일 */
  max768: '@media (max-width: 768px)',
  /** PC 기준 좌우 여백이 0이 되는 지점 */
  max1190: `@media (max-width: ${MAX_WIDTH})`,
};
