import type { TGame } from '@/types/common';
import { HEADER_BG_IMAGE } from '../constants';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';

type Props = {
  game: TGame;
};

export default function HeaderBackgroundImage({ game }: Props) {
  const headerImage = HEADER_BG_IMAGE[game];

  return (
    <Wrapper $game={game}>
      <StyledImage src={headerImage} alt="" fill />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $game: TGame }>`
  position: relative;
  width: 360px;
  height: 200px;
  flex-shrink: 0;
  z-index: -1;
  pointer-events: none;
  user-select: none;

  ${({ $game }) => {
    if ($game === 'genshin') {
      return css`
        top: 50px;
        right: 55px;
        scale: 1.3;
      `;
    }
    if ($game === 'zzz') {
      return css`
        top: 20px;
        right: 52px;
        scale: 1.3;
      `;
    }
    if ($game === 'hsr') {
      return css`
        top: 55px;
        right: 105px;
        scale: 1.8;
      `;
    }
  }}
`;

const StyledImage = styled(Image)`
  opacity: 0.35;
  object-fit: cover;
  filter: grayscale(0.5);
`;
