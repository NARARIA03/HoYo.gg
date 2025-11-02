import styled from '@emotion/styled';
import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLLIElement> & {
  horizontal?: boolean;
  label: string;
  value: string;
};

export const ArticleCardItem = ({ horizontal = false, label, value, ...props }: Props) => {
  return (
    <StyledListItem $horizontal={horizontal} {...props}>
      <StyledLabel $horizontal={horizontal}>{label}</StyledLabel>
      <StyledValue>{value}</StyledValue>
    </StyledListItem>
  );
};

const StyledListItem = styled.li<{ $horizontal: boolean }>`
  display: flex;
  flex-direction: ${({ $horizontal }) => ($horizontal ? 'row' : 'column')};
  align-items: ${({ $horizontal }) => ($horizontal ? 'center' : 'flex-start')};
  gap: ${({ $horizontal }) => ($horizontal ? 8 : 4)}px;
`;

const StyledLabel = styled.p<{ $horizontal: boolean }>`
  font-size: ${({ $horizontal }) => ($horizontal ? 15 : 11)}px;
  font-weight: 500;
  color: #7f7f8f;
`;

const StyledValue = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #d0d0d8;
`;
