import { parseNameAndId } from '@/utils';
import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

export const useGenshinNameAndId = () => {
  const router = useRouter();
  const { name, id } = parseNameAndId(router.query?.['name-id']) ?? {};
  return { name, id };
};

export const serverGenshinNameAndId = (context: GetServerSidePropsContext) => {
  const { name, id } = parseNameAndId(context.params?.['name-id']) ?? {};
  return { name, id };
};
