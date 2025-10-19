import type { GetServerSideProps } from 'next';
import { getSitemapXml } from '@/features/sitemap/utils/getSitemapXml';

export default function Sitemap() {
  return null;
}

export const getServerSideProps = (async ({ res }) => {
  const sitemapXml = await getSitemapXml();

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, max-age=2592000, s-maxage=2592000');
  res.write(sitemapXml);
  res.end();

  return { props: {} };
}) satisfies GetServerSideProps;
