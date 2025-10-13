import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { parseSlug } from '@/utils/slug';

export const useGenshinNameAndId = () => {
  const router = useRouter();
  const { name, id } = parseSlug(router.query?.['name-id']) ?? {};
  return { name, id };
};

export const serverGenshinNameAndId = (context: GetServerSidePropsContext) => {
  const { name, id } = parseSlug(context.params?.['name-id']) ?? {};
  return { name, id };
};
