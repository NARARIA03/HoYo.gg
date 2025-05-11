import { GenshinLandingScreen } from '@/features/genshinLanding';
import { SeoContainer } from '@/modules/seo';

const GenshinHomePage = () => {
  return (
    <>
      <SeoContainer />
      <GenshinLandingScreen />
    </>
  );
};

export default GenshinHomePage;
