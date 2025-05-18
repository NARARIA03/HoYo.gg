import styled from '@emotion/styled';
import Image from 'next/image';

export const Wrapper = styled.section<{ $rarity: 4 | 5 }>`
  position: relative;
  width: 400px;
  height: 400px;
  background-color: rgb(37, 41, 74);
  padding: 10px;
  border-radius: 10px;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 8px 20px rgba(0, 0, 0, 0.15);
  user-select: none;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 10px;
    background-color: ${({ $rarity }) => ($rarity === 4 ? 'rgb(210, 143, 214, 0.5)' : 'rgba(255, 177, 63, 0.5)')};
    z-index: 1;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

export const AvatarImage = styled(Image)`
  display: block;
  object-fit: cover;
  pointer-events: none;
  margin: 0 auto;
`;

export const EmblemImage = styled(Image)`
  position: absolute;
  top: 8px;
  right: 8px;
  display: block;
  padding: 6px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  pointer-events: none;
`;
