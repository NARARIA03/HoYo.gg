import styled from '@emotion/styled';
import Image from 'next/image';
import { forwardRef, useRef } from 'react';
import { IMAGES } from '@/constants/images';
import { Glare, Hologram } from '@/components';
import type { TRank } from '@/types/common';
import { getRankBgColor } from '@/styles/theme';
import { mergeRefs } from '@/utils';
import { useTiltEffect } from '../../hooks/useTiltEffect';
import type { GIElementDTO, GIRegionDTO } from '../../types/baseDto';
import { elementTextMap, regionTextMap } from '../../constants';

export type Props = {
  /** 이름 */
  name: string;
  /** 타이틀 */
  title: string;
  /** 캐릭터 소개글 */
  description: string;
  /** 등급 */
  rank: TRank;
  /** 사용 원소 */
  element: GIElementDTO;
  /** 지역 */
  region: GIRegionDTO;
  /** 이미지 url */
  image: string;
  /** 클릭 콜백 */
  onClick: () => void;
};

/**
 * 캐릭터별 카드를 렌더링하는 컴포넌트입니다.
 */
export const CharacterCard = forwardRef<HTMLElement, Props>(
  ({ name, title, description, rank, element, region, image, onClick }, forwardedRef) => {
    const wrapperRef = useRef(null);
    const cardRef = useRef(null);

    useTiltEffect({ parentRef: wrapperRef, childRef: cardRef });

    return (
      <TiltBox ref={mergeRefs(forwardedRef, wrapperRef)}>
        <Wrapper ref={cardRef} onClick={onClick}>
          <Hologram parentRef={wrapperRef} css={{ zIndex: 3 }} />
          <Glare parentRef={wrapperRef} css={{ zIndex: 3 }} />
          <RankWrapper $rank={rank}>
            <AvatarImage src={image} alt={name} width={240} height={240} />
            <ImageIcon
              src={IMAGES.genshin.emblem[region]}
              alt={regionTextMap[region]}
              width={35}
              height={35}
              css={{ top: 10, right: 10 }}
            />
            <ImageIcon
              src={IMAGES.genshin.element[element]}
              alt={elementTextMap[element]}
              width={35}
              height={35}
              css={{ top: 50, right: 10 }}
            />
            <TextsBox>
              <NameTxt>
                {title} · {name}
              </NameTxt>
              <DescriptionTxt>{description}</DescriptionTxt>
            </TextsBox>
          </RankWrapper>
        </Wrapper>
      </TiltBox>
    );
  }
);

CharacterCard.displayName = 'CharacterCard';

const TiltBox = styled.section`
  width: fit-content;
  height: fit-content;
  padding: 15px;
  will-change: transform;
`;

const Wrapper = styled.div`
  position: relative;
  width: 250px;
  height: 320px;
  padding: 5px 0 0 0;
  border-radius: 10px;
  box-shadow:
    0 8px 12px rgba(0, 0, 0, 0.2),
    0 12px 32px rgba(0, 0, 0, 0.25),
    0 16px 48px rgba(0, 0, 0, 0.3);
  user-select: none;
  cursor: pointer;
  transition: transform 0.1s ease;
  transform-style: preserve-3d;
  overflow: hidden;

  & > * {
    position: relative;
    z-index: 1;
  }
`;

const TextsBox = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 105px;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(5px) brightness(50%);
  gap: 5px;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: rgba(255, 255, 255, 0.8);
`;

const RankWrapper = styled.div<{ $rank: TRank }>`
  width: 250px;
  height: 320px;
  position: absolute;
  inset: 0;
  border-radius: 10px;
  background: ${({ $rank }) => getRankBgColor($rank)};
`;

const AvatarImage = styled(Image)`
  display: block;
  object-fit: cover;
  pointer-events: none;
  margin: 10px auto 0 auto;
  overflow: hidden;
`;

const ImageIcon = styled(Image)`
  position: absolute;
  display: block;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  pointer-events: none;
`;

const NameTxt = styled.h3`
  font-weight: 800;
  font-size: 15px;
`;

const DescriptionTxt = styled.p`
  font-weight: 500;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
