import { GENSHIN_CHARACTERS_QUERY_KEY, GenshinLandingScreen, getGenshinCharacters } from '@/features/genshin';
import { SeoContainer } from '@/modules/seo';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { InferGetServerSidePropsType } from 'next';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const GenshinHomePage = ({ dehydratedState }: Props) => {
  return (
    <>
      <SeoContainer />
      <HydrationBoundary state={dehydratedState}>
        <GenshinLandingScreen />
      </HydrationBoundary>
    </>
  );
};

export default GenshinHomePage;

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryFn: getGenshinCharacters.server,
    queryKey: [GENSHIN_CHARACTERS_QUERY_KEY],
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
