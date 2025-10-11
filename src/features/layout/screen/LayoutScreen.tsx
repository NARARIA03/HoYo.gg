import { useParseGameQueryString } from '@/hooks/useParseGameQueryString';
import type { ReactNode } from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import FooterContainer from '../containers/FooterContainer';

type Props = {
  className?: string;
  children: ReactNode;
};

export default function LayoutScreen({ className, children }: Props) {
  const game = useParseGameQueryString();

  return (
    <>
      {game && <HeaderContainer game={game} className={className} />}
      {children}
      {game && <FooterContainer game={game} className={className} />}
    </>
  );
}
