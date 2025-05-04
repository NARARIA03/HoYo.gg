import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import LandingScreen from './LandingScreen';

describe('랜딩페이지 테스트 코드', () => {
  test('원신 링크가 존재하는지 확인', () => {
    render(<LandingScreen />);
    const text = screen.getByText('Genshin Impact');
    const link = text.closest('a');
    expect(link).toHaveAttribute('href', '/genshin');
  });

  test('스타레일 링크가 존재하는지 확인', () => {
    render(<LandingScreen />);
    const text = screen.getByText('Honkai: Star Rail');
    const link = text.closest('a');
    expect(link).toHaveAttribute('href', '/hsr');
  });

  test('젠레스 링크가 존재하는지 확인', () => {
    render(<LandingScreen />);
    const text = screen.getByText('Zenless Zone Zero');
    const link = text.closest('a');
    expect(link).toHaveAttribute('href', '/zzz');
  });
});
