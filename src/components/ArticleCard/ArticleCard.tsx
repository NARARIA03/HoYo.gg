import { ArticleCardGrid } from './ArticleCardGrid';
import { ArticleCardItem } from './ArticleCardItem';
import { ArticleCardWrapper } from './ArticleCardWrapper';

export const ArticleCard = Object.assign(ArticleCardWrapper, {
  Grid: ArticleCardGrid,
  Item: ArticleCardItem,
});
