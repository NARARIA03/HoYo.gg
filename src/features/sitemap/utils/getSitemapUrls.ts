import { BASE_URL } from '@/constants/env';
import type { TSitemapConfig } from '../types';

export const getSitemapUrls = async (config: TSitemapConfig, currentPath = ''): Promise<string[]> => {
  const urls = [];

  if (currentPath === '') urls.push(BASE_URL);

  for (const [key, value] of Object.entries(config)) {
    const newPath = currentPath ? `${currentPath}/${key}` : `/${key}`;
    const newUrl = `${BASE_URL}${newPath}`;

    // 함수인 경우 -> 실행 결과를 urls에 추가
    if (typeof value === 'function') {
      const dynamicUrls = await value();
      urls.push(newUrl, ...dynamicUrls);
    }

    // 객체고 null이 아닌 경우 -> newUrl을 추가하고 재귀 실행
    else if (typeof value === 'object' && value !== null) {
      urls.push(newUrl);
      if (Object.keys(value).length > 0) {
        const childUrls = await getSitemapUrls(value, newPath);
        urls.push(...childUrls);
      }
    }

    // null인 경우 -> newUrl만 추가
    else {
      urls.push(newUrl);
    }
  }

  return urls;
};
