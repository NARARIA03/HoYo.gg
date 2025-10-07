import { getRankBgColor } from '@/styles/theme';
import type { TRank } from '@/types/common';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

type IconProps = {
  src: string;
  alt: string;
};

type Props = {
  /** 캐릭터명, 장비명 등 */
  name: string;
  /** 캐릭터, 장비 이미지 등 URL */
  imageUrl: string;
  /** 등급 */
  rank: TRank;
  /** 좌상단 아이콘 */
  leftIcon?: IconProps;
  /** 우상단 아이콘 */
  rightIcon?: IconProps;
  /** 클릭 시 이동할 URL */
  href: string;
};

/** 전역적으로 사용할 카드 컴포넌트입니다. 캐릭터, 아이템, 장비 등에 사용됩니다. */
export const Card = ({ name, imageUrl, rank, leftIcon, rightIcon, href }: Props) => {
  return (
    <Link href={href}>
      <StyledFigure>
        {leftIcon && <LeftIconImage src={leftIcon.src} alt={leftIcon.alt} width={24} height={24} />}
        {rightIcon && <RightIconImage src={rightIcon.src} alt={rightIcon.alt} width={24} height={24} />}
        <ImageWrapper $rank={rank}>
          <Image src={imageUrl} alt="" fill />
        </ImageWrapper>
        <StyledFigcaption>{name}</StyledFigcaption>
      </StyledFigure>
    </Link>
  );
};

const StyledFigure = styled.figure`
  position: relative;
  width: 120px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
`;

const ImageWrapper = styled.div<{ $rank: TRank }>`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${({ $rank }) => getRankBgColor($rank)};
  overflow: hidden;

  & > img {
    object-fit: cover;
    object-position: top;
    pointer-events: none;
  }
`;

const StyledFigcaption = styled.figcaption`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 8px 0;
  backdrop-filter: blur(5px) brightness(60%);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
`;

const IconImage = styled(Image)`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 1));
`;

const LeftIconImage = styled(IconImage)`
  top: 4px;
  left: 4px;
`;

const RightIconImage = styled(IconImage)`
  top: 4px;
  right: 4px;
`;
