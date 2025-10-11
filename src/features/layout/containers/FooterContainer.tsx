import styled from '@emotion/styled';
import type { LayoutProps } from '../types';
import { getPrimaryColor, MAX_WIDTH } from '@/styles/theme';
import { css } from '@emotion/react';
import type { TGame } from '@/types/common';
import { GAME_LOGO, GAME_TITLE } from '../constants';
import Image from 'next/image';

/** Genshin, Honkai:Starrail, Zenless Zone Zero 페이지 모두에서 사용될 공통 푸터입니다 */
export default function FooterContainer({ game, className }: LayoutProps) {
  const mainLogo = GAME_LOGO[game];

  return (
    <StyledFooter className={className}>
      <TitleWrapper>
        <TitleTxt $game={game}>
          HoYo<span>.GG</span>
        </TitleTxt>
        <LogoWrapper $game={game}>
          <Image src={mainLogo} fill alt={`${game} title logo`} />
        </LogoWrapper>
      </TitleWrapper>
      <CopyrightTxtWrapper>
        <p>
          <span>HoYo.gg</span>는 개인 개발자가 만든 비영리 팬메이드 웹사이트로, <span>HoYoverse</span>와 연관이
          없습니다.
        </p>
        <p>
          <span>{GAME_TITLE[game]}</span>와 관련된 모든 관련 지적 재산권은 <span>HoYoverse</span>의 소유임을 밝힙니다.
        </p>
      </CopyrightTxtWrapper>
      <ContactWrapper>
        <ContactTitleTxt>Contact me</ContactTitleTxt>
        <AnchorList>
          <li>
            <Anchor href="mailto:hyeonseong0305@gmail.com" rel="noopener noreferrer" target="_blank">
              <Image src="/images/icons/gmail.png" width={20} height={20} alt="Gmail" />
              hyeonseong0305@gmail.com
            </Anchor>
          </li>
          <li>
            <Anchor href="https://github.com/NARARIA03" rel="noopener noreferrer" target="_blank">
              <Image src="/images/icons/github.png" width={20} height={20} alt="Github" />
              NARARIA03
            </Anchor>
          </li>
          <li>
            <Anchor href="https://velog.io/@hyeonseong0305" rel="noopener noreferrer" target="_blank">
              <Image src="/images/icons/velog.png" width={20} height={20} alt="Velog" />
              NARARIA03
            </Anchor>
          </li>
        </AnchorList>
      </ContactWrapper>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  width: 100%;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  background-color: #1c1c2c;
  gap: 12px;
  padding: 20px 10px;
  user-select: none;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
  align-items: center;
`;

const TitleTxt = styled.p<{ $game: TGame }>`
  font-size: 38px;
  font-weight: 800;
  color: #eee;
  letter-spacing: -0.5px;
  line-height: 38px;

  & > span {
    font-size: 28px;
    color: ${({ $game }) => getPrimaryColor($game)};
  }
`;

const LogoWrapper = styled.div<{ $game: TGame }>`
  position: relative;
  width: 160px;
  height: 60px;
  overflow: hidden;

  & > img {
    object-fit: contain;
    pointer-events: none;

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

const CopyrightTxtWrapper = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > p {
    color: #777;
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;

    & > span {
      font-weight: 800;
    }
  }
`;

const ContactWrapper = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContactTitleTxt = styled.p`
  font-size: 20px;
  font-weight: 800;
  color: #eee;
`;

const AnchorList = styled.ul`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 490px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Anchor = styled.a`
  display: flex;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #777;
  transition:
    color 0.3s ease,
    transform 0.3s ease;

  &:hover {
    color: #fff;
    transform: translateY(-2px);
  }
`;
