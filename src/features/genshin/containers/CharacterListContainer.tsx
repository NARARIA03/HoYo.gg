import { useRef, useState } from 'react';
import { useGetGenshinCharacters } from '../hooks/queries/useGetGenshinCharacters';
import type { MinimizedGenshinCharacterDTO } from '../types/genshinDbDto';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import styled from '@emotion/styled';
import { CharacterCard } from '../components/CharacterCard/CharacterCard';
import { AnimatePresence } from 'motion/react';
import { ActiveCard } from '../components/ActiveCard/ActiveCard';

type TActiveCard = {
  id: number;
  rect: DOMRect;
  character: MinimizedGenshinCharacterDTO;
};

type TCardRefs = Record<number, HTMLElement | null>;

export const CharacterListContainer = () => {
  const [activeCard, setActiveCard] = useState<TActiveCard | null>(null);
  const [isLockScroll, setIsLockScroll] = useState<boolean>(false);
  const cardRefs = useRef<TCardRefs>({});

  const { data: characters } = useGetGenshinCharacters();

  const handleCardClick = (id: number, character: MinimizedGenshinCharacterDTO) => {
    const ref = cardRefs.current[id];
    if (ref) {
      setIsLockScroll(true);
      const rect = ref.getBoundingClientRect();
      ref.style.opacity = '0';
      setActiveCard({ id, rect, character });
    }
  };

  const handleCardClose = () => {
    setActiveCard(null);
    setTimeout(() => {
      Object.values(cardRefs.current).map((ref) => {
        if (ref && ref.style.opacity !== '1') {
          ref.style.opacity = '1';
        }
      });
      setIsLockScroll(false);
    }, 600);
  };

  useLockBodyScroll({ isLock: isLockScroll });

  return (
    <Wrapper>
      <Grid>
        {characters?.map((character) => (
          <CharacterCard
            key={character.id}
            ref={(el) => {
              cardRefs.current[character.id] = el;
            }}
            name={character.name}
            title={character.title}
            description={character.description}
            rarity={character.rarity}
            elementText={character.elementText}
            region={character.region}
            image={character.image}
            onClick={() => handleCardClick(character.id, character)}
          />
        ))}
        <AnimatePresence>
          {activeCard && (
            <ActiveCard rect={activeCard.rect} onClose={handleCardClose}>
              <CharacterCard {...activeCard.character} onClick={() => {}} />
            </ActiveCard>
          )}
        </AnimatePresence>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: rgb(30, 30, 47);
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  will-change: transform;
`;
