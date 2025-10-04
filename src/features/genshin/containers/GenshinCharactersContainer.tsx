import styled from '@emotion/styled';
import { useGetGenshinCharacters } from '../hooks/queries/useGetGenshinCharacters';
import Card from '@/components/Character/Card';
import { getGenshinAvatarUrl, getGenshinRank } from '../utils';
import { MAX_WIDTH } from '@/styles/theme';

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
