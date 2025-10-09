import Image from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { HEADER_HEIGHT, MAX_WIDTH, TOP_Z_INDEX } from '@/styles/layout';
import { mediaQuery } from '@/styles/theme';
import { elements, rankColorMap, ranks, weapons } from '../../constants';
import { useGenshinQueryParams } from '../../hooks/useGenshinQueryParams';

export const CharacterFilter = () => {
  const { queryParams, setQueryParams } = useGenshinQueryParams();

  const isActive = <T extends Exclude<keyof typeof queryParams, 'keyword'>>(
    key: T,
    value: (typeof queryParams)[T][number]
  ) => {
    if (!queryParams?.[key].length) return true;
    return queryParams?.[key].some((v) => v === value);
  };

  const handleToggle = <T extends Exclude<keyof typeof queryParams, 'keyword'>>(
    key: T,
    value: (typeof queryParams)[T][number]
  ) => {
    const newParams = queryParams?.[key].some((v) => v === value)
      ? queryParams?.[key].filter((v) => v !== value)
      : [...queryParams?.[key], value];

    setQueryParams({ [key]: newParams });
  };

  return (
    <Wrapper>
      <StyledNav>
        <StyledList>
          {elements.map(([element, url]) => (
            <StyledListItem key={element} $isActive={isActive('element', element)}>
              <StyledButton onClick={() => handleToggle('element', element)}>
                <Image src={url} width={32} height={32} alt={element} />
              </StyledButton>
            </StyledListItem>
          ))}
        </StyledList>
        <StyledList>
          {weapons.map(([weapon, url]) => (
            <StyledListItem key={weapon} $isActive={isActive('weapon', weapon)}>
              <StyledButton onClick={() => handleToggle('weapon', weapon)}>
                <Image src={url} width={32} height={32} alt={weapon} />
              </StyledButton>
            </StyledListItem>
          ))}
        </StyledList>
        <StyledList>
          {ranks.map((rank) => (
            <StyledListItem key={rank} $isActive={isActive('rank', rank)}>
              <StyledButton onClick={() => handleToggle('rank', rank)} $rank={rank}>
                ★
              </StyledButton>
            </StyledListItem>
          ))}
        </StyledList>
      </StyledNav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  top: ${HEADER_HEIGHT};
  padding: 15px 0;
  background-color: rgba(30, 30, 47, 0.8);
  backdrop-filter: blur(8px);
  z-index: ${TOP_Z_INDEX};
`;

const StyledNav = styled.nav`
  width: 100%;
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
  display: flex;
  gap: 24px;
  overflow-x: auto;
  overflow-y: hidden;

  ${mediaQuery.max768} {
    padding: 0 10px;
  }
`;

const StyledList = styled.ul`
  display: flex;
  gap: 8px;
`;

const StyledListItem = styled.li<{ $isActive: boolean }>`
  width: 32px;
  height: 32px;
  opacity: ${({ $isActive }) => ($isActive ? '100%' : '30%')};
  transition:
    opacity 0.1s ease,
    transform 0.1s ease;

  &:hover {
    opacity: 100%;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const StyledButton = styled.button<{ $rank?: (typeof ranks)[number] }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  font-size: 28px;
  cursor: pointer;

  ${({ $rank }) => {
    if ($rank) {
      return css`
        color: ${rankColorMap[$rank]};
      `;
    }
  }}

  & > img {
    user-select: none;
    pointer-events: none;
  }
`;
