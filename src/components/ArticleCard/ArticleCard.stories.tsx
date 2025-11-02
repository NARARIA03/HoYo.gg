import type { Meta, StoryFn } from '@storybook/react';
import { ArticleCard } from './ArticleCard';

const meta = {
  title: 'Components/Common/ArticleCard',
  component: ArticleCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleCard>;

export default meta;

export const TwoColumnLayout = (() => {
  return (
    <ArticleCard title="2열 그리드 레이아웃">
      <ArticleCard.Grid>
        <ArticleCard.Item label="생일" value="6월 1일" />
        <ArticleCard.Item label="출시일" value="2020-09-28" />
        <ArticleCard.Item label="소속" value="몬드" />
        <ArticleCard.Item label="별자리" value="바람꽃자리" />
      </ArticleCard.Grid>
    </ArticleCard>
  );
}) satisfies StoryFn<typeof ArticleCard>;

export const ThreeColumnLayout = (() => {
  return (
    <ArticleCard title="3열 그리드 레이아웃">
      <ArticleCard.Grid columns={3}>
        <ArticleCard.Item label="원소" value="바람" />
        <ArticleCard.Item label="무기" value="한손검" />
        <ArticleCard.Item label="레어도" value="5성" />
        <ArticleCard.Item label="HP" value="12,981" />
        <ArticleCard.Item label="공격력" value="335" />
        <ArticleCard.Item label="방어력" value="784" />
      </ArticleCard.Grid>
    </ArticleCard>
  );
}) satisfies StoryFn<typeof ArticleCard>;

export const HorizontalItemLayout = (() => {
  return (
    <ArticleCard title="가로 아이템 레이아웃">
      <ArticleCard.Grid>
        <ArticleCard.Item horizontal label="한국어" value="김하루" />
        <ArticleCard.Item horizontal label="일본어" value="사이토 치와" />
        <ArticleCard.Item horizontal label="영어" value="Stephanie Southerland" />
        <ArticleCard.Item horizontal label="중국어" value="펑리야오" />
      </ArticleCard.Grid>
    </ArticleCard>
  );
}) satisfies StoryFn<typeof ArticleCard>;
