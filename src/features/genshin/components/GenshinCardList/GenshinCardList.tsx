import styled from '@emotion/styled';
import { Card } from '@/components';
import { IMAGES } from '@/constants/images';
import { MAX_WIDTH } from '@/styles/layout';
import { getObjectEntries } from '@/utils';
import { useGenshinQueryParams } from '../../hooks/useGenshinQueryParams';
import { getGenshinAvatarUrl, getGenshinRank } from '../../utils';
import type { GICharactersDTO } from '../../types/chatactersDto';

type Props = {
  /** 캐릭터 리스트 API 응답 */
  characters: GICharactersDTO;
};

/** 원신 캐릭터 카드 리스트 컴포넌트입니다. */
export const GenshinCardList = ({ characters }: Props) => {
  const { queryParams } = useGenshinQueryParams();

  const filteredCharacters = getObjectEntries(characters).filter(([_, character]) => {
    const { element, weapon, rank, keyword } = queryParams;

    const passesElement = !element.length || element.includes(character.element);
    const passesWeapon = !weapon.length || weapon.includes(character.weapon);
    const passesRank = !rank.length || rank.includes(character.rank);
    const passesKeyword = !keyword || character.KR.includes(keyword);

    return passesElement && passesWeapon && passesRank && passesKeyword;
  });

  return (
    <Grid>
      {filteredCharacters.map(([id, character]) => (
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
  width: 100%;
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
`;
