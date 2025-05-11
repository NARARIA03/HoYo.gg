import { DefaultSeo } from 'next-seo';
import { defaultSeoConstants } from '../constants';

export const DefaultSeoContainer = () => {
  const { openGraph, canonical } = defaultSeoConstants;
  return <DefaultSeo openGraph={openGraph} canonical={canonical} />;
};
