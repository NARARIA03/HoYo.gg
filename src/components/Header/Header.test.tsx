import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('헤더 컴포넌트 테스트 코드', () => {
  test('원신 링크가 존재하는지 확인', () => {
    render(<Header game="genshin" />);
    const link = screen.getByRole('link', { name: 'genshin logo' });
    expect(link).toHaveAttribute('href', 'genshin');
  });

  test('스타레일 링크가 존재하는지 확인', () => {
    render(<Header game="hsr" />);
    const link = screen.getByRole('link', { name: 'hsr logo' });
    expect(link).toHaveAttribute('href', 'hsr');
  });

  test('젠레스 링크가 존재하는지 확인', () => {
    render(<Header game="zzz" />);
    const link = screen.getByRole('link', { name: 'zzz logo' });
    expect(link).toHaveAttribute('href', 'zzz');
  });

  test('현재 페이지 로고는 55x55이고, 나머지 로고는 40x40', () => {
    render(<Header game="genshin" />);
    const images = screen.getAllByRole('img');

    images.forEach((image, idx) => {
      if (idx === images.length - 1) return;

      const size = idx === 0 ? '55' : '40';
      expect(image).toHaveAttribute('width', size);
      expect(image).toHaveAttribute('height', size);
    });
  });
});
