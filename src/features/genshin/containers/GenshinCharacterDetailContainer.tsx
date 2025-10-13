import styled from '@emotion/styled';
import { useGetGenshinCharacterDetail } from '../hooks/queries/useGetGenshinCharacterDetail';
import { useGenshinNameAndId } from '../hooks/useGenshinNameAndId';
import { getGenshinAvatarUrl, getGenshinRank } from '../utils';
import { CharacterCardWrapper } from '../components/CharacterCardWrapper/CharacterCardWrapper';
import { MAX_WIDTH } from '@/styles/layout';

export default function GenshinCharacterDetailContainer() {
  const { id } = useGenshinNameAndId();
  const { data: characterDetail } = useGetGenshinCharacterDetail(id);

  if (!characterDetail) return null;

  return (
    <Wrapper>
      <CharacterCardWrapper
        name={characterDetail.Name}
        title={characterDetail.CharaInfo.Title}
        description={characterDetail.Desc}
        rank={getGenshinRank(characterDetail.Rarity)}
        element={characterDetail.Element}
        region={characterDetail.CharaInfo.Region}
        image={getGenshinAvatarUrl(characterDetail.Icon)}
      />
      <TodoText>추후 구현 예정입니다.</TodoText>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
  padding: 0 0 20px 0;
  background-color: rgb(30, 30, 47);
`;

const TodoText = styled.h2`
  font-weight: 600;
  font-size: 32px;
  color: #eee;
`;
