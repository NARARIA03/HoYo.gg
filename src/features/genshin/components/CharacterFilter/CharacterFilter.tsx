import Image from 'next/image';
import styled from '@emotion/styled';
import { IMAGES } from '@/constants/images';
import { HEADER_HEIGHT, MAX_WIDTH, TOP_Z_INDEX } from '@/styles/layout';
import { mediaQuery } from '@/styles/theme';
import { getObjectEntries } from '@/utils';
import { useGenshinQueryParams } from '../../hooks/useGenshinQueryParams';
import type { GIElementDTO, GIRankDTO, GIWeaponDTO } from '../../types/baseDto';

const elements = getObjectEntries(IMAGES.genshin.element);
const weapons = getObjectEntries(IMAGES.genshin.weapon);

// Todo: 추상화가 조금 더 가능할 것 같다.
// * active, toggle 함수의 파라미터를 확장하고, 타입에 따라 다른 객체를 확인하는 등...
export const CharacterFilter = () => {
  const { queryParams, setQueryParams } = useGenshinQueryParams();

  const isElementActive = (element: GIElementDTO) => {
    if (!queryParams.element.length) return true;
    return queryParams.element.includes(element);
  };

  const toggleElement = (element: GIElementDTO) => {
    const newElementParams = queryParams.element.includes(element)
      ? queryParams.element.filter((el) => el !== element)
      : [...queryParams.element, element];
    setQueryParams({ element: newElementParams });
  };

  const isWeaponActive = (weapon: GIWeaponDTO) => {
    if (!queryParams.weapon.length) return true;
    return queryParams.weapon.includes(weapon);
  };

  const toggleWeapon = (weapon: GIWeaponDTO) => {
    const newWeaponParams = queryParams.weapon.includes(weapon)
      ? queryParams.weapon.filter((el) => el !== weapon)
      : [...queryParams.weapon, weapon];
    setQueryParams({ weapon: newWeaponParams });
  };

  const isRankActive = (rank: GIRankDTO) => {
    if (!queryParams.rank.length) return true;
    return queryParams.rank.includes(rank);
  };

  const toggleRank = (rank: GIRankDTO) => {
    const newRankParams = queryParams.rank.includes(rank)
      ? queryParams.rank.filter((el) => el !== rank)
      : [...queryParams.rank, rank];
    setQueryParams({ rank: newRankParams });
  };

  return (
    <Wrapper>
      <StyledNav>
        <StyledList>
          {elements.map(([element, url]) => (
            <StyledListItem key={element} $isActive={isElementActive(element)}>
              <StyledButton onClick={() => toggleElement(element)}>
                <Image src={url} width={32} height={32} alt={element} />
              </StyledButton>
            </StyledListItem>
          ))}
        </StyledList>
        <StyledList>
          {weapons.map(([weapon, url]) => (
            <StyledListItem key={weapon} $isActive={isWeaponActive(weapon)}>
              <StyledButton onClick={() => toggleWeapon(weapon)}>
                <Image src={url} width={32} height={32} alt={weapon} />
              </StyledButton>
            </StyledListItem>
          ))}
        </StyledList>
        <StyledList>
          <StyledListItem $isActive={isRankActive('QUALITY_ORANGE_SP')}>
            <StyledButton onClick={() => toggleRank('QUALITY_ORANGE_SP')} css={{ color: '#cc6a64' }}>
              ★
            </StyledButton>
          </StyledListItem>
          <StyledListItem onClick={() => toggleRank('QUALITY_ORANGE')} $isActive={isRankActive('QUALITY_ORANGE')}>
            <StyledButton css={{ color: '#ffb139' }}>★</StyledButton>
          </StyledListItem>
          <StyledListItem $isActive={isRankActive('QUALITY_PURPLE')}>
            <StyledButton onClick={() => toggleRank('QUALITY_PURPLE')} css={{ color: '#d28fd6' }}>
              ★
            </StyledButton>
          </StyledListItem>
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

const StyledButton = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  font-size: 28px;
  cursor: pointer;
`;
