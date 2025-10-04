import { getPrimaryColor } from '@/styles/theme';
import type { TGame } from '@/types/common';
import styled from '@emotion/styled';
import Link from 'next/link';
import { NAV_ITEM } from '../constants';
import Image from 'next/image';

type Props = {
  game: TGame;
};

export default function GlobalNavBar({ game }: Props) {
  return (
    <StyledNav>
      <List>
        {NAV_ITEM[game].map(({ icon, link, text }) => (
          <li key={link}>
            <StyledLink href={link} $game={game}>
              <Image src={icon} alt={text} width={30} height={30} />
              {text}
            </StyledLink>
          </li>
        ))}
      </List>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(30, 30, 47, 0.6);
  backdrop-filter: blur(2px);
`;

const List = styled.ul`
  display: flex;
`;

const StyledLink = styled(Link)<{ $game: TGame }>`
  width: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 0;
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
