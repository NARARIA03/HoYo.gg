import { NextSeo } from 'next-seo';
import { seoConstants } from '../constants';

type Props =
  | { name: keyof typeof seoConstants; title?: never; description?: never }
  | { name?: never; title: string; description: string };

export const SeoContainer = ({ name, title, description }: Props) => {
  if (name) {
    const { title, description } = seoConstants[name];
    return <NextSeo title={title} description={description} />;
  }

  return <NextSeo title={title} description={description} />;
};
