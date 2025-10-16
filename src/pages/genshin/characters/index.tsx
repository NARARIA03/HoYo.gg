import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import GenshinCharactersContainer from '@/features/genshin/containers/GenshinCharactersContainer';
import { prefetchGenshinCharacters } from '@/features/genshin/hooks/queries/useGetGenshinCharacters';
import { SeoContainer } from '@/modules/seo';
import { DAY } from '@/constants';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function GenshinCharactersPage({ dehydratedState }: Props) {
  return (
    <>
      <SeoContainer name="giCharacters" />
      <HydrationBoundary state={dehydratedState}>
        <GenshinCharactersContainer />
      </HydrationBoundary>
    </>
  );
}

export const getStaticProps = (async () => {
  const queryClient = new QueryClient();

  await prefetchGenshinCharacters(queryClient);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: DAY * 7,
  };
}) satisfies GetStaticProps;
