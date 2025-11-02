import styled from '@emotion/styled';
import type { HTMLAttributes } from 'react';
import { mediaQuery } from '@/styles/theme';

type Props = HTMLAttributes<HTMLElement> & {
  title: string;
};

export const ArticleCardWrapper = ({ title, children, ...props }: Props) => {
  return (
    <StyledArticle {...props}>
      <Title>{title}</Title>
      {children}
    </StyledArticle>
  );
};

const StyledArticle = styled.article`
  padding-block: 16px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #d0d0d8;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #2a2a3f;

  ${mediaQuery.max768} {
    font-size: 16px;
    margin-bottom: 14px;
  }
`;
