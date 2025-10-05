import styled from '@emotion/styled';
import type { GICharactersDTO } from '../../types/chatactersDto';
import { Card } from '@/components';
import { getGenshinAvatarUrl, getGenshinRank } from '../../utils';
import { IMAGES } from '@/constants/images';

type Props = {
  /** 캐릭터 리스트 API 응답 */
  characters: GICharactersDTO;
};

/** 원신 캐릭터 카드 리스트 컴포넌트입니다. */
export const GenshinCardList = ({ characters }: Props) => {
  return (
    <Grid>
      {Object.entries(characters).map(([id, character]) => (
        <Card
          key={id}
          name={character.KR}
          rank={getGenshinRank(character.rank)}
          imageUrl={getGenshinAvatarUrl(character.icon)}
          rightIcon={{
            src: IMAGES.genshin.element[character.element],
            alt: character.element,
          }}
          href=""
        />
      ))}
    </Grid>
  );
};

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
`;
