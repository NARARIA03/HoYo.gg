import { IconSearch } from '@/assets/svgs';
import { mediaQuery } from '@/styles/theme';
import styled from '@emotion/styled';
import type { FormHTMLAttributes } from 'react';

type Props = FormHTMLAttributes<HTMLFormElement>;

export const SearchInputForm = (props: Props) => {
  return (
    <SearchForm {...props}>
      <SearchInput type="text" name="keyword" placeholder="캐릭터 검색" />
      <SearchButton type="submit">
        <IconSearch />
      </SearchButton>
    </SearchForm>
  );
};

const SearchForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 0;
`;

const SearchInput = styled.input`
  padding: 8px 35px 8px 12px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 500;
  min-width: 180px;
  transition: all 0.2s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    background-color: rgba(255, 255, 255, 0.15);
  }

  ${mediaQuery.max768} {
    min-width: 120px;
    font-size: 13px;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`;
