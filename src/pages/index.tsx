import LandingScreen from '@/features/landing/screen/LandingScreen';
import { NextSeo } from 'next-seo';

const Home = () => {
  return (
    <>
      <NextSeo title="HoYo.gg" description="호요버스 게임들의 데이터&진열장 검색 기능을 제공합니다." />
      <LandingScreen />
    </>
  );
};

export default Home;
