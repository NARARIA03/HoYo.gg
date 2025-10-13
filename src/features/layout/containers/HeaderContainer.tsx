import styled from '@emotion/styled';
import type { LayoutProps } from '../types';
import { getPrimaryColor } from '@/styles/theme';
import { HEADER_HEIGHT, MAX_WIDTH, TOP_Z_INDEX } from '@/styles/layout';
import type { TGame } from '@/types/common';
import GameListNavBar from '../components/GameListNavBar';
import HeaderBackgroundImage from '../components/HeaderBackgroundImage';
import GlobalNavBar from '../components/GlobalNavBar';

/** Genshin, Honkai:Starrail, Zenless Zone Zero 페이지 모두에서 사용될 공통 헤더입니다 */
export default function HeaderContainer({ game, className }: LayoutProps) {
  return (
    <HeaderWrapper className={className}>
      <Wrapper>
        <StyledNav>
          <Heading $game={game}>
            HoYo<span>.GG</span>
          </Heading>
          <GameListNavBar game={game} />
        </StyledNav>
        <HeaderBackgroundImage game={game} />
        <GlobalNavBar game={game} />
      </Wrapper>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: ${HEADER_HEIGHT};
  display: flex;
  padding: 0 10px;
  overflow: hidden;
  background-color: rgba(30, 30, 47, 0.8);
  backdrop-filter: blur(8px);
  z-index: ${TOP_Z_INDEX};
`;

const Wrapper = styled.div`
  position: relative;
  max-width: ${MAX_WIDTH};
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    font-size: 28px;
    color: ${({ $game }) => getPrimaryColor($game)};
  }
`;
