import { IMAGES } from '@/constants/images';
import { Z_INDEX } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef } from 'react';

type TGame = 'genshin' | 'hsr' | 'zzz';

type Props = {
  /** 어떤 게임용 헤더를 렌더링할지 */
  game: TGame;
};

/** Genshin, Honkai:Starrail, Zenless Zone Zero 페이지 모두에서 사용될 공통 헤더입니다 */
export const Header = forwardRef<HTMLElement, Props>(({ game }, ref) => {
  const mainLogoSrc = IMAGES.logo[game];
  const otherLogoSrcs = Object.entries(IMAGES.logo).filter(([key]) => key !== game);
  const backgroundSrc = IMAGES.header[game];

  return (
    <HeaderWrapper ref={ref}>
      <LogoWrapper>
        <ListItem>
          <FitLink href={game}>
            <LogoImage src={mainLogoSrc} width={60} height={60} alt={`${game} logo`} />
          </FitLink>
        </ListItem>
        {otherLogoSrcs.map(([href, src]) => (
          <ListItem key={src}>
            <FitLink href={href}>
              <LogoImage src={src} width={40} height={40} alt={`${href} logo`} css={{ opacity: 0.6 }} />
            </FitLink>
          </ListItem>
        ))}
        <BackgroundImageWrapper $game={game}>
          <Image src={backgroundSrc} alt="backgroundSrc" fill />
        </BackgroundImageWrapper>
      </LogoWrapper>
    </HeaderWrapper>
  );
});

Header.displayName = 'Header';

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 10px;
  overflow: hidden;
  background-color: rgba(30, 30, 47, 0.8);
  backdrop-filter: blur(8px);
  z-index: ${Z_INDEX.header};
`;

const LogoWrapper = styled.ul`
  position: relative;
  width: 160px;
  height: 60px;
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;

const ListItem = styled.li`
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const FitLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled(Image)`
  object-fit: cover;
  pointer-events: none;
  user-select: none;
  border-radius: 10px;
`;

const BackgroundImageWrapper = styled.div<{ $game: TGame }>`
  position: relative;
  width: 300px;
  height: 150px;
  flex-shrink: 0;
  z-index: -1;
  pointer-events: none;
  user-select: none;

  & > img {
    opacity: 0.35;
    object-fit: cover;
  }

  ${({ $game }) => {
    if ($game === 'genshin') {
      return css`
        top: 90px;
        left: 20px;
        scale: 1.3;
      `;
    }
    if ($game === 'zzz') {
      return css`
        top: 50px;
        left: -20px;
      `;
    }
    if ($game === 'hsr') {
      return css`
        top: 80px;
        left: -75px;
        scale: 1.8;
      `;
    }
  }}
`;
