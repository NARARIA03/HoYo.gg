import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  href: string;
  imageUrl: string;
  alt: string;
  children: ReactNode;
};

export const GamePannel = ({ href, imageUrl, alt, children }: Props) => {
  return (
    <SLink href={href}>
      <SText>{children}</SText>
      <SImage src={imageUrl} alt={alt} fill priority sizes="33vw" />
    </SLink>
  );
};

const SLink = styled(Link)`
  position: relative;
  right: 0px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  filter: grayscale(100%);
  transition:
    transform 0.3s ease-in-out,
    filter 0.3s ease-in-out;

  &:hover {
    filter: none;
  }
`;

const SText = styled.p`
  color: #fff;
  font-size: 48px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const SImage = styled(Image)`
  object-fit: cover;
  pointer-events: none;
`;
