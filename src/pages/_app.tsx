import GlobalStyle from '@/styles/GlobalStyle';
import localFont from 'next/font/local';
import type { AppProps } from 'next/app';
import { DefaultSeoContainer } from '@/modules/seo';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { useInitQueryClient } from '@/hooks/useInitQueryClient';
import LayoutScreen from '@/features/layout/screen/LayoutScreen';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = useInitQueryClient();

  return (
    <>
      <DefaultSeoContainer />
      <QueryClientProvider client={queryClient}>
        <LayoutScreen className={pretendard.className}>
          <main className={pretendard.className}>
            <GlobalStyle />
            <Component {...pageProps} />
          </main>
        </LayoutScreen>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
