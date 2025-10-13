import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { seoConstants } from '../constants';

type Props = { title?: string; description?: string };

// Todo: SEO 관련 코드 리팩토링 예정 (name을 받거나, title/description을 받는 형태로 변경하고, pathname 대신 asPath를 사용하도록 변경)
export const SeoContainer = ({ title, description }: Props) => {
  const router = useRouter();
  const constants = seoConstants[router.pathname];
  return <NextSeo title={title ?? constants.title} description={description ?? constants.description} />;
};
