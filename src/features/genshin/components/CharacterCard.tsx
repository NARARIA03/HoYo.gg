import { IMAGES } from '@/constants/images';
import type { ElementTextDTO, RegionDTO } from '../types/genshinDbDto';
import styled from '@emotion/styled';
import Image from 'next/image';

type Props = {
  /** 이름 */
  name: string;
  /** 타이틀 */
  title: string;
  /** 캐릭터 소개글 */
  description: string;
  /** 등급 */
  rarity: 4 | 5;
  /** 사용 원소 */
  elementText: ElementTextDTO;
  /** 지역 */
  region: RegionDTO;
  /** 이미지 url */
  image: string;
  /** 클릭 콜백 */
  onClick: () => void;
};

/**
 * 캐릭터별 카드를 렌더링하는 컴포넌트입니다.
 */
export const CharacterCard = ({ name, title, description, rarity, elementText, region, image, onClick }: Props) => {
  return (
    <Wrapper onClick={onClick}>
      <RarityImage src={IMAGES.genshin.rarity[rarity]} alt={`${rarity}등급 배경`} width={250} height={320} />
      <AvatarImage src={image} alt={name} width={240} height={240} />
      <ImageIcon src={IMAGES.genshin.emblem[region]} alt={region} width={35} height={35} css={{ top: 10, right: 10 }} />
      <ImageIcon
        src={IMAGES.genshin.element[elementText]}
        alt={`${elementText} 원소`}
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
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  width: 250px;
  height: 320px;
  padding: 5px 0 0 0;
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

const RarityImage = styled(Image)`
  position: absolute;
  inset: 0;
  border-radius: 10px;
  object-fit: cover;
  pointer-events: none;
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
