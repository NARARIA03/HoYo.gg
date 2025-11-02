import styled from '@emotion/styled';
import { MAX_WIDTH } from '@/styles/layout';
import { mediaQuery } from '@/styles/theme';
import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { useGetGenshinCharacterDetail } from '../hooks/queries/useGetGenshinCharacterDetail';
import { useGenshinNameAndId } from '../hooks/useGenshinNameAndId';
import { getGenshinAvatarUrl, getGenshinRank } from '../utils';
import { CharacterCardWrapper } from '../components/CharacterCardWrapper/CharacterCardWrapper';
import { elementTextMap, weaponTextMap } from '../constants';

export default function GenshinCharacterDetailContainer() {
  const { id } = useGenshinNameAndId();
  const { data: characterDetail } = useGetGenshinCharacterDetail(id);

  if (!characterDetail) return null;

  return (
    <Wrapper>
      <TopSection>
        <CharacterCardWrapper
          name={characterDetail.Name}
          title={characterDetail.CharaInfo.Title}
          description={characterDetail.Desc}
          rank={getGenshinRank(characterDetail.Rarity)}
          element={characterDetail.Element}
          region={characterDetail.CharaInfo.Region}
          image={getGenshinAvatarUrl(characterDetail.Icon)}
        />
        <BasicInfoSection>
          {/* Todo: 관심사에 따라 컴포넌트로 쪼개 리팩토링 */}
          <ArticleCard title="기본 정보">
            <ArticleCard.Grid>
              <ArticleCard.Item label="원소" value={elementTextMap[characterDetail.Element]} />
              <ArticleCard.Item label="무기" value={weaponTextMap[characterDetail.Weapon]} />
              <ArticleCard.Item label="운명의 자리" value={characterDetail.CharaInfo.Constellation} />
              <ArticleCard.Item label="소속" value={characterDetail.CharaInfo.Native} />
              <ArticleCard.Item
                label="생일"
                value={`${characterDetail.CharaInfo.Birth[0]}월 ${characterDetail.CharaInfo.Birth[1]}일`}
              />
              <ArticleCard.Item label="출시일" value={characterDetail.CharaInfo.ReleaseDate.split(' ')[0]} />
            </ArticleCard.Grid>
          </ArticleCard>
          {/* Todo: 관심사에 따라 컴포넌트로 쪼개 리팩토링 */}
          <ArticleCard title="성우 정보">
            <ArticleCard.Grid>
              <ArticleCard.Item horizontal label="🇰🇷" value={characterDetail.CharaInfo.VA.Korean} />
              <ArticleCard.Item horizontal label="🇯🇵" value={characterDetail.CharaInfo.VA.Japanese} />
              <ArticleCard.Item horizontal label="🇨🇳" value={characterDetail.CharaInfo.VA.Chinese} />
              <ArticleCard.Item horizontal label="🇺🇸" value={characterDetail.CharaInfo.VA.English} />
            </ArticleCard.Grid>
          </ArticleCard>
        </BasicInfoSection>
      </TopSection>
      {/* Todo: 관심사에 따라 컴포넌트로 쪼개 리팩토링 */}
      <ArticleCard title="기본 스텟">
        <ArticleCard.Grid columns={3}>
          <ArticleCard.Item label="HP" value={characterDetail.BaseHP.toLocaleString()} />
          <ArticleCard.Item label="ATK" value={characterDetail.BaseATK.toLocaleString()} />
          <ArticleCard.Item label="DEF" value={characterDetail.BaseDEF.toLocaleString()} />
          <ArticleCard.Item label="치명타 확률" value={`${characterDetail.CritRate}%`} />
          <ArticleCard.Item label="치명타 피해" value={`${characterDetail.CritDMG}%`} />
          <ArticleCard.Item label="원소 마스터리" value={characterDetail.ElementalMastery.toLocaleString()} />
        </ArticleCard.Grid>
      </ArticleCard>
      <ArticleCard title="전투 특성">
        <Placeholder>(추후 구현 예정입니다.)</Placeholder>
      </ArticleCard>
      <ArticleCard title="고유 특성">
        <Placeholder>(추후 구현 예정입니다.)</Placeholder>
      </ArticleCard>
      <ArticleCard title="운명의 자리">
        <Placeholder>(추후 구현 예정입니다.)</Placeholder>
      </ArticleCard>
      <ArticleCard title="육성 재료">
        <Placeholder>(추후 구현 예정입니다.)</Placeholder>
      </ArticleCard>
      <ArticleCard title="기타 정보">
        <Placeholder>(추후 구현 예정입니다.)</Placeholder>
      </ArticleCard>
      <ArticleCard title="스토리 & 대사">
        <Placeholder>(추후 구현 예정입니다.)</Placeholder>
      </ArticleCard>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
  padding: 10px 20px;
  background-color: rgb(30, 30, 47);

  ${mediaQuery.max768} {
    padding: 12px;
  }
`;

const TopSection = styled.div`
  display: flex;
  gap: 30px;

  ${mediaQuery.max768} {
    flex-direction: column;
    gap: 0;
  }
`;

const BasicInfoSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

// Placeholder
const Placeholder = styled.div`
  padding: 40px;
  text-align: center;
  color: #6f6f7f;
  font-size: 13px;
  background-color: transparent;
  border-radius: 15px;
  border: 1px dashed #2a2a3f;
`;
