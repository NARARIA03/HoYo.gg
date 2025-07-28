import styled from '@emotion/styled';
import { GamePannel } from '../components/GamePannel';

const BACKGROUND = {
  genshin: 'https://i.redd.it/66ic9c791ih61.png',
  hsr: 'https://i.redd.it/zf4z6utfezua1.png',
  zzz: 'https://i.redd.it/zenless-zone-zero-cbt2-images-v0-r3kvi8vt7cyb1.jpg?width=1080&crop=smart&auto=webp&s=93fb6ac323f6e407e60a7913820820e8977857aa',
} as const;

const LandingScreen = () => {
  return (
    <SSection>
      <GamePannel href="/genshin" imageUrl={BACKGROUND.genshin} alt="Genshin">
        Genshin Impact
      </GamePannel>
      <GamePannel href="/hsr" imageUrl={BACKGROUND.hsr} alt="Honkai: Star Rail">
        Honkai: Star Rail
      </GamePannel>
      <GamePannel href="/zzz" imageUrl={BACKGROUND.zzz} alt="Zenless Zone Zero">
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
