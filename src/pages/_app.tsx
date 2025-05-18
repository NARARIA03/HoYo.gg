import GlobalStyle from '@/styles/GlobalStyle';
import localFont from 'next/font/local';
import type { AppProps } from 'next/app';
import { DefaultSeoContainer } from '@/modules/seo';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return (
    <>
      <DefaultSeoContainer />
      <QueryClientProvider client={queryClient}>
        <main className={pretendard.className}>
          <GlobalStyle />
          <Component {...pageProps} />
        </main>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
