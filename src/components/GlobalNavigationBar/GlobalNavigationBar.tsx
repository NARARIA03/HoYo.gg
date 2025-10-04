import { getPrimaryColor, MAX_WIDTH } from '@/styles/theme';
import type { TGame } from '@/types/common';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  /** 어떤 게임용 GNB를 렌더링할지 */
  game: TGame;
  /** next/font/local 주입용 className */
  className?: string;
};

const NAV_ITEM = {
  genshin: [
    {
      icon: '/images/genshin/gnb/home.webp',
      link: '/genshin',
      text: '홈',
    },
    {
      icon: '/images/genshin/gnb/character.webp',
      link: '/genshin/characters',
      text: '캐릭터',
    },
    {
      icon: '/images/genshin/gnb/weapon.webp',
      link: '/genshin/weapons',
      text: '무기',
    },
    {
      icon: '/images/genshin/gnb/artifact.webp',
      link: '/genshin/artifacts',
      text: '성유물',
    },
  ],
  hsr: [],
  zzz: [],
} as const;

export const GlobalNavigationBar = ({ game, className }: Props) => {
  return (
    <StyledNav className={className}>
      <NavContainer>
        <List>
          {NAV_ITEM[game].map(({ icon, link, text }) => (
            <li key={link}>
              <StyledLink href={link} $game={game}>
                <Image src={icon} alt={text} width={30} height={30} css={{ objectFit: 'cover' }} />
                {text}
              </StyledLink>
            </li>
          ))}
        </List>
      </NavContainer>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(30, 30, 47, 0.6);
  backdrop-filter: blur(4px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 10px;
`;

const NavContainer = styled.div`
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
`;

const List = styled.ul`
  display: flex;
  gap: 4px;
`;

const StyledLink = styled(Link)<{ $game: TGame }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #eee;
  transition: background-color 0.2s ease;
  transition: color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: ${({ $game }) => getPrimaryColor($game)};
  }
`;
