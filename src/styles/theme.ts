import type { TGame } from '@/types/common';

export const getPrimaryColor = (game: TGame) => {
  const color: Record<TGame, string> = {
    genshin: '#4a90e2',
    hsr: '#d89cb5',
    zzz: '#f59e42',
  };

  return color[game];
};

export const MAX_WIDTH = '1024px';

export const mediaQuery = {
  /** 모바일 */
  max768: '@media (max-width: 768px)',
  /** PC 기준 좌우 여백이 0이 되는 지점 */
  max1190: `@media (max-width: ${MAX_WIDTH})`,
};
