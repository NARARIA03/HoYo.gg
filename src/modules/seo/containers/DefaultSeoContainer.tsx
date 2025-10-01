import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { BASE_URL } from '@/constants/env';

export const DefaultSeoContainer = () => {
  const router = useRouter();

  const canonical = `${BASE_URL}${router.pathname}`;

  const openGraph = {
    type: 'website',
    locale: 'ko_KR',
    url: canonical,
    siteName: 'HoYo.gg',
  };

  return <DefaultSeo openGraph={openGraph} canonical={canonical} />;
};
