import GenshinHomeContainer from '@/features/genshin/containers/GenshinHomeContainer';
import { SeoContainer } from '@/modules/seo';

const GenshinHomePage = () => {
  return (
    <>
      <SeoContainer name="giMain" />
      <GenshinHomeContainer />
    </>
  );
};

export default GenshinHomePage;
