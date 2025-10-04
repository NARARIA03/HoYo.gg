import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import GenshinCharactersContainer from '@/features/genshin/containers/GenshinCharactersContainer';
import { prefetchGenshinCharacters } from '@/features/genshin/hooks/queries/useGetGenshinCharacters';
import { SeoContainer } from '@/modules/seo';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function GenshinCharactersPage({ dehydratedState }: Props) {
  return (
    <>
      <SeoContainer />
      <HydrationBoundary state={dehydratedState}>
        <GenshinCharactersContainer />
      </HydrationBoundary>
    </>
  );
}

export const getServerSideProps = (async () => {
  const queryClient = new QueryClient();

  await prefetchGenshinCharacters(queryClient);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}) satisfies GetServerSideProps;
