import { useQuery } from '@tanstack/react-query';
import { GENSHIN_CHARACTERS_QUERY_KEY, getGenshinCharacters } from '../apis/getGenshinCharacters';
import Image from 'next/image';

export const GenshinLandingScreen = () => {
  const { data } = useQuery({
    queryFn: getGenshinCharacters.client,
    queryKey: [GENSHIN_CHARACTERS_QUERY_KEY],
  });

  return data?.map((d) => <Image width={200} height={200} alt={d.name} key={d.id} src={d.image} />);
};
