import GenshinCharacterDetailContainer from '@/features/genshin/containers/GenshinCharacterDetailContainer';
import { fetchGenshinCharacterDetail } from '@/features/genshin/hooks/queries/useGetGenshinCharacterDetail';
import { serverGenshinNameAndId } from '@/features/genshin/hooks/useGenshinNameAndId';
import { getGenshinDetailHref } from '@/features/genshin/utils/getGenshinHref';
import { SeoContainer } from '@/modules/seo';
import { createSlugText } from '@/utils/slug';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function GenshinCharacterDetailPage({ name, dehydratedState }: Props) {
  const title = `${name} 정보 | Genshin.gg`;
  const description = `${name}의 다양한 인게임 정보들을 확인해보세요.`;

  return (
    <>
      <SeoContainer title={title} description={description} />
      <HydrationBoundary state={dehydratedState}>
        <GenshinCharacterDetailContainer />
      </HydrationBoundary>
    </>
  );
}

export const getServerSideProps = (async (context) => {
  const { name, id } = serverGenshinNameAndId(context);
  const queryClient = new QueryClient();

  if (!id) {
    return {
      redirect: {
        destination: '/genshin/characters',
        permanent: true,
      },
    };
  }

  const data = await fetchGenshinCharacterDetail(queryClient, id);

  if (!data) {
    return {
      redirect: {
        destination: '/genshin/characters',
        permanent: true,
      },
    };
  }

  if (createSlugText(data.Name) !== name) {
    return {
      redirect: {
        destination: getGenshinDetailHref(data.Name, id),
        permanent: true,
      },
    };
  }

  return {
    props: {
      name: name.replaceAll('-', ' '),
      dehydratedState: dehydrate(queryClient),
    },
  };
}) satisfies GetServerSideProps;
