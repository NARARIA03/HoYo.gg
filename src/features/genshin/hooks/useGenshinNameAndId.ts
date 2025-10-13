import { parseNameAndId } from '@/utils';
import { useRouter } from 'next/router';

export const useGenshinNameAndId = () => {
  const router = useRouter();
  const { name, id } = parseNameAndId(router.query?.['name-id']) ?? {};
  return { name, id };
};
