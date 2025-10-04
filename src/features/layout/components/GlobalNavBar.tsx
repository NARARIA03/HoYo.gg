import { getPrimaryColor, mediaQuery } from '@/styles/theme';
import type { TGame } from '@/types/common';
import styled from '@emotion/styled';
import Link from 'next/link';
import { NAV_ITEM } from '../constants';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';

type Props = {
  game: TGame;
};

export default function GlobalNavBar({ game }: Props) {
  const router = useRouter();
  const asPath = router.asPath;

  return (
    <StyledNav>
      <List>
        {NAV_ITEM[game].map(({ icon, link, text }) => (
          <li key={link}>
            <StyledLink href={link} $game={game} $isSelected={asPath === link}>
              <Image src={icon} alt={text} width={30} height={30} />
              <p>{text}</p>
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
`;

const List = styled.ul`
  display: flex;
`;

const StyledLink = styled(Link)<{ $game: TGame; $isSelected: boolean }>`
  position: relative;
  width: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #eee;
  transition: background-color 0.2s ease;
  border-bottom: 2px solid transparent;
  transition: color 0.2s ease;

  ${mediaQuery.max768} {
    width: 40px;
  }

  & > p {
    padding-inline: 4px;

    ${mediaQuery.max768} {
      display: none;
    }
  }

  ${({ $isSelected, $game }) =>
    $isSelected &&
    css`
      color: ${getPrimaryColor($game)};
    `}

  &:hover {
    color: ${({ $game }) => getPrimaryColor($game)};
    background-color: rgba(255, 255, 255, 0.05);
  }

  &::after {
    content: '';
    position: absolute;
    width: 80px;
    transform: scaleX(0);
    height: 2px;
    bottom: -2px;
    background-color: ${({ $game }) => getPrimaryColor($game)};
    transform-origin: bottom center;
    transition: transform 0.2s ease-out;

    ${mediaQuery.max768} {
      width: 40px;
    }

    ${({ $isSelected }) => $isSelected && `transform: scaleX(1);`}
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom center;
  }
`;
