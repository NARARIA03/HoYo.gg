import type { TGame } from '@/types/common';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { GAME_ICON } from '../constants';

type Props = {
  game: TGame;
};

export default function GameListNavBar({ game }: Props) {
  const mainLogo = GAME_ICON[game];
  const otherLogos = Object.entries(GAME_ICON).filter(([key]) => key !== game);

  return (
    <List>
      <ListItem>
        <StyledLink href={game}>
          <ActiveImage src={mainLogo} width={55} height={55} alt={game} />
        </StyledLink>
      </ListItem>
      {otherLogos.map(([href, src]) => (
        <ListItem key={src}>
          <StyledLink href={href}>
            <DisabledImage src={src} width={40} height={40} alt={href} />
          </StyledLink>
        </ListItem>
      ))}
    </List>
  );
}

const List = styled.ul`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
`;

const ListItem = styled.li`
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ActiveImage = styled(Image)`
  object-fit: cover;
  pointer-events: none;
  user-select: none;
  border-radius: 10px;
`;

const DisabledImage = styled(ActiveImage)`
  filter: grayscale(0.6);
  opacity: 0.6;
`;
