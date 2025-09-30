import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { BASE_URL } from '@/constants/env';

export const DefaultSeoContainer = () => {
  const router = useRouter();

  const asPath = router.asPath;
  const openGraph = {
    type: 'website',
    locale: 'ko_KR',
    url: BASE_URL,
    siteName: 'HoYo.gg',
  };

  return <DefaultSeo openGraph={openGraph} canonical={asPath} />;
};
