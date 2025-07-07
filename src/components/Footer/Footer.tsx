import { getPrimaryColor } from '@/styles/theme';
import type { TGame } from '@/types/common';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { forwardRef } from 'react';

type Props = {
  /** 어떤 게임용 헤더를 렌더링할지 */
  game: TGame;
  /** next/font/local 주입용 className */
  className?: string;
};

const LOGO = {
  genshin: '/images/logos/Genshin.webp',
  hsr: '/images/logos/HSR.webp',
  zzz: '/images/logos/ZZZ.webp',
};

/** Genshin, Honkai:Starrail, Zenless Zone Zero 페이지 모두에서 사용될 공통 푸터입니다 */
export const Footer = forwardRef<HTMLElement, Props>(({ game, className }, ref) => {
  const mainLogoSrc = LOGO[game];

  return (
    <StyledFooter ref={ref} className={className}>
      <TitleWrapper>
        <TitleTxt $game={game}>
          HoYo<span>.GG</span>
        </TitleTxt>
        <ImageWrapper $game={game}>
          <Image src={mainLogoSrc} fill alt={`${game} title logo`} />
        </ImageWrapper>
      </TitleWrapper>
    </StyledFooter>
  );
});

Footer.displayName = 'Footer';

const StyledFooter = styled.footer`
  width: 100%;
  height: 240px;
  background-color: #1c1c2c;
  padding: 21px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const TitleTxt = styled.p<{ $game: TGame }>`
  font-size: 38px;
  font-weight: 800;
  color: #eee;
  letter-spacing: -0.5px;
  line-height: 38px;
  user-select: none;

  & > span {
    font-size: 28px;
    color: ${({ $game }) => getPrimaryColor($game)};
  }
`;

const ImageWrapper = styled.div<{ $game: TGame }>`
  position: relative;
  width: 160px;
  height: 60px;
  overflow: hidden;

  & > img {
    object-fit: contain;
    pointer-events: none;
    user-select: none;

    ${({ $game }) => {
      if ($game === 'genshin') {
        return css`
          scale: 2;
        `;
      }
      if ($game === 'zzz') {
        return css`
          scale: 0.8;
        `;
      }
      if ($game === 'hsr') {
        return css`
          scale: 1.2;
        `;
      }
    }}
  }
`;
