import { SITEMAP_CONFIG } from '../constants';
import { getSitemapUrls } from './getSitemapUrls';

const getLastMod = () => new Date().toISOString();

const getXml = (url: string) => {
  return `<url>
  <loc>${url}</loc>
  <lastmod>${getLastMod()}</lastmod>
</url>
`;
};

const getXmlTemplate = (urls: string[]) => {
  const xmlUrls = urls.map(getXml);

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlUrls.join('')}</urlset>`;
};

export const getSitemapXml = async () => {
  const urls = await getSitemapUrls(SITEMAP_CONFIG);
  return getXmlTemplate(urls);
};
