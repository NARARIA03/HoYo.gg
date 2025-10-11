import styled from '@emotion/styled';
import { Card } from '@/components';
import { IMAGES } from '@/constants/images';
import { getGenshinAvatarUrl, getGenshinRank } from '../../utils';
import type { GICharactersDTO } from '../../types/chatactersDto';

type Props = {
  /** 캐릭터 리스트 API 응답 */
  characters: GICharactersDTO;
};

/** 원신 캐릭터 카드 리스트 컴포넌트입니다. */
export const GenshinCardList = ({ characters }: Props) => {
  return (
    <Grid>
      {Object.entries(characters).map(([id, character]) => (
        <li key={id}>
          <Card
            name={character.KR}
            rank={getGenshinRank(character.rank)}
            imageUrl={getGenshinAvatarUrl(character.icon)}
            rightIcon={{
              src: IMAGES.genshin.element[character.element],
              alt: character.element,
            }}
            href=""
          />
        </li>
      ))}
    </Grid>
  );
};

const Grid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
`;
