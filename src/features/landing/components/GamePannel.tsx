import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, type ReactNode } from 'react';
import { usePannelParallax } from '../hooks/usePannelParallax';

type Props = {
  href: string;
  imageUrl: string;
  alt: string;
  children: ReactNode;
};

export const GamePannel = ({ href, imageUrl, alt, children }: Props) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const offset = usePannelParallax(linkRef);

  return (
    <SLink ref={linkRef} href={href}>
      <SImage
        src={imageUrl}
        alt={alt}
        fill
        priority
        sizes="(max-width: 800px) 100vw, 33vw"
        css={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(1.45)` }}
      />
      <SText>{children}</SText>
    </SLink>
  );
};

const SLink = styled(Link)`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  filter: grayscale(100%);
  transition:
    flex 0.3s ease-in-out,
    filter 0.3s ease-in-out;

  &:hover {
    filter: none;
    flex: 1.3;
  }
`;

const SText = styled.p`
  color: #fff;
  font-size: 48px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  text-align: center;
  margin: auto 0;
  z-index: 1;
  pointer-events: none;
`;

const SImage = styled(Image)`
  object-fit: cover;
  pointer-events: none;
  transition: transform 0.12s ease-out;
`;
