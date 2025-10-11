import styled from '@emotion/styled';
import { MAX_WIDTH } from '@/styles/theme';
import { GenshinCardList } from '../components/GenshinCardList/GenshinCardList';
import { useGetGenshinCharacters } from '../hooks/queries/useGetGenshinCharacters';

export default function GenshinCharactersContainer() {
  const { data: characters } = useGetGenshinCharacters();

  if (!characters) return null;

  return (
    <Wrapper>
      <GenshinCardList characters={characters} />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
  padding: 20px 0;
  background-color: rgb(30, 30, 47);
`;
