import { useQuery } from '@tanstack/react-query';
import { GENSHIN_CHARACTERS_QUERY_KEY, getGenshinCharacters } from '../apis/getGenshinCharacters';
import Image from 'next/image';
import styled from '@emotion/styled';

export const GenshinLandingScreen = () => {
  const { data, refetch } = useQuery({
    queryFn: getGenshinCharacters.client,
    queryKey: [GENSHIN_CHARACTERS_QUERY_KEY],
  });

  return (
    <Wrapper>
      <button onClick={() => refetch()}>누르면 리패치</button>
      {data?.map((d) => <Image key={d.id} width={300} height={300} src={d.image} alt={d.title} />)}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: rgb(30, 30, 47);
`;
