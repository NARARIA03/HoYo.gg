import type { ElementTextDTO, RegionDTO } from '../../types/genshinDbDto';
import * as S from './CharacterCard.styles';

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
}: Props) => {
  return (
    <S.Wrapper $rarity={rarity} $elementText={elementText}>
      <S.AvatarImage src={image} alt={name + 'image'} width={150} height={150} />
      <p>{title}</p>
      <p>{rarity}</p>
      <p>{elementText}</p>
      <p>{affiliation}</p>
      <p>{region}</p>
      <p>{constellation}</p>
    </S.Wrapper>
  );
};
