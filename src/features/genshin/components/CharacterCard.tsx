import { IMAGES } from '@/constants/images';
import type { ElementTextDTO, RegionDTO } from '../types/genshinDbDto';
import styled from '@emotion/styled';
import Image from 'next/image';

type Props = {
  /** 이름 */
  name: string;
  /** 타이틀 */
  title: string;
  /** 등급 */
  rarity: 4 | 5;
  /** 사용 원소 */
  elementText: ElementTextDTO;
  /** 소속 단체 */
  affiliation: string;
  /** 지역 */
  region: RegionDTO;
  /** 운명의 별자리 */
  constellation: string;
  /** 이미지 url */
  image: string;
  onClick: () => void;
};

/**
 * 캐릭터별 카드를 렌더링하는 컴포넌트입니다.
 */
export const CharacterCard = ({
  name,
  title,
  rarity,
  elementText,
  affiliation,
  region,
  constellation,
  image,
  onClick,
}: Props) => {
  return (
    <Wrapper onClick={onClick}>
      <RarityImage src={IMAGES.genshin.rarity[rarity]} alt={`${rarity}성 이미지`} width={230} height={300} />
      <AvatarImage src={image} alt={name + 'image'} width={150} height={150} />
      <EmblemImage src={IMAGES.genshin.emblem[region]} alt={region} width={36} height={36} />
      <TextsWrapper>
        <p>
          {name}: {title}
        </p>
        <p>{elementText}</p>
        <p>{affiliation}</p>
        <p>{constellation}</p>
      </TextsWrapper>
    </Wrapper>
  );
};

export const Wrapper = styled.section`
  position: relative;
  width: 230px;
  height: 300px;
  padding: 10px 0 0 0;
  border-radius: 10px;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 8px 20px rgba(0, 0, 0, 0.15);
  user-select: none;
  cursor: pointer;

  & > * {
    position: relative;
    z-index: 1;
  }
`;

export const TextsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  backdrop-filter: blur(4px) brightness(60%);
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const RarityImage = styled(Image)`
  position: absolute;
  inset: 0;
  border-radius: 10px;
  object-fit: cover;
  pointer-events: none;
`;

export const AvatarImage = styled(Image)`
  display: block;
  object-fit: cover;
  pointer-events: none;
  margin: 10px auto;
`;

export const EmblemImage = styled(Image)`
  position: absolute;
  top: 10px;
  right: 10px;
  display: block;
  padding: 6px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  pointer-events: none;
`;
