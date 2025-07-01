import GlobalStyle from '@/styles/GlobalStyle';
import localFont from 'next/font/local';
import type { AppProps } from 'next/app';
import { DefaultSeoContainer } from '@/modules/seo';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { Header } from '@/components';
import { useRouter } from 'next/router';
import { useInitQueryClient } from '@/hooks/useInitQueryClient';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = useInitQueryClient();
  const router = useRouter();

  const game = router.pathname.split('/')[1] as 'genshin' | 'hsr' | 'zzz' | '';

  return (
    <>
      <DefaultSeoContainer />
      <QueryClientProvider client={queryClient}>
        {game && <Header game={game} className={pretendard.className} />}
        <main className={pretendard.className}>
          <GlobalStyle />
          <Component {...pageProps} />
        </main>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
