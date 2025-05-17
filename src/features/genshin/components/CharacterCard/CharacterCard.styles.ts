import styled from '@emotion/styled';
import Image from 'next/image';
import type { ElementTextDTO } from '../../types/genshinDbDto';

type SectionProps = {
  $rarity: 4 | 5;
  $elementText: ElementTextDTO;
};

export const Wrapper = styled.section<SectionProps>`
  width: 230px;
  height: 300px;
  background: ${({ $elementText }) => _getBackground($elementText)};
  padding: 10px;
  border-radius: 10px;
  border: 7px solid ${({ $rarity }) => ($rarity === 4 ? '#8e44ad' : '#e8b100')};
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 8px 20px rgba(0, 0, 0, 0.15);
  user-select: none;
`;

export const AvatarImage = styled(Image)`
  display: block;
  object-fit: cover;
  pointer-events: none;
  margin: 0 auto;
`;

const _getBackground = (element: ElementTextDTO) => {
  switch (element) {
    case '불':
      return 'conic-gradient(from 0deg at center, #ff3c00, #ffb300, #ff3c00)';
    case '물':
      return 'conic-gradient(from 0deg at center, #00bfff, #00f9ff, #00bfff)';
    case '얼음':
      return 'conic-gradient(from 0deg at center, #9be2ff, #3a8dff, #9be2ff)';
    case '바위':
      return 'conic-gradient(from 0deg at center, #e0b861, #5e4a1e, #e0b861)';
    case '풀':
      return 'conic-gradient(from 0deg at center, #66bb6a, #a8e063, #66bb6a)';
    case '번개':
      return 'conic-gradient(from 0deg at center, #8e00ff, #d96bff, #8e00ff)';
    case '바람':
      return 'conic-gradient(from 0deg at center, #00d6b7, #00ffc6, #00d6b7)';
    case '없음':
    default:
      return 'conic-gradient(from 0deg at center, #aaaaaa, #eeeeee, #aaaaaa)';
  }
};
