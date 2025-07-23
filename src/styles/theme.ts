import type { TGame } from '@/types/common';

export const getPrimaryColor = (game: TGame) => {
  const color: Record<TGame, string> = {
    genshin: '#4a90e2',
    hsr: '#d89cb5',
    zzz: '#f59e42',
  };

  return color[game];
};
