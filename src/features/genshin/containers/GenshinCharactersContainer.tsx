import styled from '@emotion/styled';
import { useGetGenshinCharacters } from '../hooks/queries/useGetGenshinCharacters';
import { getGenshinAvatarUrl, getGenshinRank } from '../utils';
import { MAX_WIDTH } from '@/styles/theme';
import { IMAGES } from '@/constants/images';
import { Card } from '@/components';

export default function GenshinCharactersContainer() {
  const { data: characters } = useGetGenshinCharacters();

  if (!characters) return null;

  return (
    <Wrapper>
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
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
  background-color: rgb(30, 30, 47);
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
`;
