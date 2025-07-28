import { CharacterListContainer, prefetchGenshinCharacters } from '@/features/genshin';
import { SeoContainer } from '@/modules/seo';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const GenshinHomePage = ({ dehydratedState }: Props) => {
  return (
    <>
      <SeoContainer />
      <HydrationBoundary state={dehydratedState}>
        <CharacterListContainer />
      </HydrationBoundary>
    </>
  );
};

export default GenshinHomePage;

export const getServerSideProps = (async () => {
  const queryClient = new QueryClient();

  await prefetchGenshinCharacters(queryClient);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}) satisfies GetServerSideProps;
