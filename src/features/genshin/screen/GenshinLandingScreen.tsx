import { useQuery } from '@tanstack/react-query';
import { GENSHIN_CHARACTERS_QUERY_KEY, getGenshinCharacters } from '../apis/getGenshinCharacters';
import Image from 'next/image';

export const GenshinLandingScreen = () => {
  const { data } = useQuery({
    queryFn: getGenshinCharacters.client,
    queryKey: [GENSHIN_CHARACTERS_QUERY_KEY],
  });

  return data?.map((d) => <Image key={d.id} width={300} height={300} src={d.image} alt={d.title} />);
};
