import type { TGame } from '@/types/common';

export type LayoutProps = {
  /** 어떤 게임용 헤더를 렌더링할지 */
  game: TGame;
  /** next/font/local 주입용 className */
  className?: string;
};
