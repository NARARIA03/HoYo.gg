import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FooterContainer from '../containers/FooterContainer';

describe('푸터 컴포넌트 테스트 코드', () => {
  it('원신 Footer 렌더링 확인', () => {
    render(<FooterContainer game="genshin" />);

    const target = screen.getByText((_, element) => {
      return (
        element?.tagName === 'P' &&
        element.textContent === 'HoYo.GG' &&
        element.querySelector('span')?.textContent === '.GG'
      );
    });
    expect(target).toBeInTheDocument();
    expect(screen.getByAltText('genshin title logo')).toBeInTheDocument();
    expect(screen.getByText('Genshin Impact')).toBeInTheDocument();
  });

  it('스타레일 Footer 렌더링 확인', () => {
    render(<FooterContainer game="hsr" />);

    const target = screen.getByText((_, element) => {
      return (
        element?.tagName === 'P' &&
        element.textContent === 'HoYo.GG' &&
        element.querySelector('span')?.textContent === '.GG'
      );
    });
    expect(target).toBeInTheDocument();
    expect(screen.getByText('Honkai: Star Rail')).toBeInTheDocument();
    expect(screen.getByAltText('hsr title logo')).toBeInTheDocument();
  });

  it('젠레스 Footer 렌더링 확인', () => {
    render(<FooterContainer game="zzz" />);

    const target = screen.getByText((_, element) => {
      return (
        element?.tagName === 'P' &&
        element.textContent === 'HoYo.GG' &&
        element.querySelector('span')?.textContent === '.GG'
      );
    });
    expect(target).toBeInTheDocument();
    expect(screen.getByText('Zenless Zone Zero')).toBeInTheDocument();
    expect(screen.getByAltText('zzz title logo')).toBeInTheDocument();
  });

  it('Contact 정보 확인', () => {
    render(<FooterContainer game="zzz" />);

    const email = screen.getByAltText('Gmail').closest('a');
    const github = screen.getByAltText('Github').closest('a');
    const velog = screen.getByAltText('Velog').closest('a');

    expect(email).toHaveAttribute('href', 'mailto:hyeonseong0305@gmail.com');
    expect(email).toHaveAttribute('target', '_blank');
    expect(email).toHaveAttribute('rel', 'noopener noreferrer');

    expect(github).toHaveAttribute('href', 'https://github.com/NARARIA03');
    expect(github).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('rel', 'noopener noreferrer');

    expect(velog).toHaveAttribute('href', 'https://velog.io/@hyeonseong0305');
    expect(velog).toHaveAttribute('target', '_blank');
    expect(velog).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
