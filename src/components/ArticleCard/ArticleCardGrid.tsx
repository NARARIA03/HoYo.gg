import { mediaQuery } from '@/styles/theme';
import styled from '@emotion/styled';
import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLUListElement> & {
  columns?: number;
};

export const ArticleCardGrid = ({ columns = 2, children, ...props }: Props) => {
  return (
    <StyledGrid $columns={columns} {...props}>
      {children}
    </StyledGrid>
  );
};

const StyledGrid = styled.ul<{ $columns: number }>`
  display: grid;
  grid-template-columns: ${({ $columns }) => `repeat(${$columns}, 1fr)`};
  gap: 16px;

  ${mediaQuery.max768} {
    grid-template-columns: ${({ $columns }) => `repeat(${$columns - 1}, 1fr)`};
    gap: 12px;
  }
`;
