import styled from '@emotion/styled';
import { GenshinCardList } from '../components/GenshinCardList/GenshinCardList';
import { useGetGenshinCharacters } from '../hooks/queries/useGetGenshinCharacters';
import { CharacterFilter } from '../components/CharacterFilter/CharacterFilter';

export default function GenshinCharactersContainer() {
  const { data: characters } = useGetGenshinCharacters();

  if (!characters) return null;

  return (
    <Wrapper>
      <CharacterFilter />
      <GenshinCardList characters={characters} />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 0 0 20px 0;
  background-color: rgb(30, 30, 47);
`;
