import { IMAGES } from '@/constants/images';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef, type HTMLAttributes } from 'react';

type Props = {
  /** 어떤 게임용 헤더를 렌더링할지 */
  game: 'genshin' | 'hsr' | 'zzz';
};

/** Genshin, Honkai:Starrail, Zenless Zone Zero 페이지 모두에서 사용될 공통 헤더입니다 */
export const Header = forwardRef<HTMLAttributes<HTMLElement>, Props>(({ game }: Props) => {
  const mainLogoSrc = IMAGES.logo[game];
  const otherLogoSrcs = Object.entries(IMAGES.logo).filter(([key]) => key !== game);

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <ListItem>
          <FitLink href={game}>
            <LogoImage src={mainLogoSrc} width={60} height={60} alt={`${game} logo`} />
          </FitLink>
        </ListItem>
        {otherLogoSrcs.map(([href, src]) => (
          <ListItem key={src}>
            <FitLink href={href}>
              <LogoImage src={src} width={40} height={40} alt={`${href} logo`} css={{ opacity: 0.7 }} />
            </FitLink>
          </ListItem>
        ))}
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
  background-color: #1e1e2f;
`;

const LogoWrapper = styled.ul`
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
  border-radius: 10px;
`;
