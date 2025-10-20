import { describe, expect, test, vi } from 'vitest';
import { getSitemapUrls } from '../utils/getSitemapUrls';

vi.mock('@/constants/env', () => ({
  BASE_URL: 'base',
}));

describe('getSitemapUrls 테스트 코드', () => {
  test('config가 빈 객체인 경우 BASE_URL만 반환', async () => {
    const config = {};
    const urls = await getSitemapUrls(config);

    expect(urls).toEqual(['base']);
  });

  test('value가 null인 경우, key URL 생성', async () => {
    const config = {
      a: null,
      b: null,
    };
    const urls = await getSitemapUrls(config);

    expect(urls).toContain('base');
    expect(urls).toContain('base/a');
    expect(urls).toContain('base/b');
    expect(urls).toHaveLength(3);
  });

  test('value가 빈 객체인 경우, key URL 생성', async () => {
    const config = {
      a: {},
    };
    const urls = await getSitemapUrls(config);

    expect(urls).toContain('base');
    expect(urls).toContain('base/a');
    expect(urls).toHaveLength(2);
  });

  test('중첩된 config에 대해 재귀적으로 URL 생성', async () => {
    const config = {
      g: {
        a: null,
        b: null,
      },
    };
    const urls = await getSitemapUrls(config);
    expect(urls).toContain('base');
    expect(urls).toContain('base/g');
    expect(urls).toContain('base/g/a');
    expect(urls).toContain('base/g/b');
    expect(urls).toHaveLength(4);
  });

  test('value가 함수인 경우 동적 URL 생성', async () => {
    const mockFn = vi.fn().mockResolvedValue(['base/g/a/1', 'base/g/a/2']);

    const config = {
      g: {
        a: mockFn,
      },
    };

    const urls = await getSitemapUrls(config);
    expect(mockFn).toHaveBeenCalledOnce();
    expect(urls).toContain('base');
    expect(urls).toContain('base/g');
    expect(urls).toContain('base/g/a');
    expect(urls).toContain('base/g/a/1');
    expect(urls).toContain('base/g/a/2');
    expect(urls).toHaveLength(5);
  });
});
