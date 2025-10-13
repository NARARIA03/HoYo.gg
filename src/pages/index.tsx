import LandingScreen from '@/features/landing/screen/LandingScreen';
import { SeoContainer } from '@/modules/seo';

const HomePage = () => {
  return (
    <>
      <SeoContainer name="root" />
      <LandingScreen />
    </>
  );
};

export default HomePage;
