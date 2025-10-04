import { getPrimaryColor, mediaQuery } from '@/styles/theme';
import type { TGame } from '@/types/common';
import styled from '@emotion/styled';
import Link from 'next/link';
import { NAV_ITEM } from '../constants';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
            <Link href={link}>
              <NavItemWrapper $game={game} $isSelected={asPath === link}>
                <Image src={icon} alt={text} width={30} height={30} />
                <Text $game={game} $isSelected={asPath === link}>
                  {text}
                </Text>
              </NavItemWrapper>
            </Link>
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

const Text = styled.p<{ $game: TGame; $isSelected: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $isSelected, $game }) => ($isSelected ? getPrimaryColor($game) : '#eee')};
  transition: color 0.2s ease;
  padding-inline: 4px;

  ${mediaQuery.max768} {
    display: none;
  }

  &:hover {
    color: ${({ $game }) => getPrimaryColor($game)};
  }
`;

const NavItemWrapper = styled.div<{ $game: TGame; $isSelected: boolean }>`
  position: relative;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 0;
  transition: background-color 0.2s ease;

  ${mediaQuery.max768} {
    width: 40px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0px;
    background-color: ${({ $game }) => getPrimaryColor($game)};
    transform: ${({ $isSelected }) => ($isSelected ? 'scaleX(1)' : 'scaleX(0)')};
    transform-origin: bottom center;
    transition: transform 0.2s ease-out;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;
