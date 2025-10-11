import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeaderContainer from '../containers/HeaderContainer';

vi.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '',
  }),
}));

describe('헤더 컴포넌트 테스트 코드', () => {
  test('원신 링크가 존재하는지 확인', () => {
    render(<HeaderContainer game="genshin" />);
    const link = screen.getByRole('link', { name: 'genshin logo' });
    expect(link).toHaveAttribute('href', 'genshin');
  });

  test('스타레일 링크가 존재하는지 확인', () => {
    render(<HeaderContainer game="hsr" />);
    const link = screen.getByRole('link', { name: 'hsr logo' });
    expect(link).toHaveAttribute('href', 'hsr');
  });

  test('젠레스 링크가 존재하는지 확인', () => {
    render(<HeaderContainer game="zzz" />);
    const link = screen.getByRole('link', { name: 'zzz logo' });
    expect(link).toHaveAttribute('href', 'zzz');
  });

  test('현재 페이지 로고는 55x55이고, 나머지 로고는 40x40', () => {
    render(<HeaderContainer game="genshin" />);

    const testCase = [
      ['genshin', '55'],
      ['hsr', '40'],
      ['zzz', '40'],
    ] as const;

    testCase.forEach(([game, size]) => {
      const logo = screen.getByAltText(`${game} logo`);
      expect(logo).toHaveAttribute('width', size);
      expect(logo).toHaveAttribute('height', size);
    });
  });
});
