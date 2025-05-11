import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { seoConstants } from '../constants';

export const SeoContainer = () => {
  const router = useRouter();
  const { title, description } = seoConstants[router.pathname];
  return <NextSeo title={title} description={description} />;
};
