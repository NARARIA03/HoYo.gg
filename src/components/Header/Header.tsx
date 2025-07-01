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
  /** next/font/local 주입용 className */
  className?: string;
};

/** Genshin, Honkai:Starrail, Zenless Zone Zero 페이지 모두에서 사용될 공통 헤더입니다 */
export const Header = forwardRef<HTMLElement, Props>(({ game, className }, ref) => {
  const mainLogoSrc = IMAGES.logo[game];
  const otherLogoSrcs = Object.entries(IMAGES.logo).filter(([key]) => key !== game);
  const backgroundSrc = IMAGES.header[game];

  return (
    <HeaderWrapper ref={ref} className={className}>
      <LeftBox>
        <StyledNav>
          <Heading $game={game}>
            HoYo<span>.GG</span>
          </Heading>
          <StyledUl>
            <ListItem>
              <FitLink href={game}>
                <LogoImage src={mainLogoSrc} width={55} height={55} alt={`${game} logo`} />
              </FitLink>
            </ListItem>
            {otherLogoSrcs.map(([href, src]) => (
              <ListItem key={src}>
                <FitLink href={href}>
                  <LogoImage src={src} width={40} height={40} alt={`${href} logo`} css={disabledCss} />
                </FitLink>
              </ListItem>
            ))}
          </StyledUl>
        </StyledNav>
        <BackgroundImageWrapper $game={game}>
          <Image src={backgroundSrc} alt="" fill />
        </BackgroundImageWrapper>
      </LeftBox>
    </HeaderWrapper>
  );
});

Header.displayName = 'Header';

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 120px;
  display: flex;
  padding: 0 10px;
  overflow: hidden;
  background-color: rgba(30, 30, 47, 0.8);
  backdrop-filter: blur(8px);
  z-index: ${Z_INDEX.header};
`;

const LeftBox = styled.div`
  position: relative;
  width: 160px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Heading = styled.h1<{ $game: TGame }>`
  font-size: 38px;
  font-weight: 800;
  color: #eee;
  letter-spacing: -0.5px;
  line-height: 38px;
  user-select: none;

  & > span {
    font-size: 26px;

    ${({ $game }) => {
      if ($game === 'genshin') {
        return css`
          color: #4a90e2;
        `;
      }
      if ($game === 'zzz') {
        return css`
          color: #f59e42;
        `;
      }
      if ($game === 'hsr') {
        return css`
          color: #d89cb5;
        `;
      }
    }}
  }
`;

const StyledUl = styled.ul`
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
  width: 360px;
  height: 200px;
  flex-shrink: 0;
  z-index: -1;
  pointer-events: none;
  user-select: none;

  & > img {
    opacity: 0.35;
    object-fit: cover;
    filter: grayscale(0.5);
  }

  ${({ $game }) => {
    if ($game === 'genshin') {
      return css`
        top: 50px;
        left: 20px;
        scale: 1.3;
      `;
    }
    if ($game === 'zzz') {
      return css`
        top: 10px;
        left: -20px;
      `;
    }
    if ($game === 'hsr') {
      return css`
        top: 55px;
        left: -75px;
        scale: 1.8;
      `;
    }
  }}
`;

const disabledCss = css`
  filter: grayscale(0.6);
  opacity: 0.6;
`;
