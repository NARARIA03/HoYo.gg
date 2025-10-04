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
  name: string;
  imageUrl: string;
  rank: TRank;
  leftIcon?: IconProps;
  rightIcon?: IconProps;
  href: string;
};

export default function Card({ name, imageUrl, rank, leftIcon, rightIcon, href }: Props) {
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
}

const StyledFigure = styled.figure`
  position: relative;
  width: 120px;
  background-color: #eee;
  border-radius: 8px;
  overflow: hidden;
`;

const ImageWrapper = styled.div<{ $rank: TRank }>`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: ${({ $rank }) => getRankBgColor($rank)};
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  overflow: hidden;

  & > img {
    object-fit: cover;
    object-position: top;
    pointer-events: none;
  }
`;

const StyledFigcaption = styled.figcaption`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  padding: 6px 0;
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
