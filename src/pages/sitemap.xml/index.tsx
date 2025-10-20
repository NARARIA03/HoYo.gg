import type { GetServerSideProps } from 'next';
import { getSitemapXml } from '@/features/sitemap/utils/getSitemapXml';
import { getSitemapUrls } from '@/features/sitemap/utils/getSitemapUrls';
import { SITEMAP_CONFIG } from '@/features/sitemap/constants';

export default function Sitemap() {
  return null;
}

export const getServerSideProps = (async ({ res }) => {
  const urls = await getSitemapUrls(SITEMAP_CONFIG);
  const sitemap = getSitemapXml(urls);

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, max-age=2592000, s-maxage=2592000');
  res.write(sitemap);
  res.end();

  return { props: {} };
}) satisfies GetServerSideProps;
