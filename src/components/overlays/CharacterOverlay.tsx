import DetailModal from '../DetailModal';
import { characterImages, CHARACTER_IDS } from '../../constants/imageMapping';
import { useCardRotation } from '../../hooks/useCardRotation';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { CHARACTERS_WITH_CARDS } from '../../constants/detailSettings';
import type { Character } from '../../types';
import charactersData from '../../../public/data/characters.json';

interface CharacterOverlayProps {
  character: Character;
  id: number;
  onPageChange: (newIndex: number) => void;
  onClose: () => void;
}

const CharacterOverlay = ({ character, id, onPageChange, onClose }: CharacterOverlayProps) => {
  const { isDesktop } = useBreakpoint();
  const hasCard = CHARACTERS_WITH_CARDS.includes(id);
  const cardRotation = useCardRotation({ enabled: hasCard && isDesktop });

  const characterData = charactersData.find((c) => c.id === id);
  const baseImageName = characterImages[id]?.split('/').pop()?.replace('.webp', '') || '';
  const imageUrl = hasCard
    ? `/images/characters-cards/${baseImageName}-card.png`
    : characterImages[id];

  const cardStyle = isDesktop
    ? hasCard
      ? {
          width: 'auto',
          height: '388px',
          transform: `perspective(1000px) rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg) rotate(6deg)`,
          transition: 'transform 0.1s ease-out',
        }
      : { width: '428px', height: '476px' }
    : hasCard
    ? { width: '160px', height: '200px', borderRadius: '0px' }
    : { width: '150px', height: '165px', borderRadius: '10px' };

  return (
    <DetailModal
      title={character.name}
      beshIcon="/images/ui/characters-besh.svg"
      characteristics={[
        { label: 'height', value: character.height },
        { label: 'mass', value: character.mass },
        { label: 'birth year', value: character.birth_year },
      ]}
      description={characterData?.description || 'No description available.'}
      contentType={hasCard ? 'card' : 'photo'}
      leftContent={
        <img
          id={hasCard && isDesktop ? 'collectible-card' : undefined}
          src={imageUrl}
          alt={character.name}
          className="object-contain"
          style={cardStyle}
        />
      }
      totalItems={CHARACTER_IDS.length}
      currentIndex={CHARACTER_IDS.indexOf(id)}
      onPageChange={onPageChange}
      onClose={onClose}
      sectionId="characters"
    />
  );
};

export default CharacterOverlay;