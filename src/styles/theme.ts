import type { TGame } from '@/types/common';

export const Z_INDEX = {
  header: 100,
};

export const getPrimaryColor = (game: TGame) => {
  switch (game) {
    case 'genshin':
      return '#4a90e2';
    case 'hsr':
      return '#d89cb5';
    case 'zzz':
      return '#f59e42';
    default:
      return '#eee';
  }
};
