import styled from '@emotion/styled';
import { GamePannel } from '../components/GamePannel';
import { IMAGES } from '@/constants/images';

const LandingScreen = () => {
  return (
    <SSection>
      <GamePannel href="/genshin" imageUrl={IMAGES.genshinBg} alt="Genshin">
        Genshin Impact
      </GamePannel>
      <GamePannel href="/hsr" imageUrl={IMAGES.hsrBg} alt="Honkai: Starrail">
        Honkai: Star Rail
      </GamePannel>
      <GamePannel href="/zzz" imageUrl={IMAGES.zzzBg} alt="Zenless Zone Zero">
        Zenless Zone Zero
      </GamePannel>
    </SSection>
  );
};

export default LandingScreen;

const SSection = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;
