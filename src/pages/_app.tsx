import GlobalStyle from '@/styles/GlobalStyle';
import localFont from 'next/font/local';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'ko_KR',
          url: process.env.NEXT_PUBLIC_BASE_URL,
          siteName: 'HoYo.gg',
        }}
        canonical={process.env.NEXT_PUBLIC_BASE_URL}
      />
      <main className={pretendard.className}>
        <GlobalStyle />
        <Component {...pageProps} />
      </main>
    </>
  );
}
