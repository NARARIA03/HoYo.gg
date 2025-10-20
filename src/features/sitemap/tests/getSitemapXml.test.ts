import { describe, expect, test, vi, beforeEach } from 'vitest';
import { getSitemapXml } from '../utils/getSitemapXml';

describe('getSitemapXml 테스트 코드', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15T10:00:00.000Z'));
  });

  test('XML 기본 구조 포함', () => {
    const urls = ['base'];
    const xml = getSitemapXml(urls);

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(xml).toContain('</urlset>');
  });

  test('여러 URL에 대해 <url>, <loc>, <lastmod> 생성', () => {
    const urls = ['base', 'base/a', 'base/b'];
    const xml = getSitemapXml(urls);

    expect(xml).toContain('<loc>base</loc>');
    expect(xml).toContain('<loc>base/a</loc>');
    expect(xml).toContain('<loc>base/b</loc>');
    expect(xml).toContain('<lastmod>2025-01-15T10:00:00.000Z</lastmod>');
  });

  test('URL 배열 길이만큼 <url>, <loc>, <lastmod> 생성', () => {
    const urls = ['base', 'base/a', 'base/b'];
    const xml = getSitemapXml(urls);

    const urlMatches = xml.match(/<url>/g);
    const locMatches = xml.match(/<loc>/g);
    const lastmodMatches = xml.match(/<lastmod>/g);

    expect(urlMatches).toHaveLength(urls.length);
    expect(locMatches).toHaveLength(urls.length);
    expect(lastmodMatches).toHaveLength(urls.length);
  });

  test('빈 배열이 들어오면 기본 구조만 생성', () => {
    const xml = getSitemapXml([]);

    expect(xml).not.toContain('<url>');
    expect(xml).not.toContain('<loc>');
    expect(xml).not.toContain('<lastmod>');
  });

  test('모든 <lastmod>가 동일한 현재 시간을 가짐', () => {
    const urls = ['base', 'base/a', 'base/b'];
    const xml = getSitemapXml(urls);

    const expectedTime = '2025-01-15T10:00:00.000Z';
    const lastmodMatches = xml.match(/<lastmod>.*?<\/lastmod>/g);

    expect(lastmodMatches).not.toBeNull();
    lastmodMatches?.forEach((match) => {
      expect(match).toBe(`<lastmod>${expectedTime}</lastmod>`);
    });
  });
});
